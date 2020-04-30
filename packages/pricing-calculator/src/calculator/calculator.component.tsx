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

import {
  updateService,
  updateQueries,
  updateEvents,
  setSliderDimension,
} from './actions';
import { getCalculatorState } from './selectors';

import { Interval, getIndex, calculateIntervalValue } from '../utils';

const Calculator: FC<{}> = () => {
  const dispatch = useDispatch();
  const device = useSelector(getDevice);
  const { sliderDimension, events, queries } = useSelector(getCalculatorState);

  const sliderLayout = device === 'desktop' ? 'row' : 'column';
  const sliderColors = Object.values(colors.green);

  const controlSettings = {
    size: 20,
    backgroundColor: colors.white['500'],
    borderColor: colors.green['500'],
  };

  const convertPositionToValue = (position: string, intervals: Interval[]) => {
    const controlPosition = (parseFloat(position) / 100) * sliderDimension;
    const stepDimension = sliderDimension / intervals.length;
    const index = getIndex(controlPosition, stepDimension);
    const value = calculateIntervalValue({
      controlPosition,
      interval: intervals[index],
      currentIndex: index,
      stepDimension,
    });

    return value;
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
              initialValue={events}
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
              onChange={(events: number) => dispatch(updateEvents(events))}
            />
            <RulerContainer>
              <Ruler
                layout="horizontal"
                ticks={eventsRulerSettings}
                onClick={pos => {
                  const val = convertPositionToValue(
                    pos,
                    eventsSettings.intervals
                  );
                  dispatch(updateEvents(val));
                }}
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
              initialValue={queries}
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
              onChange={(queries: number) => dispatch(updateQueries(queries))}
              getSliderDimension={(dimension: number) =>
                dispatch(setSliderDimension(dimension))
              }
            />
            <RulerContainer>
              <Ruler
                layout="horizontal"
                ticks={queriesRulerSettings}
                onClick={pos => {
                  const val = convertPositionToValue(
                    pos,
                    queriesSettings.intervals
                  );
                  dispatch(updateQueries(val));
                }}
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
