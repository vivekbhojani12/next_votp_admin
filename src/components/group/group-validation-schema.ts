import * as yup from 'yup';
export const typeValidationSchema = yup.object().shape({
  name: yup.string().required('Name required'),
  exp_date:yup.string().required('Date is reqrror-name-required'),
  email:yup.string().required('Email is required'),
  no_id: yup
  .mixed() // Use .mixed() to allow custom validations
  .test('number', 'Number of Id should contain only Numbers', (value: any) => {
    return /[0-9]/.test(value);
  })
  .required('Number of ID is required')

});


