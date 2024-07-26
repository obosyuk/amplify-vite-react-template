import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { initializeInAppMessaging } from 'aws-amplify/in-app-messaging';

import '@aws-amplify/ui-react/styles.css';
import { ThemeProvider } from '@aws-amplify/ui-react';


Amplify.configure(outputs);
Amplify.configure({...Amplify.getConfig(), 
  Analytics: {
    Kinesis: {
      // REQUIRED -  Amazon Kinesis service region
      region: 'eu-central-1',

      // OPTIONAL - The buffer size for events in number of items.
      bufferSize: 1000,

      // OPTIONAL - The number of events to be deleted from the buffer when flushed.
      flushSize: 100,

      // OPTIONAL - The interval in milliseconds to perform a buffer check and flush if necessary.
      flushInterval: 5000, // 5s

      // OPTIONAL - The limit for failed recording retries.
      resendLimit: 5
    }
  }
});

initializeInAppMessaging();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
