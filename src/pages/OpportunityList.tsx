import React, { useEffect, useState } from 'react';
import { fetchUserAttributes, fetchAuthSession } from '@aws-amplify/auth';
import { Schema } from '../../amplify/data/resource';
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
    Alert,
    AlertTitle,
    Box,
    TextField,
    Grid
} from '@mui/material';
// import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { generateClient } from "aws-amplify/data";
import OpportunityCreateForm from '../../ui-components/OpportunityCreateForm';

const MODULE_LABEL = "Opportunities";
const CREATE_BUTTON_LABEL = "Create opportunity";

// interface OpportunityTableProps {
//   opportunities: Array<Schema['Opportunity']['type']>;
// }
const client = generateClient<Schema>();



const OpportunityTable: React.FC = ({ }) => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [opportunities, setOpportunities] = useState<Array<Schema["Opportunity"]["type"]>>([]);
    const [selectedOpportunity, setSelectedOpportunity] = useState<Schema["Opportunity"]["type"] | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const [filterName, setFilterName] = useState('');
    const [filterStage, setFilterStage] = useState('');
    const [filterAmount, setFilterAmount] = useState('');

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);


    const showFormError = (error: string) => {
        setErrorMessage(error);
        setSuccessMessage(null);
    };

    const showFormSuccess = () => {
        setSuccessMessage('Opportunity created successfully');
        setErrorMessage(null);
        setIsPopupOpen(false);  // Close popup on success
    };



    const handleOpenPopup = (opportunity?: Schema["Opportunity"]["type"]) => {
        if (opportunity) {
            setSelectedOpportunity(opportunity);
        } else {
            setSelectedOpportunity(null);
        }
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setErrorMessage(null);
        setSuccessMessage(null);
    };

    const handleFilterNameChange = (event) => {
        setFilterName(event.target.value);
    };

    const handleFilterStageChange = (event) => {
        setFilterStage(event.target.value);
    };

    const handleFilterAmountChange = (event) => {
        setFilterAmount(event.target.value);
    };

    const applyFilters = () => {
        console.log('Applying filters');
        fetchOpportunities();
        let filteredOpportunities = opportunities;

        if (filterName) {
            filteredOpportunities = filteredOpportunities.filter(opportunity =>
                opportunity.name.toLowerCase().includes(filterName.toLowerCase())
            );
        }

        if (filterStage) {
            filteredOpportunities = filteredOpportunities.filter(opportunity =>
                opportunity.stage.toLowerCase().includes(filterStage.toLowerCase())
            );
        }

        if (filterAmount) {
            filteredOpportunities = filteredOpportunities.filter(opportunity =>
                opportunity.amount.toString().includes(filterAmount)
            );
        }

        // return filteredOpportunities;
        setOpportunities([...filteredOpportunities])
    };


    useEffect(() => {
        // client.models.Opportunity.observeQuery().subscribe({
        //     next: (data) => setOpportunities([...data.items]),
        // });

        // const checkUserGroup = async () => {
        //     try {
        //         fetchUserAttributes().then((user) => {
        //             console.log('user email = ' + user.email);
        //             console.log('user profile = ' + user.profile);
        //         });

        //         fetchAuthSession().then((session) => {
        //             console.log('session111:' + session.userSub);
        //             console.log('session at:' + session.tokens?.accessToken.payload['cognito:groups']);
        //             console.log('session it:' + session.tokens?.idToken?.payload['cognito:groups']);
        //         })

        //         // const user = await Auth.currentAuthenticatedUser();
        //         // const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
        //         // setIsAdmin(groups && groups.includes('admin'));
        //     } catch (error) {
        //         console.error("Error fetching user groups:", error);
        //     }
        // };

        // checkUserGroup();
    }, []);

    const fetchOpportunities = () => {
        client.models.Opportunity.observeQuery().subscribe({
            next: (data) => setOpportunities([...data.items]),
        });
    }

    const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 150,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 150,
            editable: true,
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 110,
            editable: true,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];


    useEffect(() => {
        fetchOpportunities();
    }, []);


    return (
        <>
            <TableContainer component={Paper} sx={{ mt: 4, width: '100%' }}>

                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <h1
                            style={{
                                marginLeft: '20px',
                            }}
                        >{MODULE_LABEL}</h1>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpenPopup()}
                            style={{
                                position: 'relative',
                                float: 'right',
                                marginRight: '20px',
                            }}
                        >
                            {CREATE_BUTTON_LABEL}
                        </Button>
                    </Grid>
                    {/* <Grid item xs={4}>
                        xs=4
                    </Grid>
                    <Grid item xs={8}>
                        xs=8
                    </Grid> */}
                </Grid>


                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, px: 2 }}>
                    <TextField
                        label="Filter by Name"
                        value={filterName}
                        onChange={handleFilterNameChange}
                        variant="outlined"
                        size="small"
                        sx={{ mr: 2 }}
                    />
                    <TextField
                        label="Filter by Stage"
                        value={filterStage}
                        onChange={handleFilterStageChange}
                        variant="outlined"
                        size="small"
                        sx={{ mr: 2 }}
                    />
                    <TextField
                        label="Filter by Amount"
                        value={filterAmount}
                        onChange={handleFilterAmountChange}
                        variant="outlined"
                        size="small"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={applyFilters}
                        sx={{ ml: 2 }}
                    >
                        Apply Filters
                    </Button>
                </Box>

                <Table sx={{ width: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Stage</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Account ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {opportunities.map((opportunity) => (
                            <TableRow key={opportunity.id} onClick={() => handleOpenPopup(opportunity)} style={{ cursor: 'pointer' }}>
                                <TableCell>{opportunity.name}</TableCell>
                                <TableCell>{opportunity.stage}</TableCell>
                                <TableCell>{opportunity.amount}</TableCell>
                                <TableCell>{opportunity.accountId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={isPopupOpen} onClose={handleClosePopup} maxWidth="sm" fullWidth>
                <DialogTitle>{selectedOpportunity ? `Details of ${selectedOpportunity.name}` : CREATE_BUTTON_LABEL}</DialogTitle>
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

                    {selectedOpportunity ? (
                        <div>
                            <p><strong>Name:</strong> {selectedOpportunity.name}</p>
                            <p><strong>Stage:</strong> {selectedOpportunity.stage}</p>
                            <p><strong>Amount:</strong> {selectedOpportunity.amount}</p>
                            <p><strong>Description:</strong> {selectedOpportunity.description}</p>
                            <p><strong>Close date:</strong> {selectedOpportunity.closeDate}</p>
                            <p><strong>Account ID:</strong> {selectedOpportunity.accountId}</p>
                            <p><strong>Customer ID:</strong> {selectedOpportunity.customerId}</p>
                            <p><strong>Created at:</strong> {selectedOpportunity.createdAt}</p>
                            <p><strong>Updated at:</strong> {selectedOpportunity.updatedAt}</p>
                            {/* <p><strong>Customer:</strong> {selectedOpportunity.customer.toString()}</p> */}
                        </div>
                    ) : (
                        <OpportunityCreateForm onError={(fields, errorMessage) => showFormError(errorMessage)} onSuccess={showFormSuccess} />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>


            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />

            {/* <Dialog open={isPopupOpen} onClose={handleClosePopup} maxWidth="sm" fullWidth>
                <DialogTitle>{CREATE_BUTTON_LABEL}</DialogTitle>
                <DialogContent>
                    <OpportunityCreateForm />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog> */}


        </>

    );
};

export default OpportunityTable;
