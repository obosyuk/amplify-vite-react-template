import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { sayHello } from "../functions/say-hello/resource";
import { fetchObjects } from "../functions/fetch-objects/resource";



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



  sayHello: a
    .query()
    .arguments({
      name: a.string(),
    })
    .returns(a.string())
    .handler(a.handler.function(sayHello))
    .authorization(allow => [allow.authenticated()]),

  fetchObjects: a
    .query()
    // .arguments({
    //   name: a.string(),
    // })
    .returns(a.string())
    .handler(a.handler.function(fetchObjects))
    .authorization(allow => [allow.authenticated()]),



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
