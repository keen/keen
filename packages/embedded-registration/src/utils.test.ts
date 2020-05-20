/* eslint-disable @typescript-eslint/camelcase */

import { transformPayload, transformSignupResponse } from './utils';

describe('@keen.io/embedded-registration - utils', () => {
  describe('transformPayload()', () => {
    it('should transform request payload for sign up request', () => {
      const offerHandle = 'keen-plan-id';
      const values = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@keen.io',
        password: '$TrongPss4rw',
        companyDisclaimer: true,
        companyName: '',
      };

      const result = transformPayload(values, offerHandle);

      expect(result).toMatchInlineSnapshot(`
        Object {
          "email": "john.doe@keen.io",
          "first_name": "John",
          "last_name": "Doe",
          "offer_handle": "keen-plan-id",
          "password": "$TrongPss4rw",
        }
      `);
    });
  });

  describe('transformSignupResponse()', () => {
    it('should transform sign up request response', () => {
      const response = {
        organization_id: 'xcv124',
        project_id: 'ddlopa53',
        user_id: 'bg12aol',
        email: 'user@keen.io',
      };

      expect(transformSignupResponse(response)).toMatchInlineSnapshot(`
        Object {
          "organizationId": "xcv124",
        }
      `);
    });
  });
});
