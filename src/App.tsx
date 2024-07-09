import React from 'react';

import AmplifyTheme from './AmplifyTheme';
import { Authenticator } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';

import OpportunityTable from './OpportunityTable';
import OpportunityForm from './OpportunityForm';
import MyAppBar from './AppBar';



const App: React.FC = () => {

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <MyAppBar username={user?.signInDetails?.loginId} onLogout={signOut} />
          <OpportunityTable />
        </div>
      )}
    </Authenticator>
  );
};


export default withAuthenticator(App, {
  components: {
    Authenticator: AmplifyTheme,
  },
});