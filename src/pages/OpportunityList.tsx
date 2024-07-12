import React, { useEffect, useState } from 'react';
import { fetchUserAttributes, fetchAuthSession } from '@aws-amplify/auth';
// import { Schema } from '@amplify/data/resource';
// import { Schema} from '../amplify/data/resource';
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
} from '@mui/material';
import { generateClient } from "aws-amplify/data";
// import OpportunityForm from '../OpportunityForm';
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

    client.queries.sayHello({
        name: "Amplify",
    })
        .then((result) => console.log(result.data));



    const handleOpenPopup = (opportunity?: Schema["Opportunity"]["type"]) => {
        if (opportunity) {
            setSelectedOpportunity(opportunity);
        } else {
            setSelectedOpportunity(null);
        }
        setIsPopupOpen(true);
    };

    // const handleOpenPopup = () => {
    //     setIsPopupOpen(true);
    // };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    useEffect(() => {
        client.models.Opportunity.observeQuery().subscribe({
            next: (data) => setOpportunities([...data.items]),
        });

        const checkUserGroup = async () => {
            try {
                fetchUserAttributes().then((user) => {
                    console.log('user email = ' + user.email);
                    console.log('user profile = ' + user.profile);
                });

                fetchAuthSession().then((session) => {
                    console.log('session111:' + session.userSub);
                    console.log('session at:' + session.tokens?.accessToken.payload['cognito:groups']);
                    console.log('session it:' + session.tokens?.idToken?.payload['cognito:groups']);
                })

                // const user = await Auth.currentAuthenticatedUser();
                // const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
                // setIsAdmin(groups && groups.includes('admin'));
            } catch (error) {
                console.error("Error fetching user groups:", error);
            }
        };

        checkUserGroup();
    }, []);


    useEffect(() => {
        client.models.Opportunity.observeQuery().subscribe({
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
                    onClick={() => handleOpenPopup()}
                    style={{
                        position: 'relative',
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
                        <OpportunityCreateForm />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

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
