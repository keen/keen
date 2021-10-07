import React, { FC, useState, useCallback, useMemo, useEffect } from 'react';
import { useKeypress } from '@keen.io/react-hooks';

import Dropdown from '../dropdown';
import Input from '../input';
import DropdownList from '../dropdown-list';
import DropdownListContainer from '../dropdown-list-container';
import DropableContainer from '../dropable-container';

import {
  Container,
  TimeLabel,
  TimeValue,
  UnitsContainer,
} from './time-period.styles';

import { TIME_UNITS, KEYBOARD_KEYS } from '../../constants';

type Props = {
  /** Time relativity */
  relativity: string;
  /** Time value */
  value: number;
  /** Timeframe units */
  units: string;
  /** Relative timeframe change event handler */
  onChange: (timeframe: string) => void;
  /** Label value */
  label: string;
  /** Units placeholder */
  unitsPlaceholder: string;
  /** Disable autofocus */
  disableAutoFocus?: boolean;
};

const TimePeriod: FC<Props> = ({
  relativity,
  value,
  units,
  label,
  unitsPlaceholder,
  disableAutoFocus = false,
  onChange,
}) => {
  const [isUnitsOpen, setUnitsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const changeValueHandler = useCallback(
    (eventValue) => {
      if (eventValue) {
        const updatedValue = parseInt(eventValue);
        onChange(`${relativity}_${updatedValue}_${units}`);
      }
      setInputValue(eventValue);
    },
    [onChange]
  );

  const unitsOptions = useMemo(
    () =>
      Object.values(TIME_UNITS).map((unit) => ({
        label: unit,
        value: unit,
      })),
    []
  );

  const [selectionIndex, setIndex] = useState<number>(null);

  useEffect(() => {
    if (isUnitsOpen) {
      const index = unitsOptions.findIndex((u) => units === u.value);
      setIndex(index);
    }
    return () => {
      setIndex(null);
    };
  }, [isUnitsOpen]);

  const keyboardHandler = useCallback(
    (_e: KeyboardEvent, keyCode: number) => {
      switch (keyCode) {
        case KEYBOARD_KEYS.ENTER:
          const { value: updatedUnits } = unitsOptions[selectionIndex];
          onChange(`${relativity}_${value}_${updatedUnits}`);
          setUnitsOpen(false);
          break;
        case KEYBOARD_KEYS.UP:
          if (selectionIndex > 0) {
            setIndex(selectionIndex - 1);
          }
          break;
        case KEYBOARD_KEYS.DOWN:
          if (selectionIndex === null) {
            setIndex(0);
          } else if (selectionIndex < unitsOptions.length - 1) {
            setIndex(selectionIndex + 1);
          }
          break;
        case KEYBOARD_KEYS.ESCAPE:
          setUnitsOpen(false);
          break;
      }
    },
    [selectionIndex, unitsOptions]
  );

  useKeypress({
    keyboardAction: keyboardHandler,
    handledKeys: [
      KEYBOARD_KEYS.ENTER,
      KEYBOARD_KEYS.ESCAPE,
      KEYBOARD_KEYS.UP,
      KEYBOARD_KEYS.DOWN,
    ],
    addEventListenerCondition: isUnitsOpen,
    eventListenerDependencies: [selectionIndex, unitsOptions, isUnitsOpen],
  });

  return (
    <Container>
      <TimeLabel>{label}</TimeLabel>
      <TimeValue>
        <Input
          variant="solid"
          data-testid="relative-time-input"
          autoFocus={!disableAutoFocus}
          type="number"
          value={inputValue}
          hasError={!inputValue}
          min={1}
          onChange={(e) => changeValueHandler(e.target.value)}
        />
      </TimeValue>
      <UnitsContainer>
        <DropableContainer
          variant="secondary"
          placeholder={unitsPlaceholder}
          onClick={() => !isUnitsOpen && setUnitsOpen(true)}
          isActive={isUnitsOpen}
          value={units}
          dropIndicator
          onDefocus={() => {
            setUnitsOpen(false);
          }}
        >
          {units}
        </DropableContainer>
        <Dropdown isOpen={isUnitsOpen}>
          <DropdownListContainer scrollToActive>
            {(activeItemRef) => (
              <DropdownList
                ref={activeItemRef}
                items={unitsOptions}
                setActiveItem={({ value }) =>
                  typeof selectionIndex === 'number' &&
                  unitsOptions[selectionIndex].value === value
                }
                onClick={(_e, { value: updatedUnits }) => {
                  onChange(`${relativity}_${value}_${updatedUnits}`);
                }}
              />
            )}
          </DropdownListContainer>
        </Dropdown>
      </UnitsContainer>
    </Container>
  );
};

export default TimePeriod;
