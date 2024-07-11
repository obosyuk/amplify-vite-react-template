import React, { useEffect, useState } from 'react';
import { Schema } from '../amplify/data/resource';
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
import OpportunityForm from './OpportunityForm';


// interface OpportunityTableProps {
//   opportunities: Array<Schema['Opportunity']['type']>;
// }
const client = generateClient<Schema>();

const OpportunityTable: React.FC = ({ }) => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [opportunities, setOpportunities] = useState<Array<Schema["Opportunity"]["type"]>>([]);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };


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
                >Opportunities</h1>

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
                    Create Opportunity
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
                            <TableRow key={opportunity.id}>
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
                {/* <DialogTitle>Create Opportunity</DialogTitle> */}
                <DialogContent>
                    <OpportunityForm onOpportunitySaved={handleClosePopup} />
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

export default OpportunityTable;
