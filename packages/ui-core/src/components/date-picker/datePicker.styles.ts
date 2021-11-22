import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

export const GlobalStyle = createGlobalStyle`
.react-calendar {
  width: 320px;
  max-width: 100%;
  background: white;
  border: none;
  font-family: 'Lato', sans-serif;
  line-height: 1.125em;
}
.react-calendar--doubleView {
  width: 700px;
}
.react-calendar--doubleView .react-calendar__viewContainer {
  display: flex;
  margin: -0.5em;
}
.react-calendar--doubleView .react-calendar__viewContainer > * {
  width: 50%;
  margin: 0.5em;
}
.react-calendar,
.react-calendar *,
.react-calendar *:before,
.react-calendar *:after {
  box-sizing: border-box;
}
.react-calendar button {
  margin: 0;
  border: 0;
  outline: none;
  font-family: 'Lato', sans-serif;
}
.react-calendar button:enabled:hover {
  cursor: pointer;
}
.react-calendar__navigation {
  display: flex;
  height: auto;
  padding: 10px 20px;
  border-bottom: 1px solid ${colors.white[300]};
  column-gap: 20px;
}
.react-calendar__navigation button {
  background: none;
  padding: 0;
  min-width: 20px;
}
.react-calendar__navigation button:enabled:hover,
.react-calendar__navigation button:enabled:focus-visible {
  background-color: #e6e6e6;
}
.react-calendar__navigation button[disabled] {
  background-color: #f0f0f0;
}
.react-calendar__month-view__weekdays {
  text-align: center;
  color: ${transparentize(0.3, colors.black[500])};
  font-size: 0.75rem;
  font-weight: 400;
  text-transform: none;

  abbr {
    text-decoration: none;

    &[aria-label="Saturday"], &[aria-label="Sunday"] {
      color: ${colors.blue[500]};
    }
  }
}
.react-calendar__month-view__weekdays__weekday {
  padding: 10px 5px;
}
.react-calendar__month-view__weekNumbers .react-calendar__tile {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75em;
  font-weight: bold;
  padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
}
.react-calendar__month-view__days__day.react-calendar__month-view__days__day--weekend {
  color: ${colors.blue[500]};
}
.react-calendar__month-view__days__day--neighboringMonth {
  opacity: 0.3;
}
.react-calendar__year-view .react-calendar__tile,
.react-calendar__decade-view .react-calendar__tile,
.react-calendar__century-view .react-calendar__tile {
  padding: 10px 5px;
  border-radius: 5px;
  font-size: 14px;
  border: 2px solid ${colors.white[500]};
}
.react-calendar__century-view .react-calendar__tile {
  font-size: 13px;
}
.react-calendar__tile {
  max-width: 100%;
  text-align: center;
  padding: 0.75em 0.5em;
  background: none;
}
.react-calendar__tile:disabled {
  background-color: #f0f0f0;
}
.react-calendar__tile:enabled:hover,
.react-calendar__tile:enabled:focus-visible {
  background-color: #e6e6e6;
}
.react-calendar__tile--now {
  background: #ffff76;
}
.react-calendar__tile--now:enabled:hover,
.react-calendar__tile--now:enabled:focus-visible {
  background: #ffffa9;
}
.react-calendar__tile--hasActive {
  background: #76baff;
}
.react-calendar__tile--hasActive:enabled:hover,
.react-calendar__tile--hasActive:enabled:focus-visible {
  background: #a9d4ff;
}
.react-calendar--selectRange .react-calendar__tile--hover {
  background-color: #e6e6e6;
}

.react-calendar__month-view__days__day abbr {
  font-size: 14px;
  border-radius: 50%;
  width: 37px;
  height: 37px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.react-calendar__tile.react-calendar__month-view__days__day {
  padding: 0;
}

.react-calendar__month-view {
  padding: 10px 20px 20px 20px;
}

.react-calendar__tile--now,
.react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus-visible,
.react-calendar__navigation__label:enabled:hover, .react-calendar__navigation__label:enabled:focus-visible,
.react-calendar__navigation button:enabled:hover, .react-calendar__navigation button:enabled:focus-visible,
.react-calendar__navigation button[disabled] {
  background: ${transparentize(0.9, colors.blue[500])};
}

button.react-calendar__tile--active abbr,
button.react-calendar__tile--active:enabled:hover abbr,
button.react-calendar__tile--active:enabled:focus-visible abbr
button.react-calendar__tile--active.react-calendar__month-view__days__day--weekend abbr,
button.react-calendar__tile--active.react-calendar__month-view__days__day--weekend:enabled:hover abbr,
button.react-calendar__tile--active.react-calendar__month-view__days__day--weekend:enabled:focus-visible abbr,
.react-calendar__tile.react-calendar__tile--active.react-calendar__month-view__days__day:hover abbr,
.react-calendar__tile.react-calendar__tile--active.react-calendar__month-view__days__day:focus-visible abbr,
.react-calendar__tile--hasActive,
.react-calendar__tile--hasActive:enabled:hover,
.react-calendar__tile--hasActive:enabled:focus-visible,
button.react-calendar__tile--hasActive.react-calendar__year-view__months__month,
button.react-calendar__tile--hasActive.react-calendar__year-view__months__month:enabled:hover,
button.react-calendar__tile--hasActive.react-calendar__year-view__months__month:enabled:focus-visible,
button.react-calendar__tile--hasActive.react-calendar__decade-view__years__year,
button.react-calendar__tile--hasActive.react-calendar__decade-view__years__year:enabled:hover,
button.react-calendar__tile--hasActive.react-calendar__decade-view__years__year:enabled:focus-visible {
  background: ${colors.blue[500]};
  color: ${colors.white[500]};
}

button.react-calendar__tile--hasActive.react-calendar__year-view__months__month,
button.react-calendar__tile--hasActive.react-calendar__year-view__months__month:enabled:hover,
button.react-calendar__tile--hasActive.react-calendar__year-view__months__month:enabled:focus-visible,
button.react-calendar__tile--hasActive.react-calendar__decade-view__years__year,
button.react-calendar__tile--hasActive.react-calendar__decade-view__years__year:enabled:hover,
button.react-calendar__tile--hasActive.react-calendar__decade-view__years__year:enabled:focus-visible {
  border: 2px solid ${colors.white[500]};
}

.react-calendar__navigation__label__labelText {
  font-size: 1rem;
  color: ${colors.blue[500]};
}

button.react-calendar__navigation__arrow:enabled:hover,
button.react-calendar__navigation__arrow:enabled:focus-visible {
  background: none;
}

button.react-calendar__navigation__arrow:enabled:focus-visible {
  outline: 1px solid ${transparentize(0.5, colors.blue[500])};
}

button.react-calendar__navigation__label {
  padding: 10px;
  border-radius: 4px;
  transition: background-color 250ms ease-in-out;
}

.react-calendar__year-view__months,
.react-calendar__decade-view__years,
.react-calendar__century-view__decades {
  padding: 20px;
}

.react-calendar__viewContainer {
  min-height: 205px;
}

.react-calendar__tile.react-calendar__month-view__days__day:hover,
.react-calendar__tile.react-calendar__month-view__days__day:focus-visible {
    background: none;

    abbr {
      background: ${transparentize(0.9, colors.blue[500])};
    }
  }

.react-calendar__tile--now.react-calendar__month-view__days__day {
  background: none;
  abbr {
    border: 1px solid ${transparentize(0.5, colors.blue[500])};
  }

  &:hover,
  &:focus-visible {
    abbr {
      background: ${transparentize(0.9, colors.blue[500])};
    }
  }
}

.react-calendar__tile--now.react-calendar__year-view__months__month:not(.react-calendar__tile--hasActive),
.react-calendar__tile--now.react-calendar__century-view__decades__decade:not(.react-calendar__tile--hasActive), 
.react-calendar__tile--now.react-calendar__decade-view__years__year:not(.react-calendar__tile--hasActive) {
  background: none;
  outline: 1px solid ${transparentize(0.5, colors.blue[500])};
  outline-offset: -2px;

  &:hover,
  &:focus-visible {
    background: ${transparentize(0.9, colors.blue[500])};
  }
}

.react-calendar__tile--now.react-calendar__tile--active {
  abbr {
    background: ${colors.blue[500]};
  }
}
`;

export const IconContainer = styled(motion.div)`
  padding: 2px;
`;

export const CalendarContainer = styled.div`
  background: ${colors.white[500]};
`;

export const Container = styled.div`
  display: flex;
  column-gap: 5px;
`;

export const TimePickerContainer = styled.div`
  background: ${colors.white[500]};
  display: flex;
`;

export const TimePickerList = styled.div`
  flex: 1;
`;

export const PickerInput = styled.div`
  max-width: 180px;
`;
