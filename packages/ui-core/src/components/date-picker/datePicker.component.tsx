import React, { FC, useRef, useState } from 'react';
import Calendar, { OnChangeDateCallback } from 'react-calendar';
import { transparentize } from 'polished';
import { Icon } from '@keen.io/icons';
import { colors } from '@keen.io/colors';

import DropableContainer from '../dropable-container';
import Dropdown from '../dropdown';
import {
  GlobalStyle,
  IconContainer,
  CalendarContainer,
} from './datePicker.styles';

import { getEventPath } from './utils';

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

  return (
    <>
      <GlobalStyle />
      <DropableContainer
        variant="primary"
        placeholder="dd/mm/YYYY"
        onClick={() => !isOpen && setOpen(true)}
        isActive={isOpen}
        value={value.toLocaleDateString('en-GB')}
        onDefocus={(event: any) => {
          const path = getEventPath(event);
          if (!path?.includes(calendarRef.current)) {
            setOpen(false);
          }
        }}
      >
        {value.toLocaleDateString('en-GB')}
      </DropableContainer>
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
    </>
  );
};

export default ReactCalendar;
