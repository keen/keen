import React, { FC, useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FixedSizeList as ReactWindowList } from 'react-window';

import Title from '../title';
import DropableContainer from '../dropable-container';

import {
  Container,
  SelectContainer,
  ListItem,
  Offset,
  Name,
  CustomDropdown,
  DropableContent,
} from './timezone.styles';

import { Timezone as TimezoneType, DropdownPosition, Options } from './types';
import { dropdownMotion } from './motion';

type Props = {
  /** Timezones */
  timezones: TimezoneType[];
  /** Timezone value */
  timezone?: TimezoneType;
  /** Dropdown position */
  dropdownPosition?: DropdownPosition;
  /** Disable selection */
  disableSelection?: boolean;
  /** Timezone label */
  timezoneLabel: string;
  /** Timezone placeholder label */
  timezonePlaceholderLabel: string;
  /** Change event handler */
  onChange: (timezone: TimezoneType) => void;
};

type RowProps = {
  data: Options;
  index: number;
  style: Record<string, any>;
};

const Row: FC<RowProps> = ({ data, index, style }) => {
  const { timezones, timezone, onChange } = data;
  const tz = timezones[index];
  const { name, utcOffset } = tz;
  return (
    <div style={style} role="listitem">
      <ListItem
        isActive={timezone && name === timezone.name}
        onClick={() => onChange(tz)}
      >
        <Name>{name}</Name>
        <Offset>{utcOffset}</Offset>
      </ListItem>
    </div>
  );
};

const Timezone: FC<Props> = ({
  timezone,
  timezones,
  dropdownPosition = 'bottom',
  disableSelection = false,
  timezoneLabel,
  timezonePlaceholderLabel,
  onChange,
}) => {
  const [isOpen, setOpen] = useState(false);
  const listRef = useRef(null);

  const options: Options = {
    timezones,
    timezone,
    onChange,
  };

  useEffect(() => {
    if (!timezone) return;
    const index = timezones.findIndex((tz) => tz.name === timezone.name);

    if (index && listRef?.current) listRef.current.scrollToItem(index, 'smart');
  }, [timezone, isOpen]);

  useEffect(() => {
    if (isOpen && disableSelection) setOpen(false);
  }, [disableSelection]);

  return (
    <Container isDisabled={disableSelection} data-testid="timezone">
      <Title onClick={() => (disableSelection ? null : setOpen(true))}>
        {timezoneLabel}
      </Title>
      <SelectContainer>
        <DropableContainer
          variant="secondary"
          dropIndicator
          onClick={() => !isOpen && !disableSelection && setOpen(true)}
          placeholder={timezonePlaceholderLabel}
          isActive={isOpen}
          value={timezone}
          onDefocus={() => {
            setOpen(false);
          }}
        >
          {timezone && (
            <DropableContent>
              <Name>{timezone.name}</Name>
              <Offset>{timezone.utcOffset}</Offset>
            </DropableContent>
          )}
        </DropableContainer>
        <AnimatePresence>
          {isOpen && (
            <CustomDropdown
              position={dropdownPosition}
              {...dropdownMotion[dropdownPosition]}
            >
              <ReactWindowList
                ref={listRef}
                height={150}
                data-testid="timezones-list"
                itemData={options}
                itemCount={timezones.length}
                itemSize={30}
                width="100%"
              >
                {Row}
              </ReactWindowList>
            </CustomDropdown>
          )}
        </AnimatePresence>
      </SelectContainer>
    </Container>
  );
};

export default Timezone;
