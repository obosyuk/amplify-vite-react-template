/* eslint-disable */
"use client";
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getOpportunity } from "./graphql/queries";
import { updateOpportunity } from "./graphql/mutations";
const client = generateClient();
export default function OpportunityUpdateForm(props) {
  const {
    id: idProp,
    opportunity: opportunityModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    description: "",
    stage: "",
    amount: "",
    closeDate: "",
    accountId: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [stage, setStage] = React.useState(initialValues.stage);
  const [amount, setAmount] = React.useState(initialValues.amount);
  const [closeDate, setCloseDate] = React.useState(initialValues.closeDate);
  const [accountId, setAccountId] = React.useState(initialValues.accountId);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = opportunityRecord
      ? { ...initialValues, ...opportunityRecord }
      : initialValues;
    setName(cleanValues.name);
    setDescription(cleanValues.description);
    setStage(cleanValues.stage);
    setAmount(cleanValues.amount);
    setCloseDate(cleanValues.closeDate);
    setAccountId(cleanValues.accountId);
    setErrors({});
  };
  const [opportunityRecord, setOpportunityRecord] =
    React.useState(opportunityModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getOpportunity.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getOpportunity
        : opportunityModelProp;
      setOpportunityRecord(record);
    };
    queryData();
  }, [idProp, opportunityModelProp]);
  React.useEffect(resetStateValues, [opportunityRecord]);
  const validations = {
    name: [],
    description: [],
    stage: [],
    amount: [],
    closeDate: [],
    accountId: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name: name ?? null,
          description: description ?? null,
          stage: stage ?? null,
          amount: amount ?? null,
          closeDate: closeDate ?? null,
          accountId: accountId ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateOpportunity.replaceAll("__typename", ""),
            variables: {
              input: {
                id: opportunityRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "OpportunityUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              description,
              stage,
              amount,
              closeDate,
              accountId,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description: value,
              stage,
              amount,
              closeDate,
              accountId,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <SelectField
        label="Stage"
        placeholder="Please select an option"
        isDisabled={false}
        value={stage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              stage: value,
              amount,
              closeDate,
              accountId,
            };
            const result = onChange(modelFields);
            value = result?.stage ?? value;
          }
          if (errors.stage?.hasError) {
            runValidationTasks("stage", value);
          }
          setStage(value);
        }}
        onBlur={() => runValidationTasks("stage", stage)}
        errorMessage={errors.stage?.errorMessage}
        hasError={errors.stage?.hasError}
        {...getOverrideProps(overrides, "stage")}
      >
        <option
          children="Prospecting"
          value="Prospecting"
          {...getOverrideProps(overrides, "stageoption0")}
        ></option>
        <option
          children="Qualification"
          value="Qualification"
          {...getOverrideProps(overrides, "stageoption1")}
        ></option>
        <option
          children="Proposal"
          value="Proposal"
          {...getOverrideProps(overrides, "stageoption2")}
        ></option>
        <option
          children="Negotiation"
          value="Negotiation"
          {...getOverrideProps(overrides, "stageoption3")}
        ></option>
        <option
          children="Closed won"
          value="Closed_Won"
          {...getOverrideProps(overrides, "stageoption4")}
        ></option>
        <option
          children="Closed lost"
          value="Closed_Lost"
          {...getOverrideProps(overrides, "stageoption5")}
        ></option>
      </SelectField>
      <TextField
        label="Amount"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={amount}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              description,
              stage,
              amount: value,
              closeDate,
              accountId,
            };
            const result = onChange(modelFields);
            value = result?.amount ?? value;
          }
          if (errors.amount?.hasError) {
            runValidationTasks("amount", value);
          }
          setAmount(value);
        }}
        onBlur={() => runValidationTasks("amount", amount)}
        errorMessage={errors.amount?.errorMessage}
        hasError={errors.amount?.hasError}
        {...getOverrideProps(overrides, "amount")}
      ></TextField>
      <TextField
        label="Close date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={closeDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              stage,
              amount,
              closeDate: value,
              accountId,
            };
            const result = onChange(modelFields);
            value = result?.closeDate ?? value;
          }
          if (errors.closeDate?.hasError) {
            runValidationTasks("closeDate", value);
          }
          setCloseDate(value);
        }}
        onBlur={() => runValidationTasks("closeDate", closeDate)}
        errorMessage={errors.closeDate?.errorMessage}
        hasError={errors.closeDate?.hasError}
        {...getOverrideProps(overrides, "closeDate")}
      ></TextField>
      <TextField
        label="Account id"
        isRequired={false}
        isReadOnly={false}
        value={accountId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              description,
              stage,
              amount,
              closeDate,
              accountId: value,
            };
            const result = onChange(modelFields);
            value = result?.accountId ?? value;
          }
          if (errors.accountId?.hasError) {
            runValidationTasks("accountId", value);
          }
          setAccountId(value);
        }}
        onBlur={() => runValidationTasks("accountId", accountId)}
        errorMessage={errors.accountId?.errorMessage}
        hasError={errors.accountId?.hasError}
        {...getOverrideProps(overrides, "accountId")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || opportunityModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || opportunityModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
