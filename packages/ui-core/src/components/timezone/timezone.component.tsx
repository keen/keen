import React, { FC, useState, useRef, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';

import Title from '../title';
import DropableContainer from '../dropable-container';

import { FixedList } from './components';

import {
  Container,
  SelectContainer,
  Offset,
  Name,
  CustomDropdown,
  DropableContent,
} from './timezone.styles';

import { Timezone as TimezoneItem, DropdownPosition, Options } from './types';
import { dropdownMotion } from './motion';

type Props = {
  /** Timezones */
  timezones: TimezoneItem[];
  /** Timezone value */
  timezone?: string;
  /** Dropdown position */
  dropdownPosition?: DropdownPosition;
  /** Disable selection */
  disableSelection?: boolean;
  /** Timezone label */
  timezoneLabel: string;
  /** Timezone placeholder label */
  timezonePlaceholderLabel: string;
  /** Empty search label */
  emptySearchLabel: string;
  /** Change event handler */
  onChange: (timezone: string) => void;
};

const Timezone: FC<Props> = ({
  timezone,
  timezones,
  dropdownPosition = 'bottom',
  disableSelection = false,
  timezoneLabel,
  timezonePlaceholderLabel,
  emptySearchLabel,
  onChange,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');
  const listRef = useRef(null);

  const availableTimezones = () => {
    if (searchPhrase !== '') {
      console.log(searchPhrase);
      return timezones.filter(({ name, utcOffset }) =>
        `${name}${utcOffset}`.toLowerCase().includes(searchPhrase.toLowerCase())
      );
    }
    return timezones;
  };

  const availableTimezonesLength = availableTimezones().length;

  useEffect(() => {
    if (!timezone) return;
    setSearchPhrase('');
    const index = timezones.findIndex((tz) => tz.name === timezone);

    if (index && listRef?.current) listRef.current.scrollToItem(index, 'smart');
  }, [timezone, isOpen]);

  useEffect(() => {
    if (isOpen && disableSelection) setOpen(false);
  }, [disableSelection]);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchPhrase(e.target.value);

  const { name, utcOffset } = useMemo(() => {
    if (timezones.length === 0) {
      return {
        name: timezone,
        utcOffset: null,
      };
    }

    const selectedTimezone = timezones.find((tz) => tz.name === timezone);
    if (!selectedTimezone) {
      return {
        name: '',
        utcOffset: null,
      };
    }
    const { name, utcOffset } = selectedTimezone;
    return {
      name,
      utcOffset,
    };
  }, [timezone, timezones]);

  const options: Options = {
    timezones: availableTimezones(),
    timezone: {
      name,
      utcOffset,
    },
    onChange,
  };

  return (
    <Container isDisabled={disableSelection} data-testid="timezone">
      <Title onClick={() => (disableSelection ? null : setOpen(true))}>
        {timezoneLabel}
      </Title>
      <SelectContainer>
        <DropableContainer
          variant="secondary"
          dropIndicator
          searchable
          onClick={() => !isOpen && !disableSelection && setOpen(true)}
          placeholder={timezonePlaceholderLabel}
          isActive={isOpen}
          value={timezone}
          onSearch={searchHandler}
          onDefocus={() => {
            setOpen(false);
          }}
        >
          {timezone && (
            <DropableContent>
              <Name>{name}</Name>
              {utcOffset && <Offset>{utcOffset}</Offset>}
            </DropableContent>
          )}
        </DropableContainer>
        <AnimatePresence>
          {isOpen && (
            <CustomDropdown
              position={dropdownPosition}
              {...dropdownMotion[dropdownPosition]}
            >
              {availableTimezonesLength ? (
                <FixedList
                  ref={listRef}
                  itemData={options}
                  itemCount={availableTimezonesLength}
                />
              ) : (
                <div>{emptySearchLabel}</div>
              )}
            </CustomDropdown>
          )}
        </AnimatePresence>
      </SelectContainer>
    </Container>
  );
};

export default Timezone;
