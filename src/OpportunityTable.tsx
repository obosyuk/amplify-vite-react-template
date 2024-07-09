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
} from '@mui/material';
import { generateClient } from "aws-amplify/data";

// interface OpportunityTableProps {
//   opportunities: Array<Schema['Opportunity']['type']>;
// }
const client = generateClient<Schema>();

const OpportunityTable: React.FC = ({ }) => {

    const [opportunities, setOpportunities] = useState<Array<Schema["Opportunity"]["type"]>>([]);
    
    useEffect(() => {
        client.models.Opportunity.observeQuery().subscribe({
          next: (data) => setOpportunities([...data.items]),
        });
      }, []);

      
  return (
    <TableContainer component={Paper} sx={{ mt: 4, width: '100%' }}>
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
  );
};

export default OpportunityTable;
