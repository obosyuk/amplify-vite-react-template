import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
    // DynamoDBDocumentClient,
    ScanCommand,
    // PutCommand,
    // GetCommand,
    // DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";



// const region = 'eu-central-1';
const ses = new SESClient({});
const dynamoDB = new DynamoDBClient({});
const tableName = "Opportunity-cjhloybgkzed7nqyr4j67csegy-NONE";

export const handler = async (event: any) => {
    try {
        // Query the DynamoDB table
        const command = new ScanCommand({
            TableName: tableName,
            // FilterExpression: '#stage = :stage',
            // ExpressionAttributeNames: {
            //     '#stage': 'stage',
            // },
            // ExpressionAttributeValues: {
            //     ':stage': { S: 'Prospecting' }, // Adjust the filter condition as needed
            // },
        });

        const response = await dynamoDB.send(command);
        console.log('Query response:', response);
        const opportunities = response.Items;
        console.log('Opportunities:', opportunities);

        // Prepare email content
        // const emailBody = opportunities.map(op => `Opportunity: ${op.name}, Amount: ${op.amount}`).join('\n');
        const emailBody = opportunities?.join("\n");
        

        // Send email using SES
        const params = {
            // Source: process.env.SOURCE_EMAIL,
            Source: 'bo830453@gmail.com',
            Destination: {
                // ToAddresses: [process.env.RECIPIENT_EMAIL],
                ToAddresses: ['bo830453@gmail.com',],
            },
            Message: {
                Subject: {
                    Data: 'Daily Opportunities',
                },
                Body: {
                    Text: {
                        Data: emailBody,
                    },
                },
            },
        };

        const send_command = new SendEmailCommand(params);
        await ses.send(send_command);

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error occurred:', error);
    }
};





