import React, { FC } from 'react';
import { Toggle } from '@keen.io/ui-core';

import { Contaier, Service, Label } from './services-list.styles';

import { Services } from '../../types';

type Props = {
  services: Record<Services, boolean>;
  onChange: (service: [Services, boolean]) => void;
};

const ServicesList: FC<Props> = ({ services, onChange }) => {
  const { s3Streaming, rbac, customSSL } = services;
  return (
    <Contaier>
      <Service>
        <Toggle
          isOn={s3Streaming}
          onChange={state => onChange(['s3Streaming', state])}
        />
        <Label onClick={() => onChange(['s3Streaming', !s3Streaming])}>
          S3 Streaming
        </Label>
      </Service>
      <Service>
        <Toggle isOn={rbac} onChange={state => onChange(['rbac', state])} />
        <Label onClick={() => onChange(['rbac', !rbac])}>
          Role-Based Access
        </Label>
      </Service>
      <Service>
        <Toggle
          isOn={customSSL}
          onChange={state => onChange(['customSSL', state])}
        />
        <Label onClick={() => onChange(['customSSL', !customSSL])}>
          Custom SSL
        </Label>
      </Service>
    </Contaier>
  );
};

export default ServicesList;
