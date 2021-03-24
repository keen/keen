import React, { FC, useState, useRef, useEffect } from 'react';
import { Timezones } from '@keen.io/query';
import { FixedSizeList as ReactWindowList } from 'react-window';
import moment from 'moment-timezone';

import Title from '../title';
// import DropdownList from '../dropdown-list';
// import DropdownListContainer from '../dropdown-list-container';
import DropableContainer from '../dropable-container';
import Dropdown from '../dropdown';

import { Container, SelectContainer, ListItem } from './timezone.styles';

// import { TIMEZONES } from './constants';

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

const Row = ({ data, index, style }) => {
  // console.log(data);
  const { timezones, timezone, onChange } = data;
  const tz = timezones[index];
  return (
    <div style={style} role="listitem">
      <ListItem isActive={tz === timezone} onClick={() => onChange(tz)}>
        {tz}
      </ListItem>
    </div>
  );
};

const Timezone: FC<Props> = ({
  timezone = 'Asia/Seoul',
  timezoneLabel,
  timezonePlaceholderLabel,
  onChange,
}) => {
  const [isOpen, setOpen] = useState(false);
  const listRef = useRef(null);
  // const options = useMemo(
  //   () =>
  //     TIMEZONES.map(({ name }) => ({
  //       label: name,
  //       value: name,
  //     })),
  //   []
  // );

  // const timezones = moment.tz.names();
  const timeZonesOptions = {
    timezones: moment.tz.names(),
    timezone,
    onChange,
  };

  useEffect(() => {
    const index = timeZonesOptions.timezones.findIndex((tz) => tz === timezone);
    console.log({ index });

    if (index && listRef?.current) listRef.current.scrollToItem(index, 'smart');
  }, [timezone, isOpen]);

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
          <ReactWindowList
            ref={listRef}
            height={150}
            data-testid="scroll-wrapper2"
            itemData={timeZonesOptions}
            itemCount={timeZonesOptions.timezones.length}
            itemSize={35}
            width="100%"
          >
            {Row}
          </ReactWindowList>
          {/* <DropdownListContainer scrollToActive>
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
          </DropdownListContainer> */}
        </Dropdown>
      </SelectContainer>
    </Container>
  );
};

export default Timezone;
