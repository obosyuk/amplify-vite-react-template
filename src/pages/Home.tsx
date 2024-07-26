import React, { useEffect, useState } from 'react';
import { Schema } from '../../amplify/data/resource';

import { generateClient } from "aws-amplify/data";
import { fetchUserAttributes } from 'aws-amplify/auth';
import { record } from 'aws-amplify/analytics/kinesis';


const client = generateClient<Schema>();


const Home: React.FC = () => {

  const [user, setUser] = useState();


  record({
    data: {
      hello: 'world!!!'
    },
    partitionKey: 'myPartitionKey',
    streamName: 'myKinesisStream'
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await fetchUserAttributes();
        setUser(userData);
        console.log(userData.email);
        console.log(userData.birthdate);
      } catch (error) {
        console.error('Error fetching user attributes:', error);
      }
    }
    
    fetchData();
  }, []);

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

    
  client.queries.sayHello({name: 'd'})
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
