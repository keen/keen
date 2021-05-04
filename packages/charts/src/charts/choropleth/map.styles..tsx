import styled from 'styled-components';

export const MapCursor = styled.g<{
  cursor: 'grab' | 'grabbing' | 'zoom-in' | 'zoom-out';
}>`
  cursor: ${(props) => props.cursor || 'grab'};
  pointer-events: bounding-box;

  g {
    pointer-events: fill;
  }
`;
