import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import Calendar, { OnChangeDateCallback } from 'react-calendar';
import { transparentize } from 'polished';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import Dropdown from '../dropdown';
import Input from '../input';
import { getEventPath } from './utils';
import {
  GlobalStyle,
  IconContainer,
  CalendarContainer,
  Container,
} from './datePicker.styles';

type Props = {
  /** Change event handler */
  onChange: OnChangeDateCallback;
  /** Date */
  value: Date;
  /** Unique identifer */
  id: string;
};

const ReactCalendar: FC<Props> = ({ value, id, onChange }) => {
  const [isOpen, setOpen] = useState(false);
  const calendarRef = useRef(null);

  const outsideClick = useCallback(
    (event) => {
      const path = getEventPath(event);
      if (isOpen && !path?.includes(calendarRef.current)) {
        setOpen(false);
      }
    },
    [isOpen, calendarRef]
  );

  useEffect(() => {
    document.addEventListener('click', outsideClick);
    return () => document.removeEventListener('click', outsideClick);
  }, [isOpen, calendarRef]);

  return (
    <Container>
      <GlobalStyle />
      <Input
        type="text"
        variant="solid"
        value={value.toLocaleDateString('en-GB')}
        onClick={() => !isOpen && setOpen(true)}
        onBlur={(e) => console.log(e)}
      />
      <Dropdown isOpen={isOpen} fullWidth={false}>
        <CalendarContainer ref={calendarRef}>
          <Calendar
            onChange={(
              value: Date,
              event: React.ChangeEvent<HTMLInputElement>
            ) => {
              setOpen(false);
              onChange(value, event);
            }}
            value={value}
            data-testid={id}
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
    </Container>
  );
};

export default ReactCalendar;
