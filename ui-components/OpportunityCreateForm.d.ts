import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type OpportunityCreateFormInputValues = {
    name?: string;
    description?: string;
    stage?: string;
    amount?: number;
    closeDate?: string;
    accountId?: string;
};
export declare type OpportunityCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    stage?: ValidationFunction<string>;
    amount?: ValidationFunction<number>;
    closeDate?: ValidationFunction<string>;
    accountId?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OpportunityCreateFormOverridesProps = {
    OpportunityCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    stage?: PrimitiveOverrideProps<SelectFieldProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    closeDate?: PrimitiveOverrideProps<TextFieldProps>;
    accountId?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type OpportunityCreateFormProps = React.PropsWithChildren<{
    overrides?: OpportunityCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: OpportunityCreateFormInputValues) => OpportunityCreateFormInputValues;
    onSuccess?: (fields: OpportunityCreateFormInputValues) => void;
    onError?: (fields: OpportunityCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OpportunityCreateFormInputValues) => OpportunityCreateFormInputValues;
    onValidate?: OpportunityCreateFormValidationValues;
} & React.CSSProperties>;
export default function OpportunityCreateForm(props: OpportunityCreateFormProps): React.ReactElement;
