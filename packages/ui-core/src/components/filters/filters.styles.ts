import styled from 'styled-components';
import { colors } from '@keen.io/colors';

export const Container = styled.div`
  position: relative;
`;

export const DropdownContent = styled.div`
  padding: 10px 0;
  width: 200px;
  box-sizing: border-box;
`;

export const FiltersContainer = styled.div`
  max-height: 200px;
  overflow-y: auto;
`;

export const ClearFilters = styled.div`
  padding: 10px 14px;
  border-top: solid 1px ${colors.gray[300]};
  cursor: pointer;
`;

export const EmptySearch = styled.div`
  padding: 10px 14px;
  text-align: center;
`;
