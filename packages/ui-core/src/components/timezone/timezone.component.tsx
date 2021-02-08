import React, { FC, useMemo, useState } from 'react';
import { Timezones } from '@keen.io/query';

import Title from '../title';
import DropdownList from '../dropdown-list';
import DropdownListContainer from '../dropdown-list-container';
import DropableContainer from '../dropable-container';
import Dropdown from '../dropdown';

import { Container, SelectContainer } from './timezone.styles';

import { TIMEZONES } from './constants';

type Props = {
  /** Timezone value */
  timezone?: Timezones;
  /** Timezone label */
  timezoneLabel: string;
  /** Timezone placeholder label */
  timezonePlaceholderLabel: string;
  /** Change event handler */
  onChange: (timezone: Timezones) => void;
};

const Timezone: FC<Props> = ({
  timezone,
  timezoneLabel,
  timezonePlaceholderLabel,
  onChange,
}) => {
  const [isOpen, setOpen] = useState(false);
  const options = useMemo(
    () =>
      TIMEZONES.map(({ name }) => ({
        label: name,
        value: name,
      })),
    []
  );

  return (
    <Container data-testid="timezone">
      <Title onClick={() => setOpen(true)}>{timezoneLabel}</Title>
      <SelectContainer>
        <DropableContainer
          variant="secondary"
          dropIndicator
          onClick={() => !isOpen && setOpen(true)}
          placeholder={timezonePlaceholderLabel}
          isActive={isOpen}
          value={timezone}
          onDefocus={() => {
            setOpen(false);
          }}
        >
          {timezone}
        </DropableContainer>
        <Dropdown isOpen={isOpen}>
          <DropdownListContainer scrollToActive>
            {(activeItemRef) => (
              <DropdownList
                ref={activeItemRef}
                items={options}
                setActiveItem={({ value }) => value === timezone}
                onClick={(_e, { value }) => {
                  onChange(value);
                }}
              />
            )}
          </DropdownListContainer>
        </Dropdown>
      </SelectContainer>
    </Container>
  );
};

export default Timezone;
