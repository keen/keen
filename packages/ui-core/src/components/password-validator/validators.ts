export const passwordValidators = [
  { description: 'One lowercase letter', validate: new RegExp('[a-z]') },
  {
    description: 'One number or special character',
    validate: new RegExp('(?=.*[!@#$%^&*])|(?=.*[0-9])'),
  },
  { description: 'One uppercase letter', validate: new RegExp('[A-Z]') },
  { description: '8 characters minimum', validate: new RegExp('(?=.{8,})') },
];
