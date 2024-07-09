import React from 'react';
import { Authenticator, AuthenticatorProps } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

const inputStyle = {
  marginBottom: '1rem',
  padding: '0.5rem',
  fontSize: '1rem',
};

const buttonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const AmplifyTheme: React.FC<AuthenticatorProps> = (props) => (
  <Authenticator.Provider>
    <Authenticator.FormSection style={formStyle}>
      <Authenticator.SignIn
        headerText="Welcome to My App"
        slot="sign-in"
        formFields={{
          style: inputStyle,
        }}
        button={{
          style: buttonStyle,
        }}
        {...props}
      />
    </Authenticator.FormSection>
  </Authenticator.Provider>
);

export default AmplifyTheme;
