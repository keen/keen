import { CreditCardFields } from './types';

export const validationErrors: Record<CreditCardFields, string> = {
  number: 'Please enter a valid card number',
  month: 'Please enter a valid exp. date',
  year: 'Please enter a valid exp. date',
  cvv: 'Please enter a valid CVV code',
  lastName: 'Please enter a valid first name',
  firstName: ' Please enter a valid last name',
};
