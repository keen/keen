import * as Yup from 'yup';

export const schema = Yup.object().shape({
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please enter your last name'),
  password: Yup.string()
    .required(' ')
    .matches(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})((?=.*[!@#$%^&*])|(?=.*[0-9]))'
      ),
      ' '
    ),
  companyName: Yup.string().when('companyDisclaimer', {
    is: val => val === false,
    then: Yup.string().required(
      'Please enter the company name or click the box below the field'
    ),
  }),
  email: Yup.string()
    .email('Please enter your email in format: username@example.com')
    .required('Please enter your email'),
});

export const emailIdentityError =
  'Sorry, the email you have entered has been categorized as possible spam. Use a different email address, or contact us at team@keen.io';
