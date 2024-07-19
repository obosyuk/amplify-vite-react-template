import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { sayHello } from './functions/say-hello/resource';
import { fetchObjects } from './functions/fetch-objects/resource';
import { sendEmails } from './functions/send-emails/resource';

import * as cdk from 'aws-cdk-lib';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as iam from '@aws-cdk/aws-iam';
import { Stack } from "aws-cdk-lib";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";


const backend = defineBackend({
  auth,
  data,
  sayHello,
  fetchObjects,
  sendEmails
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
