import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Opportunity } from "./graphql/types";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type OpportunityUpdateFormInputValues = {
    name?: string;
    description?: string;
    stage?: string;
    amount?: number;
    closeDate?: string;
    accountId?: string;
};
export declare type OpportunityUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    stage?: ValidationFunction<string>;
    amount?: ValidationFunction<number>;
    closeDate?: ValidationFunction<string>;
    accountId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OpportunityUpdateFormOverridesProps = {
    OpportunityUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    stage?: PrimitiveOverrideProps<SelectFieldProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    closeDate?: PrimitiveOverrideProps<TextFieldProps>;
    accountId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type OpportunityUpdateFormProps = React.PropsWithChildren<{
    overrides?: OpportunityUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    opportunity?: Opportunity;
    onSubmit?: (fields: OpportunityUpdateFormInputValues) => OpportunityUpdateFormInputValues;
    onSuccess?: (fields: OpportunityUpdateFormInputValues) => void;
    onError?: (fields: OpportunityUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OpportunityUpdateFormInputValues) => OpportunityUpdateFormInputValues;
    onValidate?: OpportunityUpdateFormValidationValues;
} & React.CSSProperties>;
export default function OpportunityUpdateForm(props: OpportunityUpdateFormProps): React.ReactElement;
