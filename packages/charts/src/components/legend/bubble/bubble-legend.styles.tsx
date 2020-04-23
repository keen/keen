import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`;

export const LegendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  max-height: 100%;
  width: 90px;
  box-sizing: border-box;
`;

export const TitleWrapper = styled.div`
  max-width: 100%;
  margin-bottom: 15px;
`;

export const Title = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
