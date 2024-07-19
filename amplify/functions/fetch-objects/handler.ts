import https from 'https';

export const handler = async (event: any) => {
  return new Promise((resolve, reject) => {
    https.get('https://api.restful-api.dev/objects', (resp) => {
      let data = '';

      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            statusCode: 200,
            body: JSON.stringify(jsonData),
          });
        } catch (error) {
          reject({
            statusCode: 500,
            body: JSON.stringify({ error: 'Error parsing JSON response' }),
          });
        }
      });

    }).on('error', (err) => {
      reject({
        statusCode: 500,
        body: JSON.stringify({ error: err.message }),
      });
    });
  });
};
