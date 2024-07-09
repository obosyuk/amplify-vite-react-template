import { type ClientSchema, a, defineData } from "@aws-amplify/backend";



const opportunityStages = [
  "Prospecting",
  "Qualification",
  "Proposal",
  "Negotiation",
  "Closed_Won",
  "Closed_Lost",
];

const schema = a.schema({
  Opportunity: a
    .model({
      name: a.string(),
      description: a.string(),
      stage: a.enum(opportunityStages),
      amount: a.integer(),
      closeDate: a.date(),
      accountId: a.string(),

    })
    .authorization(allow => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
