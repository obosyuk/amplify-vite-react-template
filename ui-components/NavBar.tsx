import React, { useState, MouseEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';


interface NavBarProps {
    username?: string;
    onLogout?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ username, onLogout }) => {
    const [leftAnchorEl, setLeftAnchorEl] = useState<null | HTMLElement>(null);
    const [rightAnchorEl, setRightAnchorEl] = useState<null | HTMLElement>(null);

    const handleLeftMenu = (event: MouseEvent<HTMLElement>) => {
        setLeftAnchorEl(event.currentTarget);
    };

    const handleRightMenu = (event: MouseEvent<HTMLElement>) => {
        setRightAnchorEl(event.currentTarget);
    };

    const handleLeftMenuClose = () => {
        setLeftAnchorEl(null);
    };

    const handleRightMenuClose = () => {
        setRightAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleLeftMenu} sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Menu
                    anchorEl={leftAnchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(leftAnchorEl)}
                    onClose={handleLeftMenuClose}
                >
                    <MenuItem onClick={handleLeftMenuClose}>Opportunities</MenuItem>
                    <MenuItem onClick={handleLeftMenuClose}>Customers</MenuItem>
                    <MenuItem onClick={handleLeftMenuClose}>Contacts</MenuItem>
                </Menu>


                <Typography variant="h6" component="div">
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                </Typography>
                <Button color="inherit" component={Link} to="/opportunities">
                    Opportunities
                </Button>
                <Button color="inherit" component={Link} to="/customers">
                    Customers
                </Button>
                <Button color="inherit" component={Link} to="/contacts">
                    Contacts
                </Button>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {/* Super CRM */}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" component="div" sx={{ mr: 2 }}>
                        {username}
                    </Typography>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleRightMenu}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={rightAnchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(rightAnchorEl)}
                        onClose={handleRightMenuClose}
                    >
                        <MenuItem onClick={handleRightMenuClose} component={Link} to="/current-user">My Profile</MenuItem>
                        {/* <MenuItem onClick={handleRightMenuClose}>My account</MenuItem> */}
                        <MenuItem onClick={onLogout}>Logout</MenuItem>
                    </Menu>
                </Box>



            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
