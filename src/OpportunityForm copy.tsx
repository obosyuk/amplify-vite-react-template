import React, { useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
// import { Opportunity } from '@aws-amplify/datastore/models';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

import {
    Box,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    Typography,
} from '@mui/material';


const opportunityStages = [
    'Prospecting',
    'Qualification',
    'Proposal',
    'Negotiation',
    'Closed Won',
    'Closed Lost',
];


const client = generateClient<Schema>();

interface OpportunityFormProps {
    onOpportunitySaved: () => void;
}

const OpportunityForm: React.FC<OpportunityFormProps> = ({ onOpportunitySaved }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [stage, setStage] = useState('Prospecting');
    const [amount, setAmount] = useState(0);
    const [accountId, setAccountId] = useState('');



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data: customer } = await client.models.Customer.create({
                name: "Adam",
                email: 'test@gmail.com'
            })

            const { data: opportunity } = await client.models.Opportunity.create({
                name,
                description,
                stage,
                amount,
                accountId: '111',
                customerId: customer?.id
            })


            // client.models.Opportunity.list({sor})

            console.log('Opportunity saved successfully');
            // Reset form fields if needed
            setName('');
            setDescription('');
            setStage('Prospecting');
            setAmount(0);
            setAccountId('');
            onOpportunitySaved();
        } catch (error) {
            console.error('Error saving Opportunity:', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Create Opportunity
            </Typography>
            <form onSubmit={handleSubmit}>

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
            </form>
        </Box>
    );
};

export default OpportunityForm;
