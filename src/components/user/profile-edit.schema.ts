import * as yup from 'yup';



export const profileValidationSchema = yup.object().shape({
    name: yup.string().required('form:error-name-required'),
   
  });