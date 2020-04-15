import sagaHelper from 'redux-saga-testing';
import { put, call, select } from 'redux-saga/effects';

import { setRecommendation } from './recommendation';

import { updateRecommendation, updatePlanForService } from './saga';

describe('@keen.io/pricing-calculator - saga()', () => {
  describe('updateRecommendation() - upgrade plan', () => {
    const it = sagaHelper(updateRecommendation());

    it('should get store state', result => {
      const storeState = {
        recommendation: {
          recommendedPlan: 'team',
        },
        calculator: {
          events: 300,
          queries: 16000,
          services: {
            s3Streaming: false,
            customSSL: false,
            rbac: false,
          },
        },
      };

      expect(result).toEqual(select());
      return storeState;
    });

    it('should update plan recommendation to "Business"', result => {
      expect(result).toEqual(put(setRecommendation('business')));
    });
  });

  describe('updateRecommendation() - downgrade plan', () => {
    const it = sagaHelper(updateRecommendation());

    it('should get store state', result => {
      const storeState = {
        recommendation: {
          recommendedPlan: 'business',
        },
        calculator: {
          events: 300,
          queries: 14000,
          services: {
            s3Streaming: false,
            customSSL: false,
            rbac: false,
          },
        },
      };

      expect(result).toEqual(select());
      return storeState;
    });

    it('should update plan recommendation to "Team"', result => {
      expect(result).toEqual(put(setRecommendation('team')));
    });
  });

  describe('updatePlanForService() - services included', () => {
    const it = sagaHelper(updatePlanForService());

    it('should get store state', result => {
      const storeState = {
        recommendation: {
          recommendedPlan: 'business',
        },
        calculator: {
          events: 0,
          queries: 0,
          services: {
            rbac: true,
            customSSL: false,
          },
        },
      };

      expect(result).toEqual(select());
      return storeState;
    });

    it('should call "updateRecommendation()" saga', result => {
      expect(result).toEqual(call(updateRecommendation));
    });
  });

  describe('updatePlanForService() - Role-based access control', () => {
    const it = sagaHelper(updatePlanForService());

    it('should get store state', result => {
      const storeState = {
        recommendation: {
          recommendedPlan: 'team',
        },
        calculator: {
          events: 0,
          queries: 0,
          services: {
            rbac: true,
          },
        },
      };

      expect(result).toEqual(select());
      return storeState;
    });

    it('should update plan recommendation to "Business"', result => {
      expect(result).toEqual(put(setRecommendation('business')));
    });
  });

  describe('updatePlanForService() - Custom SSL', () => {
    const it = sagaHelper(updatePlanForService());

    it('should get store state', result => {
      const storeState = {
        recommendation: {
          recommendedPlan: 'team',
        },
        calculator: {
          events: 0,
          queries: 0,
          services: {
            customSSL: true,
          },
        },
      };

      expect(result).toEqual(select());
      return storeState;
    });

    it('should update plan recommendation to "Business"', result => {
      expect(result).toEqual(put(setRecommendation('business')));
    });
  });
});
