import * as yup from 'yup';

export const TokenValidationSchema = yup.object().shape({
  // exp_date: yup.string().required('form:error-name-required'),
  no_id: yup
    .number()
    .required('form:error-email-required'),
});