import React from 'react';
import AmplifyTheme from './AmplifyTheme';
import { Authenticator } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import OpportunityTable from './OpportunityTable';
// import { CustomerCreateForm } from "../ui-components"
// import { CustomerCreateForm, OpportunityCreateForm } from "../ui-components";


import NavBar from '../ui-components/NavBar';
import Home from './pages/Home';
import OpportunityList from './pages/OpportunityList';
import CustomerList from './pages/CustomerList';
import ContactList from './pages/ContactList';
import UserProfile from './pages/UserProfile';




const App: React.FC = () => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <Router>
            <NavBar username={user?.signInDetails?.loginId} onLogout={signOut} />
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/opportunities" Component={OpportunityList} />
              <Route path="/customers" Component={CustomerList} />
              <Route path="/contacts" Component={ContactList} />
              <Route path="/current-user" Component={UserProfile} />
            </Routes>
          </Router>
        </div>
      )}
    </Authenticator>
  );
};


export default withAuthenticator(App, {
  components: {
    theme: AmplifyTheme,
  },
});

// export default function App() {
//   return (
//     <Authenticator>
//       {({ signOut, user }) => (
//         <div>
//           <MyAppBar username={user?.signInDetails?.loginId} onLogout={signOut} />
//           <OpportunityTable />
//         </div>
//       )}
//     </Authenticator>
//   );
// }