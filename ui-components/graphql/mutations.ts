/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $condition: ModelCustomerConditionInput
    $input: CreateCustomerInput!
  ) {
    createCustomer(condition: $condition, input: $input) {
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
export const createOpportunity = /* GraphQL */ `
  mutation CreateOpportunity(
    $condition: ModelOpportunityConditionInput
    $input: CreateOpportunityInput!
  ) {
    createOpportunity(condition: $condition, input: $input) {
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
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $condition: ModelCustomerConditionInput
    $input: DeleteCustomerInput!
  ) {
    deleteCustomer(condition: $condition, input: $input) {
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
export const deleteOpportunity = /* GraphQL */ `
  mutation DeleteOpportunity(
    $condition: ModelOpportunityConditionInput
    $input: DeleteOpportunityInput!
  ) {
    deleteOpportunity(condition: $condition, input: $input) {
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
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $condition: ModelCustomerConditionInput
    $input: UpdateCustomerInput!
  ) {
    updateCustomer(condition: $condition, input: $input) {
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
export const updateOpportunity = /* GraphQL */ `
  mutation UpdateOpportunity(
    $condition: ModelOpportunityConditionInput
    $input: UpdateOpportunityInput!
  ) {
    updateOpportunity(condition: $condition, input: $input) {
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
