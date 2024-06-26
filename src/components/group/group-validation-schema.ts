import * as yup from 'yup';
export const typeValidationSchema = yup.object().shape({
  name: yup.string().required('Name required'),
  // exp_date:yup.string().required('Date is required'),
  email: yup.string().required('Email is required'),
  no_id: yup
    .mixed() // Use .mixed() to allow custom validations
    .test('numbers-only', 'Number of ID should contain only numbers', (value) => {
      return /^\d+$/.test(value);
    })
    .required('Number of ID is required')

});

