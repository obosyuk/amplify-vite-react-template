/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCustomer = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
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
export const getOpportunity = /* GraphQL */ `
  query GetOpportunity($id: ID!) {
    getOpportunity(id: $id) {
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
export const listCustomerByNameAndEmail = /* GraphQL */ `
  query ListCustomerByNameAndEmail(
    $email: ModelStringKeyConditionInput
    $filter: ModelCustomerFilterInput
    $limit: Int
    $name: String!
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCustomerByNameAndEmail(
      email: $email
      filter: $filter
      limit: $limit
      name: $name
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        createdAt
        email
        id
        name
        phone
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        email
        id
        name
        phone
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listOpportunities = /* GraphQL */ `
  query ListOpportunities(
    $filter: ModelOpportunityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOpportunities(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        accountId
        amount
        closeDate
        createdAt
        customerId
        description
        id
        name
        stage
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listOpportunityByAccountIdAndName = /* GraphQL */ `
  query ListOpportunityByAccountIdAndName(
    $accountId: String!
    $filter: ModelOpportunityFilterInput
    $limit: Int
    $name: ModelStringKeyConditionInput
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listOpportunityByAccountIdAndName(
      accountId: $accountId
      filter: $filter
      limit: $limit
      name: $name
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        accountId
        amount
        closeDate
        createdAt
        customerId
        description
        id
        name
        stage
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
