import { Margins } from '../../../types';

export const createMargins = ({ top, bottom, left, right }: Margins) => ({
  marginTop: `${top}px`,
  marginBottom: `${bottom}px`,
  marginLeft: `${left}px`,
  marginRight: `${right}px`,
});
