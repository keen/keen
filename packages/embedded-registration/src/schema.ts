import * as Yup from 'yup';

export const schema = Yup.object().shape({
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please enter your last name'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})((?=.*[!@#$%^&*])|(?=.*[0-9]))'
      ),
      'Password is not secure'
    ),
  email: Yup.string()
    .email('Please enter your email in format: username@example.com')
    .required('Please enter your email'),
});
