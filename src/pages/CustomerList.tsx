import React, { useEffect, useState } from 'react';
// import { Schema } from '@amplify/data/resource';
import { Schema} from '../../amplify/data/resource';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { generateClient } from "aws-amplify/data";
import CustomerCreateForm from '../../ui-components/CustomerCreateForm';

const MODULE_LABEL = "Customers";
const CREATE_BUTTON_LABEL = "Create customer";

// interface OpportunityTableProps {
//   opportunities: Array<Schema['Opportunity']['type']>;
// }
const client = generateClient<Schema>();


const CustomerList: React.FC = ({ }) => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [customers, setOpportunities] = useState<Array<Schema["Customer"]["type"]>>([]);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };


    useEffect(() => {
        client.models.Customer.observeQuery().subscribe({
            next: (data) => setOpportunities([...data.items]),
        });
    }, []);


    return (
        <>
            <TableContainer component={Paper} sx={{ mt: 4, width: '100%' }}>
                <h1
                    style={{
                        position: 'relative',
                        float: 'left',
                        marginLeft: '20px',
                    }}
                >{MODULE_LABEL}</h1>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenPopup}
                    // sx={{ position: 'absolute', top: 8, right: 8 }}
                    style={{
                        position: 'relative', // Default positioning
                        float: 'right',
                        marginRight: '20px',
                    }}
                >
                    {CREATE_BUTTON_LABEL}
                </Button>
                <Table sx={{ width: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Created at</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow key={customer.id}>
                                <TableCell>{customer.name}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.phone}</TableCell>
                                <TableCell>{customer.createdAt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={isPopupOpen} onClose={handleClosePopup} maxWidth="sm" fullWidth>
                <DialogTitle>{CREATE_BUTTON_LABEL}</DialogTitle>
                <DialogContent>
                    <CustomerCreateForm />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    );
};

export default CustomerList;
