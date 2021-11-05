import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const GlobalStyle = createGlobalStyle`
body {
  .react-calendar {
    width: 300px;
    border: none;
  }

  .react-calendar,
  .react-calendar button {
    font-family: 'Lato', sans-serif;
  }

  button.react-calendar__month-view__days__day {
    color: #484848;
    font-size: 14px;
  }

  button.react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.3;
  }

  button.react-calendar__month-view__days__day--weekend {
    color: ${colors.red[500]};
  }

  .react-calendar__tile--now,
  .react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus,
  .react-calendar__navigation__label:enabled:hover, .react-calendar__navigation__label:enabled:focus,
  .react-calendar__navigation button:enabled:hover, .react-calendar__navigation button:enabled:focus,
  .react-calendar__navigation button[disabled] {
    background: ${transparentize(0.8, colors.green[100])};
    color: ${colors.green[100]};
  }

  button.react-calendar__tile--active,
  button.react-calendar__tile--active:enabled:hover,
  button.react-calendar__tile--hasActive.react-calendar__year-view__months__month,
  button.react-calendar__tile--hasActive.react-calendar__year-view__months__month:enabled:hover,
  button.react-calendar__tile--hasActive.react-calendar__year-view__months__month:enabled:focus,
  button.react-calendar__tile--hasActive.react-calendar__decade-view__years__year,
  button.react-calendar__tile--hasActive.react-calendar__decade-view__years__year:enabled:hover,
  button.react-calendar__tile--hasActive.react-calendar__decade-view__years__year:enabled:focus {
    background: ${colors.blue[500]};
    color: ${colors.white[500]};
  }

  .react-calendar__month-view__weekdays {
    color: #757575;
    font-size: 0.6875rem;
    font-weight: 400;
    text-transform: none;

    abbr {
      text-decoration: none;
    }
  }

  .react-calendar__navigation__label__labelText {
    font-size: 1.125rem;
    color: #484848;
  }

  button.react-calendar__navigation__arrow:enabled:hover,
  button.react-calendar__navigation__arrow:enabled:focus {
    background: none;
  }

}
`;

export const IconContainer = styled(motion.div)`
  padding: 2px;
`;

export const CalendarContainer = styled.div`
  padding: 10px;
  background: ${colors.white[500]};
`;
