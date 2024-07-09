import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface MyAppBarProps {
  username: string;
  onLogout: () => void;
}

const MyAppBar: React.FC<MyAppBarProps> = ({ username, onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" component="div" sx={{ mr: 2 }}>
            {username}
          </Typography>
          <Button color="inherit" onClick={onLogout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
