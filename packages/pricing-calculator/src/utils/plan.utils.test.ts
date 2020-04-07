import {
  calculateCost,
  calculateEventsOverage,
  calculateQueriesOverage,
} from './plan.utils';

import { plansConfig } from '../plans-config';
import { PlanId } from '../types';

describe('@keen.io/pricing-calculator - utils', () => {
  describe('calculateQueriesOverage()', () => {
    it('should calculate overage cost', () => {
      const plan = 'team' as PlanId;
      const cost = calculateQueriesOverage(plan, 5200);

      expect(cost).toMatchInlineSnapshot(`
        Object {
          "cost": 10,
          "overage": 200,
        }
      `);
    });

    it('should calculate cost for no overage', () => {
      const plan = 'team' as PlanId;
      const cost = calculateQueriesOverage(plan, 4900);

      expect(cost).toMatchInlineSnapshot(`
        Object {
          "cost": 0,
          "overage": 0,
        }
      `);
    });
  });

  describe('calculateEventsOverage()', () => {
    it('should calculate overage cost', () => {
      const plan = 'team' as PlanId;
      const cost = calculateEventsOverage(plan, 255000);

      expect(cost).toMatchInlineSnapshot(`
        Object {
          "cost": 1,
          "overage": 5000,
        }
      `);
    });

    it('should calculate cost for no overage', () => {
      const plan = 'team' as PlanId;
      const cost = calculateEventsOverage(plan, 240000);

      expect(cost).toMatchInlineSnapshot(`
        Object {
          "cost": 0,
          "overage": 0,
        }
      `);
    });
  });

  describe('calculateCost()', () => {
    it('should calculate total cost with overages', () => {
      const properties = {
        planId: 'team' as PlanId,
        queries: 5200,
        events: 250000,
        s3Streaming: true,
      };

      const { total } = calculateCost(properties);

      expect(total).toMatchInlineSnapshot(`409`);
    });

    it('should calculate total cost without overages', () => {
      const properties = {
        planId: 'custom' as PlanId,
        queries: 5200,
        events: 250000,
        s3Streaming: true,
      };

      const { total } = calculateCost(properties);

      expect(total).toEqual(plansConfig['custom'].basePrice);
    });

    it('should not include "S3 Streaming" price', () => {
      const properties = {
        planId: 'custom' as PlanId,
        queries: 0,
        events: 0,
        s3Streaming: true,
      };
      const { servicesCost } = calculateCost(properties);

      expect(servicesCost.s3).toEqual(0);
    });

    it('should include 100$ for "S3 Streaming" service', () => {
      const properties = {
        planId: 'team' as PlanId,
        queries: 0,
        events: 0,
        s3Streaming: true,
      };
      const { servicesCost } = calculateCost(properties);

      expect(servicesCost.s3).toEqual(100);
    });
  });
});
