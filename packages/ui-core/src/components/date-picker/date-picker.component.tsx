import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import Calendar, { OnChangeDateCallback } from 'react-calendar';
import dayjs from 'dayjs';
import { transparentize } from 'polished';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import Dropdown from '../dropdown';
import Input from '../input';
import DropdownListContainer from '../dropdown-list-container';
import DropdownList from '../dropdown-list';
import { getEventPath, getTimeOptions } from './utils';
import {
  GlobalStyle,
  IconContainer,
  CalendarContainer,
  Container,
  TimePickerContainer,
  TimePickerList,
  PickerInput,
} from './date-picker.styles';

type Props = {
  /** Change event handler */
  onChange: OnChangeDateCallback;
  /** Date */
  date: Date;
  /** Unique identifer */
  id: string;
};

const hoursOptions = getTimeOptions(24);
const minutesOptions = getTimeOptions(60);

const ReactCalendar: FC<Props> = ({ date, id, onChange }) => {
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setTimePickerOpen] = useState(false);
  const datePickerRef = useRef(null);
  const timePickerRef = useRef(null);

  const hour = date.getHours();
  const minute = date.getMinutes();

  const outsideClick = useCallback(
    (event) => {
      const path = getEventPath(event);
      if (isDatePickerOpen && !path?.includes(datePickerRef.current)) {
        setDatePickerOpen(false);
      }
      if (isTimePickerOpen && !path?.includes(timePickerRef.current)) {
        setTimePickerOpen(false);
      }
    },
    [isDatePickerOpen, isTimePickerOpen, datePickerRef, timePickerRef]
  );

  useEffect(() => {
    document.addEventListener('click', outsideClick);
    return () => document.removeEventListener('click', outsideClick);
  }, [
    isDatePickerOpen,
    isTimePickerOpen,
    datePickerRef,
    timePickerRef,
    outsideClick,
  ]);

  return (
    <Container>
      <GlobalStyle />
      <PickerInput>
        <Input
          type="text"
          readOnly
          variant="solid"
          value={dayjs(date).format('YYYY-MM-DD')}
          onClick={() => !isDatePickerOpen && setDatePickerOpen(true)}
        />
        <Dropdown isOpen={isDatePickerOpen} fullWidth={false}>
          <CalendarContainer ref={datePickerRef} data-testid={id}>
            <Calendar
              onChange={(
                date: Date,
                event: React.ChangeEvent<HTMLInputElement>
              ) => {
                const updatedDate = dayjs(date)
                  .hour(hour)
                  .minute(minute)
                  .toDate();
                setDatePickerOpen(false);
                onChange(updatedDate, event);
              }}
              value={date}
              nextLabel={
                <IconContainer whileHover={{ x: 5 }}>
                  <Icon
                    width={19}
                    height={19}
                    type="button-arrow"
                    fill={transparentize(0.3, colors.blue[500])}
                  />
                </IconContainer>
              }
              next2Label={null}
              prevLabel={
                <IconContainer whileHover={{ x: -5 }}>
                  <Icon
                    width={19}
                    height={19}
                    type="button-arrow-left"
                    fill={transparentize(0.3, colors.blue[500])}
                  />
                </IconContainer>
              }
              prev2Label={null}
            />
          </CalendarContainer>
        </Dropdown>
      </PickerInput>
      <PickerInput>
        <Input
          type="text"
          readOnly
          variant="solid"
          onClick={() => !isTimePickerOpen && setTimePickerOpen(true)}
          value={date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        />
        <Dropdown isOpen={isTimePickerOpen}>
          <TimePickerContainer ref={timePickerRef}>
            <TimePickerList>
              <DropdownListContainer scrollToActive>
                {(activeItemRef) => (
                  <DropdownList
                    ref={activeItemRef}
                    items={hoursOptions}
                    setActiveItem={({ value }) => hour === Number(value)}
                    onClick={(_e, { value: hour }) => {
                      const updatedDate = dayjs(date).hour(hour).toDate();
                      onChange(
                        updatedDate,
                        {} as React.ChangeEvent<HTMLInputElement>
                      );
                    }}
                  />
                )}
              </DropdownListContainer>
            </TimePickerList>
            <TimePickerList>
              <DropdownListContainer scrollToActive>
                {(activeItemRef) => (
                  <DropdownList
                    ref={activeItemRef}
                    items={minutesOptions}
                    setActiveItem={({ value }) => minute === Number(value)}
                    onClick={(_e, { value: minute }) => {
                      const updatedDate = dayjs(date).minute(minute).toDate();
                      onChange(
                        updatedDate,
                        {} as React.ChangeEvent<HTMLInputElement>
                      );
                    }}
                  />
                )}
              </DropdownListContainer>
            </TimePickerList>
          </TimePickerContainer>
        </Dropdown>
      </PickerInput>
    </Container>
  );
};

export default ReactCalendar;
