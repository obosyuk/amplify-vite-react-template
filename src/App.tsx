import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
// import { Opportunity } from '@aws-amplify/datastore/models';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from '@aws-amplify/ui-react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import AmplifyTheme from './AmplifyTheme';
import { withAuthenticator } from '@aws-amplify/ui-react';


import { styled } from '@mui/material/styles';

const StyledForm = styled('form')({
  // display: 'flex',
  // flexDirection: 'column',
  // gap: '1rem',
  maxWidth: '400px',
});


const opportunityStages = [
  'Prospecting',
  'Qualification',
  'Proposal',
  'Negotiation',
  'Closed Won',
  'Closed Lost',
];

const client = generateClient<Schema>();

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stage, setStage] = useState('Prospecting');
  const [amount, setAmount] = useState(0);
  const [closeDate, setCloseDate] = useState(new Date());
  const [accountId, setAccountId] = useState('');
  // const [opportunities, setOpportunities] = useState([]);

  const [opportunities, setOpportunities] = useState<Array<Schema["Opportunity"]["type"]>>([]);

  // useEffect(() => {
  //   fetchOpportunities();
  // }, []);

  useEffect(() => {
    client.models.Opportunity.observeQuery().subscribe({
      next: (data) => setOpportunities([...data.items]),
    });
  }, []);

  // const fetchOpportunities = async () => {
  //   try {
  //     const opportunities = await DataStore.query(Opportunity);
  //     setOpportunities(opportunities);
  //   } catch (error) {
  //     console.error('Error fetching opportunities:', error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await DataStore.save(
        client.models.Opportunity.create({
          name,
          description,
          stage,
          amount,
          accountId,
        })
      );
      console.log('Opportunity saved successfully');
      // Reset form fields if needed
      setName('');
      setDescription('');
      setStage('Prospecting');
      setAmount(0);
      setCloseDate(new Date());
      setAccountId('');
      // fetchOpportunities(); // Fetch updated opportunities after saving
    } catch (error) {
      console.error('Error saving Opportunity:', error);
    }
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Box sx={{ maxWidth: 1400, margin: '0 auto' }}>
          
          <h1>{user?.signInDetails?.loginId}</h1>
          
          <Button onClick={signOut}>Sign out</Button>
          
          <Typography variant="h4" component="h1" gutterBottom>
            Create Opportunity
          </Typography>

          <StyledForm onSubmit={handleSubmit}>

            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="stage-label">Stage</InputLabel>
              <Select
                labelId="stage-label"
                value={stage}
                onChange={(e) => setStage(e.target.value as string)}
              >
                {opportunityStages.map((stage) => (
                  <MenuItem key={stage} value={stage}>
                    {stage}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Account ID"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Create Opportunity
            </Button>
          </StyledForm>


          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Stage</TableCell>
                  <TableCell>Amount</TableCell>
                  {/* <TableCell>Close Date</TableCell> */}
                  <TableCell>Account ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {opportunities.map((opportunity) => (
                  <TableRow key={opportunity.id}>
                    <TableCell>{opportunity.name}</TableCell>
                    <TableCell>{opportunity.stage}</TableCell>
                    <TableCell>{opportunity.amount}</TableCell>
                    {/* <TableCell>{opportunity.createdAt.toLocaleDateString()}</TableCell> */}
                    <TableCell>{opportunity.accountId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Box>
      )}
    </Authenticator>
  );
};

// export default OpportunityForm;

export default withAuthenticator(App, {
  components: {
    Authenticator: AmplifyTheme,
  },
});