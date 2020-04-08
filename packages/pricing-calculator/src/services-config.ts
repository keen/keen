import { Service } from './types';

export const servicesConfig: Service[] = [
  {
    id: 's3Streaming',
    name: 'S3 Streaming',
    description:
      'Stream your full-resolution, enriched data to Amazon S3 and harness the power of your data anywhere. This is useful for backups, routing events to third parties, SQL-based analysis.',
  },
  {
    id: 'rbac',
    name: 'Role-Based Access',
    description:
      'Guarantee each of your users can only explore the data they need, with completely customizable permission tiers. API Keys can be used to grant access to particular data points or the results of particular queries.',
  },
  {
    id: 'customSSL',
    name: 'Custom SSL',
    description:
      'Leverage the encrypted communication to Keen on your custom, branded domain.',
  },
];
