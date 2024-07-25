import React, { useEffect, useState } from 'react';
import { fetchUserAttributes, updateUserAttributes } from 'aws-amplify/auth';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    Box,
    TextField,
    Button,
    Typography,
    Card,
    Snackbar,
    Alert,
    CircularProgress,
} from '@mui/material';

interface UserProfile {
    email: string;
    birthdate: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    [key: string]: any;
}

const ProfileForm: React.FC = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserProfile>();
    const [user, setUser] = useState<any>(null);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<'success' | 'error'>('success');
    const [loading, setLoading] = useState(false); // State for loader

    useEffect(() => {
        async function fetchUser() {
            setLoading(true); // Show loader
            try {
                const userInfo = await fetchUserAttributes();
                setUser(userInfo);
                const { email, birthdate, given_name, family_name, phone_number } = userInfo;
                setValue('email', email ?? '');
                setValue('birthdate', birthdate ?? '');
                setValue('firstName', given_name ?? '');
                setValue('lastName', family_name ?? '');
                setValue('phoneNumber', phone_number ?? '');
            } catch (error) {
                console.error('Error fetching user info:', error);
            } finally {
                setLoading(false); // Hide loader
            }
        }

        fetchUser();
    }, [setValue]);

    const onSubmit: SubmitHandler<UserProfile> = async (data) => {
        setLoading(true); // Show loader
        try {
            await updateUserAttributes({
                userAttributes: {
                    email: data.email,
                    birthdate: data.birthdate,
                    given_name: data.firstName,
                    family_name: data.lastName,
                    phone_number: data.phoneNumber,
                },
            });
            setMessage('Profile updated successfully!');
            setSeverity('success');
            setOpen(true);
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Error updating profile');
            setSeverity('error');
            setOpen(true);
        } finally {
            setLoading(false); // Hide loader
        }
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Card variant="outlined" sx={{ maxWidth: 800, maxHeight: 800, margin: '0 auto', marginTop: '100px'}}>
            <Box sx={{ padding: '80px', position: 'relative' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    User Profile
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Email"
                        type="email"
                        defaultValue={user?.email ?? ''}
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: 'Enter a valid email address'
                            }
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="Birthdate"
                        type="date"
                        defaultValue={user?.birthdate ?? ''}
                        {...register('birthdate', {
                            required: 'Birthdate is required',
                            validate: value => {
                                const currentDate = new Date();
                                const birthDate = new Date(value);
                                return birthDate <= currentDate || 'Birthdate cannot be in the future';
                            }
                        })}
                        error={!!errors.birthdate}
                        helperText={errors.birthdate?.message}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="First Name"
                        defaultValue={user?.given_name ?? ''}
                        {...register('firstName', {
                            required: 'First name is required',
                        })}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="Last Name"
                        defaultValue={user?.family_name ?? ''}
                        {...register('lastName', {
                            required: 'Last name is required',
                        })}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="Phone Number"
                        defaultValue={user?.phone_number ?? ''}
                        {...register('phoneNumber', {
                            required: 'Phone number is required',
                            pattern: {
                                value: /^\+?[1-9]\d{1,14}$/,
                                message: 'Enter a valid phone number'
                            }
                        })}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
                        {loading ? 'Updating...' : 'Update Profile'}
                    </Button>
                </form>
                {loading && (
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <CircularProgress />
                    </Box>
                )}
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{ marginTop: '80px' }}
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default ProfileForm;
