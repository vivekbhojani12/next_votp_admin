import * as yup from 'yup';
export const typeValidationSchema = yup.object().shape({
  name: yup.string().required('form:error-name-required'),
  email:yup.string().required('form:error-email-required'),
  no_id:yup.string().required('form:error-no-required'),

});
