import React from 'react';
import { Schema } from '../../amplify/data/resource';

import { generateClient } from "aws-amplify/data";


const client = generateClient<Schema>();



const Home: React.FC = () => {

  // client.queries.getDevice({ id: "1" })
  //   // .then((result) => console.log(JSON.parse(result.data)))
  //   .then((result) => console.log(result.data))
  //   .catch((error) => console.log(error));

  // client.queries.getDeviceList()
  //   // .then((result) => console.log(JSON.parse(result.data)))
  //   .then((result) => console.log(result.data))
  //   .catch((error) => console.log(error));

  // client.mutations.addDevice({
  //   name: "My Super Device",
  //   color: "Red",
  //   capacity: "1024 KB",
  // })
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log(error));

  client.mutations.deleteDevice({ id: "ff80818190d0ec2e0190d4bc6dfa024a" })
    .then((result) => console.log(result.data))
    .catch((error) => console.log(error));

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home page!</p>
      {/* Add more content here as needed */}
    </div>
  );
};

export default Home;
