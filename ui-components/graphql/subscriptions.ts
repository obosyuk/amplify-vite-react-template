/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCustomer = /* GraphQL */ `
  subscription OnCreateCustomer($filter: ModelSubscriptionCustomerFilterInput) {
    onCreateCustomer(filter: $filter) {
      createdAt
      email
      id
      name
      opportunities {
        nextToken
        __typename
      }
      phone
      updatedAt
      __typename
    }
  }
`;
export const onCreateOpportunity = /* GraphQL */ `
  subscription OnCreateOpportunity(
    $filter: ModelSubscriptionOpportunityFilterInput
  ) {
    onCreateOpportunity(filter: $filter) {
      accountId
      amount
      closeDate
      createdAt
      customer {
        createdAt
        email
        id
        name
        phone
        updatedAt
        __typename
      }
      customerId
      description
      id
      name
      stage
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCustomer = /* GraphQL */ `
  subscription OnDeleteCustomer($filter: ModelSubscriptionCustomerFilterInput) {
    onDeleteCustomer(filter: $filter) {
      createdAt
      email
      id
      name
      opportunities {
        nextToken
        __typename
      }
      phone
      updatedAt
      __typename
    }
  }
`;
export const onDeleteOpportunity = /* GraphQL */ `
  subscription OnDeleteOpportunity(
    $filter: ModelSubscriptionOpportunityFilterInput
  ) {
    onDeleteOpportunity(filter: $filter) {
      accountId
      amount
      closeDate
      createdAt
      customer {
        createdAt
        email
        id
        name
        phone
        updatedAt
        __typename
      }
      customerId
      description
      id
      name
      stage
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCustomer = /* GraphQL */ `
  subscription OnUpdateCustomer($filter: ModelSubscriptionCustomerFilterInput) {
    onUpdateCustomer(filter: $filter) {
      createdAt
      email
      id
      name
      opportunities {
        nextToken
        __typename
      }
      phone
      updatedAt
      __typename
    }
  }
`;
export const onUpdateOpportunity = /* GraphQL */ `
  subscription OnUpdateOpportunity(
    $filter: ModelSubscriptionOpportunityFilterInput
  ) {
    onUpdateOpportunity(filter: $filter) {
      accountId
      amount
      closeDate
      createdAt
      customer {
        createdAt
        email
        id
        name
        phone
        updatedAt
        __typename
      }
      customerId
      description
      id
      name
      stage
      updatedAt
      __typename
    }
  }
`;
