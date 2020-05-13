import { CreditCardFields } from './types';

export const defaultLabels: Record<CreditCardFields, string> = {
  [CreditCardFields.CARD_NUMBER]: 'Card number',
  [CreditCardFields.MONTH]: 'Expiration date',
  [CreditCardFields.YEAR]: 'Expiration date',
  [CreditCardFields.CVV]: 'CVV',
  [CreditCardFields.FIRST_NAME]: 'First name on card',
  [CreditCardFields.LAST_NAME]: 'Last name on card',
};

export const defaultIdentifiers: Record<CreditCardFields, string> = {
  [CreditCardFields.CARD_NUMBER]: 'card-number',
  [CreditCardFields.MONTH]: 'card-month',
  [CreditCardFields.YEAR]: 'card-year',
  [CreditCardFields.CVV]: 'card-cvv',
  [CreditCardFields.FIRST_NAME]: 'first-name',
  [CreditCardFields.LAST_NAME]: 'last-name',
};
