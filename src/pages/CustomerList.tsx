import React, { useEffect, useState } from 'react';
import { Schema } from '../../amplify/data/resource';
import {
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    AlertTitle
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { generateClient } from "aws-amplify/data";
import CustomerCreateForm from '../../ui-components/CustomerCreateForm';

const MODULE_LABEL = "Customers";
const CREATE_BUTTON_LABEL = "Create customer";

const client = generateClient<Schema>();

const CustomerList: React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [customers, setCustomers] = useState<Array<Schema["Customer"]["type"]>>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [selectedCustomer, setSelectedCustomer] = useState<Schema["Customer"]["type"] | null>(null);
    const [isDetailPopupOpen, setIsDetailPopupOpen] = useState(false);

    const showFormError = (error: string) => {
        setErrorMessage(error);
        setSuccessMessage(null);
    };

    const fetchCustomers = async () => {
        const result = await client.models.Customer.query();
        setCustomers(result.items);
    };

    const showFormSuccess = () => {
        setSuccessMessage('Customer created successfully');
        setErrorMessage(null);
        setIsPopupOpen(false);  // Close popup on success
        fetchCustomers();  // Fetch customers after success
    };

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setErrorMessage(null);
        setSuccessMessage(null);
    };

    const handleRowClick = (params) => {
        setSelectedCustomer(params.row);
        setIsDetailPopupOpen(true);
    };

    const handleCloseDetailPopup = () => {
        setIsDetailPopupOpen(false);
        setSelectedCustomer(null);
    };

    useEffect(() => {
        const subscription = client.models.Customer.observeQuery().subscribe({
            next: (data) => setCustomers([...data.items]),
        });

        // Initial fetch of customers
        fetchCustomers();

        // Cleanup subscription on unmount
        return () => subscription.unsubscribe();
    }, []);

    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'createdAt', headerName: 'Created at', width: 200 }
    ];

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', padding: '0 20px' }}>
                <h1>{MODULE_LABEL}</h1>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenPopup}
                >
                    {CREATE_BUTTON_LABEL}
                </Button>
            </div>

            <Paper style={{ height: '80vh', width: '100%', marginTop: '20px' }}>
                <DataGrid
                    rows={customers}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    getRowId={(row) => row.id}
                    onRowClick={handleRowClick}
                    autoHeight={false}
                    checkboxSelection
                />
            </Paper>

            <Dialog open={isPopupOpen} onClose={handleClosePopup} maxWidth="sm" fullWidth>
                <DialogTitle>{CREATE_BUTTON_LABEL}</DialogTitle>
                <DialogContent>
                    {errorMessage && (
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {errorMessage}
                        </Alert>
                    )}
                    {successMessage && (
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            {successMessage}
                        </Alert>
                    )}
                    <CustomerCreateForm onError={(fields, errorMessage) => showFormError(errorMessage)} onSuccess={showFormSuccess} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isDetailPopupOpen} onClose={handleCloseDetailPopup} maxWidth="sm" fullWidth>
                <DialogTitle>Customer Details</DialogTitle>
                <DialogContent>
                    {selectedCustomer && (
                        <>
                            <p><strong>Name:</strong> {selectedCustomer.name}</p>
                            <p><strong>Email:</strong> {selectedCustomer.email}</p>
                            <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
                            <p><strong>Created At:</strong> {selectedCustomer.createdAt}</p>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetailPopup} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CustomerList;
