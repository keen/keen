import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { Icon } from '@keen.io/icons';
import { Toggle } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import {
  Contaier,
  ServiceWrapper,
  TooltipContent,
  Label,
} from './services-list.styles';
import { getCalculatorState } from '../../selectors';

import { ServiceId, Service } from '../../../types';

type Props = {
  services: Service[];
  onChange: (service: [ServiceId, boolean]) => void;
};

const ServicesList: FC<Props> = ({ services, onChange }) => {
  const { services: servicesState } = useSelector(getCalculatorState);

  const iconProps = {
    fill: colors.green['100'],
    width: 20,
    height: 20,
  };

  return (
    <Contaier>
      {services.map(({ id, name, description }) => (
        <ServiceWrapper key={id}>
          <Toggle
            isOn={servicesState[id]}
            onChange={state => onChange([id, state])}
          />
          <Label onClick={() => onChange([id, !servicesState[id]])}>
            {name}
          </Label>
          <ReactTooltip id={id}>
            <TooltipContent>{description}</TooltipContent>
          </ReactTooltip>
          <div data-tip="React-tooltip" data-for={id}>
            <Icon {...iconProps} type="question-mark" />
          </div>
        </ServiceWrapper>
      ))}
    </Contaier>
  );
};

export default ServicesList;
