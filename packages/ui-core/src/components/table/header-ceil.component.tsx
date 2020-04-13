import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sticky, StyledHeaderCeil, Container, DragLine } from './table.styles';
import SortArrows from './sort-arrows.component';
import { SortMode, SortByType, CeilType } from '../../types';
import { RESIZE_ELEMENT_WIDTH } from './constants';

type Props = {
  value?: CeilType;
  property: string;
  onClick?: (res: { property: string; sort: SortMode }) => void;
  onResize?: (res: { property: string; width: number }) => void;
  sorting?: SortByType;
  dragged?: boolean;
  setDragged?: (dragged: boolean) => void;
};

export const HeaderCeil = ({
  value,
  property,
  onClick,
  sorting,
  dragged,
  setDragged,
  onResize,
}: Props) => {
  const [state, setState] = useState({
    showArrows: false,
    sortMode: null,
    resize: 0,
    width: 0,
    dragLine: false,
  });
  const { showArrows, sortMode, resize, width, dragLine } = state;
  const ref = useRef(null);
  useEffect(() => {
    setState({ ...state, width: ref.current.clientWidth });
  }, [ref.current]);
  const isSorting = sorting && sorting.property === property;
  return (
    <>
      <Sticky>
        <StyledHeaderCeil
          ref={ref}
          width={width + resize}
          onMouseEnter={() => {
            setState({
              ...state,
              showArrows: true,
            });
          }}
          onMouseLeave={() => {
            setState({
              ...state,
              showArrows: false,
            });
          }}
          onClick={() => {
            onClick({ property, sort: sortMode ? sortMode : 'ascending' });
            sortMode === 'descending'
              ? setState({ ...state, sortMode: 'ascending' })
              : setState({ ...state, sortMode: 'descending' });
          }}
        >
          <Container>
            {value}
            <div
              style={{ opacity: (showArrows && !dragged) || isSorting ? 1 : 0 }}
            >
              <SortArrows sortMode={sortMode} />
            </div>
          </Container>
        </StyledHeaderCeil>
        <motion.div
          drag="x"
          dragElastic={0}
          dragMomentum={false}
          dragConstraints={{
            left: 0,
          }}
          onMouseEnter={() => {
            setState({
              ...state,
              dragLine: true,
            });
          }}
          onMouseLeave={() => {
            setState({
              ...state,
              dragLine: false,
            });
          }}
          onDrag={(e, info) => {
            setState({
              ...state,
              dragLine: true,
              resize: info.point.x,
            });
            setDragged(true);
          }}
          onDragEnd={() => {
            setState({
              ...state,
              dragLine: false,
            });
            onResize({ property, width: width + resize });
            setDragged(false);
          }}
          style={{
            position: 'absolute',
            top: 0,
            right: resize - RESIZE_ELEMENT_WIDTH / 2,
            height: '100%',
            cursor: 'ew-resize',
            boxSizing: 'border-box',
            width: RESIZE_ELEMENT_WIDTH,
            background: 'inherit',
          }}
        >
          {dragLine && <DragLine />}
        </motion.div>
      </Sticky>
      <div
        style={{
          display: 'table-cell',
        }}
      ></div>
    </>
  );
};

export default HeaderCeil;
