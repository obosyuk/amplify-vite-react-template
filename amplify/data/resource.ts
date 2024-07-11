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
      customerId: a.id(),
      customer: a.belongsTo("Customer", 'customerId'),
    })
    .secondaryIndexes((index) => [
      index("accountId")
        .sortKeys(["name"]),
    ])
    .authorization(allow => [
      allow.group('admin').to(['create']),
      // allow.publicApiKey().to(['create']),
      allow.authenticated().to(['read']),
    ]),
  // .authorization(allow => [allow.publicApiKey()])
  Customer: a.model({
    name: a.string(),
    email: a.email(),
    phone: a.phone(),
    opportunities: a.hasMany("Opportunity", 'customerId')
  })
  .secondaryIndexes((index) => [
    index("name")
      .sortKeys(["email"]),
  ])
    .authorization(allow => [allow.authenticated()]),
  // .authorization(allow => [allow.owner()]),
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
