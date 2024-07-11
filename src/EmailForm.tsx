import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import AWS from 'aws-sdk';

interface EmailFormProps {
  open: boolean;
  onClose: () => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ open, onClose }) => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSendEmail = async () => {
    try {
      // Configure AWS SDK with your credentials
      AWS.config.update({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        region: process.env.REACT_APP_AWS_REGION,
      });

      // Create an SES instance
      const ses = new AWS.SES({ apiVersion: '2010-12-01' });

      // Send the email
      const params = {
        Destination: {
          ToAddresses: [recipient],
        },
        Message: {
          Body: {
            Text: { Data: body },
          },
          Subject: { Data: subject },
        },
        Source: process.env.REACT_APP_SENDER_EMAIL,
      };

      await ses.sendEmail(params).promise();
      console.log('Email sent successfully');
      onClose(); // Close the popup after sending the email
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Send Email</DialogTitle>
      <DialogContent>
        <TextField
          label="Recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSendEmail} variant="contained" color="primary">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmailForm;
