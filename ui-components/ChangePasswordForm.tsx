// ChangePasswordForm.tsx
import React, { useState } from 'react';
import { updatePassword } from 'aws-amplify/auth';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, TextField, Button, Typography, Snackbar, Alert, CircularProgress } from '@mui/material';

interface ChangePasswordFormProps {
    onSuccess: () => void;
}

interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onSuccess }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ChangePasswordData>();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error'>('success');

    const onSubmit: SubmitHandler<ChangePasswordData> = async (data) => {
        setLoading(true);
        try {
            if (data.newPassword !== data.confirmNewPassword) {
                throw new Error('New passwords do not match');
            }
            await updatePassword({
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
            });
            setMessage('Password updated successfully!');
            setSeverity('success');
            setOpen(true);
            onSuccess(); // Notify parent component of success
        } catch (error) {
            console.error('Error updating password:', error);
            setMessage(error.message || 'Error updating password');
            setSeverity('error');
            setOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ maxWidth: 500, margin: '0 auto', padding: 2 }}>
            {/* <Typography variant="h6" component="h2" gutterBottom>
                Change Password
            </Typography> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Old Password"
                    type="password"
                    {...register('oldPassword', { required: 'Old password is required' })}
                    error={!!errors.oldPassword}
                    helperText={errors.oldPassword?.message}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="New Password"
                    type="password"
                    {...register('newPassword', {
                        required: 'New password is required',
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters long',
                        },
                    })}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Confirm New Password"
                    type="password"
                    {...register('confirmNewPassword', { required: 'Please confirm your new password' })}
                    error={!!errors.confirmNewPassword}
                    helperText={errors.confirmNewPassword?.message}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
                    {loading ? 'Updating...' : 'Update Password'}
                </Button>
            </form>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                action={
                    <Button color="inherit" onClick={handleClose}>
                        Close
                    </Button>
                }
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ChangePasswordForm;
