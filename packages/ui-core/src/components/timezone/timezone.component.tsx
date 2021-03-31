import React, {
  FC,
  useState,
  useRef,
  useEffect,
  useMemo,
  useLayoutEffect,
} from 'react';
import { AnimatePresence } from 'framer-motion';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';

import Title from '../title';
import DropableContainer from '../dropable-container';
import EmptySearch from '../empty-search';

import { FixedList, TextEllipsis, NoWrap } from './components';

import {
  Container,
  SelectContainer,
  CustomDropdown,
  DropableContent,
} from './timezone.styles';

import { Options, DropdownPosition } from './types';
import { dropdownMotion } from './motion';

type Props = {
  /** Timezones collection */
  timezones: { name: string; utcOffset: string }[];
  /** Timezone value */
  timezone?: string;
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
  disableSelection = false,
  timezoneLabel,
  timezonePlaceholderLabel,
  emptySearchLabel,
  onChange,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>(
    'bottom'
  );

  const listRef = useRef(null);
  const customDropdownRef = useRef(null);

  const availableTimezones = () => {
    if (searchPhrase !== '') {
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

  useLayoutEffect(() => {
    if (!customDropdownRef.current) return;

    const { bottom } = customDropdownRef.current.getBoundingClientRect();
    const position: DropdownPosition =
      bottom > document.body.offsetHeight ? 'top' : 'bottom';
    setDropdownPosition(position);
  }, [isOpen]);

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
        name: timezone,
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
              <TextEllipsis>{name}</TextEllipsis>
              {utcOffset && (
                <NoWrap>
                  <BodyText
                    variant="body3"
                    fontWeight={400}
                    color={colors.blue[200]}
                  >
                    {utcOffset}
                  </BodyText>
                </NoWrap>
              )}
            </DropableContent>
          )}
        </DropableContainer>
        <AnimatePresence>
          {isOpen && (
            <CustomDropdown
              ref={customDropdownRef}
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
                <EmptySearch message={emptySearchLabel} />
              )}
            </CustomDropdown>
          )}
        </AnimatePresence>
      </SelectContainer>
    </Container>
  );
};

export default Timezone;
