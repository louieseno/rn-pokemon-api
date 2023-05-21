import * as yup from 'yup';

export const authFormValidationSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email address required'),
  password: yup
    .string()
    .required('Password required')
    .min(8, 'Minimum of 8 characters')
    .max(50, 'Maximum of 50 characters'),
});
