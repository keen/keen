/* eslint-disable react/display-name */
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '@keen.io/colors';
import { IntervalSlider, Ruler } from '@keen.io/ui-core';

import { ServicesList } from './components';
import {
  Title,
  Label,
  Wrapper,
  TooltipText,
  RulerLabel,
  RulerContainer,
  SliderContainer,
  ComputeSection,
  ServicesSection,
} from './calculator.styles';

import { getDevice } from '../app';

import {
  eventsSettings,
  eventsRulerSettings,
  queriesSettings,
  queriesRulerSettings,
  getTooltipText,
} from './calculator.config';
import { servicesConfig } from '../services.config';

import { updateService, updateQueries, updateEvents } from './actions';

const Calculator: FC<{}> = () => {
  const dispatch = useDispatch();
  const device = useSelector(getDevice);

  const sliderLayout = device === 'desktop' ? 'row' : 'column';
  const sliderColors = Object.values(colors.green);

  const controlSettings = {
    size: 20,
    backgroundColor: colors.white['500'],
    borderColor: colors.green['500'],
  };

  return (
    <>
      <Title>Estimated usage per month</Title>
      <ComputeSection>
        <Wrapper layout={sliderLayout}>
          <Label>Events</Label>
          <SliderContainer>
            <IntervalSlider
              colors={sliderColors}
              railSettings={{ size: 6, borderRadius: 3 }}
              controlSettings={controlSettings}
              tooltipSettings={{
                enabled: true,
                position: 'top',
                renderText: value => (
                  <TooltipText>
                    {getTooltipText(
                      value,
                      eventsSettings.intervals[
                        eventsSettings.intervals.length - 1
                      ].maximum
                    )}{' '}
                    events
                  </TooltipText>
                ),
              }}
              intervals={eventsSettings.intervals}
              onChange={(events: number) => {
                dispatch(updateEvents(events));
              }}
            />
            <RulerContainer>
              <Ruler
                layout="horizontal"
                ticks={eventsRulerSettings}
                renderLabel={(label: string) => (
                  <RulerLabel
                    bold={eventsSettings.highlightLabels.includes(label)}
                    device={device}
                  >
                    {label}
                  </RulerLabel>
                )}
              />
            </RulerContainer>
          </SliderContainer>
        </Wrapper>
        <Wrapper layout={sliderLayout}>
          <Label>Queries</Label>
          <SliderContainer>
            <IntervalSlider
              colors={sliderColors}
              railSettings={{ size: 6, borderRadius: 3 }}
              controlSettings={controlSettings}
              tooltipSettings={{
                enabled: true,
                position: 'top',
                renderText: value => (
                  <TooltipText>
                    {getTooltipText(
                      value,
                      queriesSettings.intervals[
                        queriesSettings.intervals.length - 1
                      ].maximum
                    )}{' '}
                    queries
                  </TooltipText>
                ),
              }}
              intervals={queriesSettings.intervals}
              onChange={(queries: number) => {
                dispatch(updateQueries(queries));
              }}
            />
            <RulerContainer>
              <Ruler
                layout="horizontal"
                ticks={queriesRulerSettings}
                renderLabel={(label: string) => (
                  <RulerLabel
                    bold={queriesSettings.highlightLabels.includes(label)}
                    device={device}
                  >
                    {label}
                  </RulerLabel>
                )}
              />
            </RulerContainer>
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
