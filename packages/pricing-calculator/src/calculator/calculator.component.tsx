import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Slider } from '@keen.io/ui-core';

import { ServicesList } from './components';
import {
  Title,
  Label,
  SliderWrapper,
  ComputeSection,
  ServicesSection,
} from './calculator.styles';

import { servicesConfig } from '../services-config';

import { updateService, updateQueries, updateEvents } from './actions';

const Calculator: FC<{}> = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Title>Estimated usage per month</Title>
      <ComputeSection>
        <SliderWrapper>
          <Label>Events</Label>
          <Slider
            onChange={(events: number) => {
              dispatch(updateEvents(events));
            }}
            min={0}
            max={1000000}
            colors={['green', 'blue']}
          />
        </SliderWrapper>
        <SliderWrapper>
          <Label>Queries</Label>
          <Slider
            onChange={(queries: number) => {
              dispatch(updateQueries(queries));
            }}
            min={0}
            max={60000}
            colors={['green', 'blue']}
          />
        </SliderWrapper>
      </ComputeSection>
      <Title>Additional services</Title>
      <ServicesSection>
        <ServicesList
          services={servicesConfig}
          onChange={([service, state]) =>
            dispatch(updateService(service, state))
          }
        />
      </ServicesSection>
    </>
  );
};

export default Calculator;
