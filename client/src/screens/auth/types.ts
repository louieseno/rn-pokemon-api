import { UseFormHandleSubmit } from "react-hook-form";

export type AuthFormType = {
    email: '';
    password: '';
};

export type FormContextValuesType = {
    isValid: boolean,
    isSubmitting:boolean,
    handleSubmit?:UseFormHandleSubmit<AuthFormType>
};