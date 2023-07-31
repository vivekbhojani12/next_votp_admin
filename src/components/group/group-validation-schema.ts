import * as yup from 'yup';
export const typeValidationSchema = yup.object().shape({
  name: yup.string().required('form:error-name-required'),
  email:yup.string().required('Email is required'),
  no_id:yup.string().required('Name is required'),
  exp_date:yup.string().required('Date is required')

});
