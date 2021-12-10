import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Calendar, { OnChangeDateCallback } from 'react-calendar';
import dayjs from 'dayjs';
import { transparentize } from 'polished';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import Dropdown from '../dropdown';
import Input from '../input';
import DropdownListContainer from '../dropdown-list-container';
import DropdownList from '../dropdown-list';
import {
  getEventPath,
  getTimeOptions,
  validateDate,
  validateTime,
} from './utils';
import {
  GlobalStyle,
  IconContainer,
  CalendarContainer,
  Container,
  TimePickerContainer,
  TimePickerList,
  PickerInput,
} from './date-picker.styles';
import { DATE_FORMAT, TIME_FORMAT } from './constants';

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
  const [inputTime, setInputTime] = useState('');
  const [inputDate, setInputDate] = useState('');

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

  useEffect(() => {
    const inputTime = dayjs(date).format(TIME_FORMAT);
    const inputDate = dayjs(date).format(DATE_FORMAT);

    setInputTime(inputTime);
    setInputDate(inputDate);
  }, [date]);

  return (
    <Container>
      <GlobalStyle />
      <PickerInput>
        <Input
          type="text"
          variant="solid"
          placeholder={DATE_FORMAT}
          pattern="\d{4}-\d{2}-\d{2}"
          maxLength={10}
          autoComplete="off"
          value={inputDate}
          hasError={!validateDate(inputDate)}
          onBlur={() =>
            !validateDate(inputTime) &&
            setInputDate(dayjs(date).format(DATE_FORMAT))
          }
          onInput={() => {
            !isDatePickerOpen && setDatePickerOpen(true);
            isTimePickerOpen && setTimePickerOpen(false);
          }}
          onKeyDown={(e) =>
            isDatePickerOpen &&
            (e.key === 'Enter' || e.key === 'Escape') &&
            setDatePickerOpen(false)
          }
          onClick={() => !isDatePickerOpen && setDatePickerOpen(true)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const { value } = e.currentTarget;
            let formattedValue = value.replace(/\D/g, '');

            const arr = Array.from(formattedValue);
            if (arr.length > 4) arr.splice(4, 0, '-');
            if (arr.length > 7) arr.splice(7, 0, '-');
            formattedValue = arr.toString().replace(/,/g, '');
            setInputDate(formattedValue);

            if (validateDate(formattedValue)) {
              const updatedDate = dayjs(formattedValue)
                .hour(hour)
                .minute(minute)
                .toDate();
              onChange(updatedDate, e);
            }
          }}
        />
        <Dropdown isOpen={isDatePickerOpen} fullWidth={false}>
          <CalendarContainer ref={datePickerRef} data-testid={id}>
            <Calendar
              locale="en-EN"
              onChange={(date: Date, event: ChangeEvent<HTMLInputElement>) => {
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
          variant="solid"
          placeholder={TIME_FORMAT}
          pattern="\d{2}:\d{2}"
          maxLength={5}
          hasError={!validateTime(inputTime)}
          autoComplete="off"
          value={inputTime}
          onBlur={() =>
            !validateTime(inputTime) && setInputTime(`${hour}:${minute}`)
          }
          onInput={() => {
            !isTimePickerOpen && setTimePickerOpen(true);
            isDatePickerOpen && setDatePickerOpen(false);
          }}
          onKeyDown={(e) =>
            isTimePickerOpen &&
            (e.key === 'Enter' || e.key === 'Escape') &&
            setTimePickerOpen(false)
          }
          onClick={() => !isTimePickerOpen && setTimePickerOpen(true)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const { value } = e.currentTarget;
            let formattedValue = value.replace(/\D/g, '');

            const arr = Array.from(formattedValue);
            if (arr.length > 2) arr.splice(2, 0, ':');
            formattedValue = arr.toString().replace(/,/g, '');
            setInputTime(formattedValue);

            if (validateTime(formattedValue)) {
              const [hour, minute] = formattedValue.split(':');
              const updatedDate = dayjs(date)
                .hour(+hour)
                .minute(+minute)
                .toDate();
              onChange(updatedDate, e);
            }
          }}
        />
        <Dropdown isOpen={isTimePickerOpen}>
          <TimePickerContainer ref={timePickerRef}>
            <TimePickerList>
              <DropdownListContainer scrollToActive>
                {(activeItemRef) => (
                  <DropdownList
                    ref={activeItemRef}
                    debounce={500}
                    items={hoursOptions}
                    setActiveItem={({ value }) => hour === +value}
                    onClick={(_e, { value: hour }) => {
                      const updatedDate = dayjs(date)
                        .hour(+hour)
                        .toDate();
                      onChange(
                        updatedDate,
                        {} as ChangeEvent<HTMLInputElement>
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
                    debounce={1000}
                    items={minutesOptions}
                    setActiveItem={({ value }) => minute === +value}
                    onClick={(_e, { value: minute }) => {
                      const updatedDate = dayjs(date)
                        .minute(+minute)
                        .toDate();
                      onChange(
                        updatedDate,
                        {} as ChangeEvent<HTMLInputElement>
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
