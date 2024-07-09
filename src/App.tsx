import React, { useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import {
  Box,
  MenuItem,
  Button,
  Typography,
  AppBar, 
  Toolbar,
  IconButton,
   Menu,
  //  MenuIcon
} from '@mui/material';
import AmplifyTheme from './AmplifyTheme';
import { withAuthenticator } from '@aws-amplify/ui-react';

import OpportunityTable from './OpportunityTable';
import OpportunityForm from './OpportunityForm';


const App: React.FC = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Box sx={{ maxWidth: 1400, margin: '0 auto' }}>

<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuOpen}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          // open={Boolean(handleSubmit)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuOpen}>Profile</MenuItem>
          <MenuItem onClick={handleMenuOpen}>Settings</MenuItem>
        </Menu>
      </AppBar>

    </Box>


          
          <h1>{user?.signInDetails?.loginId}</h1>
          
          <Button onClick={signOut}>Sign out</Button>
          
          <Typography variant="h4" component="h1" gutterBottom>
            Create Opportunity
          </Typography>

          <OpportunityForm />

          <OpportunityTable />

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