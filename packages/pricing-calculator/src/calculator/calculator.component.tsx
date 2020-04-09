import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '@keen.io/colors';
import { Slider, Position } from '@keen.io/ui-core';

import { ServicesList } from './components';
import {
  Title,
  Label,
  Wrapper,
  SliderContainer,
  ComputeSection,
  ServicesSection,
} from './calculator.styles';

import { getDevice } from '../app';
import { servicesConfig } from '../services-config';

import { updateService, updateQueries, updateEvents } from './actions';

const Calculator: FC<{}> = () => {
  const dispatch = useDispatch();
  const device = useSelector(getDevice);

  const sliderLayout = device === 'desktop' ? 'row' : 'column';
  const sliderColors = Object.values(colors.green);

  const tooltip = {
    enabled: true,
    position: device === 'desktop' ? 'top' : ('right' as Position),
  };

  return (
    <>
      <Title>Estimated usage per month</Title>
      <ComputeSection>
        <Wrapper layout={sliderLayout}>
          <Label>Events</Label>
          <SliderContainer>
            <Slider
              onChange={(events: number) => {
                dispatch(updateEvents(events));
              }}
              tooltip={tooltip}
              min={0}
              max={1000000}
              size={6}
              colors={sliderColors}
            />
          </SliderContainer>
        </Wrapper>
        <Wrapper layout={sliderLayout}>
          <Label>Queries</Label>
          <SliderContainer>
            <Slider
              onChange={(queries: number) => {
                dispatch(updateQueries(queries));
              }}
              tooltip={tooltip}
              min={0}
              max={60000}
              size={6}
              colors={sliderColors}
            />
          </SliderContainer>
        </Wrapper>
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
