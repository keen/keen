import React, { FC } from 'react';

import { Container, PositionContainer, Label, Tick } from './ruler.styles';

import { Layout } from '../../types';

type Props = {
  /** Type of layout */
  layout: Layout;
  /** Collection of ruler ticks */
  ticks: { label: string | number; position: string }[];
  /** Label renderer function */
  renderLabel?: (label: string | number, layout: Layout) => JSX.Element;
  /** Click event handler */
  onClick?: (position: string) => void;
};

const defaultRenderer = (label: string | number, layout: Layout) => {
  return <Label type={layout}>{label}</Label>;
};

export const Ruler: FC<Props> = ({
  layout,
  ticks,
  renderLabel = defaultRenderer,
  onClick,
}) => {
  return (
    <Container layout={layout}>
      {ticks.map(({ position, label }, idx) => {
        return (
          <React.Fragment key={`${idx}-${position}`}>
            <Tick type={layout} position={position} />
            <PositionContainer
              type={layout}
              position={position}
              onClick={() => onClick && onClick(position)}
              pointer={!!onClick}
            >
              {renderLabel(label, layout)}
            </PositionContainer>
          </React.Fragment>
        );
      })}
    </Container>
  );
};

export default Ruler;
