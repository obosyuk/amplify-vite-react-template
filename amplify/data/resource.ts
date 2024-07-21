import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { sayHello } from "../functions/say-hello/resource";



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




  // For an external HTTP endpoint
  // Data types
  DeviceData: a.customType({
    id: a.string(),
    color: a.string(),
    capacity: a.string(),
    capacityGB: a.string(),
    price: a.string(),
    generation: a.string(),
    year: a.integer(),
    cpuModel: a.string(),
    hardDiskSize: a.string(),
    strapColour: a.string(),
    caseSize: a.string(),
    colorAlt: a.string(),
    description: a.string(),
    capacityAlt: a.string(),
    screenSize: a.string(),
    generationAlt: a.string(),
    priceAlt: a.string(),
  }),

  Device: a.customType({
    id: a.string(),
    name: a.string(),
    data: a.ref('DeviceData'),
    createdAt: a.datetime(),
    updatedAt: a.datetime(),
  }),

  DeviceList: a.customType({
    data: a.ref('Device').array(),
  }),

  // Operations
  getDevice: a
    .query()
    .arguments({ id: a.id().required() })
    .returns(a.ref('Device'))
    .authorization(allow => [allow.authenticated()])
    .handler(
      a.handler.custom({
        dataSource: "DeviceHttpDataSource",
        entry: "./device/getDevice.js",
      })
    ),

  getDeviceList: a
    .query()
    .returns(a.ref('DeviceList'))
    .authorization(allow => [allow.authenticated()])
    .handler(
      a.handler.custom({
        dataSource: "DeviceHttpDataSource",
        entry: "./device/getDeviceList.js",
      })
    ),

  addDevice: a
    .mutation()
    .arguments({
      name: a.string(),
      color: a.string(),
      capacity: a.string(),
    })
    .returns(a.ref("Device"))
    .authorization(allow => [allow.authenticated()])
    .handler(
      a.handler.custom({
        dataSource: "HttpDataSource",
        entry: "./device/addDevice.js",
      })
    ),

  updateDevice: a
    .mutation()
    .arguments({
      id: a.id().required(),
      name: a.string(),
      color: a.string(),
      capacity: a.string(),
    })
    .returns(a.ref("Device"))
    .authorization(allow => [allow.authenticated()])
    .handler(
      a.handler.custom({
        dataSource: "HttpDataSource",
        entry: "./device/updateDevice.js",
      })
    ),

  deleteDevice: a
    .mutation()
    .arguments({ id: a.id().required() })
    .returns(a.string())
    .authorization(allow => [allow.authenticated()])
    .handler(
      a.handler.custom({
        dataSource: "HttpDataSource",
        entry: "./device/deleteDevice.js",
      })
    ),

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
