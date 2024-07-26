import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { sayHello } from './functions/say-hello/resource';
import { sendEmails } from './functions/send-emails/resource';

import * as cdk from 'aws-cdk-lib';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as iam from '@aws-cdk/aws-iam';
import { Stack } from "aws-cdk-lib";
import { Stream } from "aws-cdk-lib/aws-kinesis";
import { StartingPosition } from "aws-cdk-lib/aws-lambda";
import { KinesisEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { myKinesisFunction } from "./functions/kinesis-function/resource";
import { Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { storage } from './storage/resource';



const backend = defineBackend({
  auth,
  data,
  storage,
  sayHello,
  sendEmails,
  myKinesisFunction,
});

// const stack = new Stack();

// const sendEmailsLambda = backend.sendEmails.resources.lambda;
const opportunitiesTable = backend.data.resources.tables.Opportunity;
// const stack = opportunitiesTable.stack;


backend.sendEmails.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: [
      "dynamodb:*",
      "ses:SendEmail",
    ],
    resources: ["*"],
  })

);

// Create a new EventBridge rule that is triggered every hour
const rule = new events.Rule(
  backend.sendEmails.resources.lambda,
  'Rule',
  {
    description: 'Send emails every minute',
    schedule: events.Schedule.rate(cdk.Duration.days(1)),
  },
);

// Add the lambda function as a target for the rule
rule.addTarget(
  new targets.LambdaFunction(backend.sendEmails.resources.lambda),
);

// For an external HTTP endpoint
backend.data.addHttpDataSource(
  "DeviceHttpDataSource",
  "https://api.restful-api.dev"
);

// extract L1 CfnUserPool resources
const { cfnUserPool } = backend.auth.resources.cfnResources;
// modify cfnUserPool policies directly
cfnUserPool.policies = {
  passwordPolicy: {
    minimumLength: 10,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: true,
    requireUppercase: true,
    temporaryPasswordValidityDays: 20,
  },
};



// Kinesis Data Stream integration
const kinesisStack = backend.createStack("kinesis-stack");

const kinesisStream = new Stream(kinesisStack, "KinesisStream", {
  streamName: "myKinesisStream",
  shardCount: 1,
});

const eventSource = new KinesisEventSource(kinesisStream, {
  startingPosition: StartingPosition.LATEST,
  reportBatchItemFailures: true,
});

backend.myKinesisFunction.resources.lambda.addEventSource(eventSource);

const kinesisPolicy = new PolicyStatement({
  actions: [
    "kinesis:PutRecords",
  ],
  resources: [kinesisStream.streamArn],
});
backend.auth.resources.authenticatedUserIamRole.addToPrincipalPolicy(kinesisPolicy);
backend.auth.resources.unauthenticatedUserIamRole.addToPrincipalPolicy(kinesisPolicy);
