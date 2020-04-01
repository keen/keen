import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sticky, StyledHeaderCeil, Container } from './table.styles';
import SortArrows from './sort-arrows.component';
import { ArrowsType, SortByType } from '../../types';

type Props = {
  children?: string;
  format?: (children: string) => void;
  onClick?: (res: { property: string; sort: ArrowsType }) => void;
  onResize?: (res: { property: string; width: number }) => void;
  sorting?: SortByType;
  dragged?: boolean;
  setDragged?: (dragged: boolean) => void;
};

export const HeaderCeil = ({
  children,
  onClick,
  sorting,
  format,
  dragged,
  setDragged,
  onResize,
}: Props) => {
  const [state, setState] = useState({
    showArrows: false,
    type: null,
    resize: 0,
    width: 0,
    dragLine: false,
  });
  const { showArrows, type, resize, width, dragLine } = state;
  const ref = useRef(null);
  useEffect(() => {
    setState({ ...state, width: ref.current.clientWidth });
  }, [ref.current]);
  const isSorting = sorting && sorting.property === children;
  return (
    <>
      <Sticky className="sticky">
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
            onClick({ property: children, sort: type ? type : 'asc' });
            type === 'desc'
              ? setState({ ...state, type: 'asc' })
              : setState({ ...state, type: 'desc' });
          }}
        >
          <Container>
            {format ? format(children) : children}
            <div
              style={{ opacity: (showArrows && !dragged) || isSorting ? 1 : 0 }}
            >
              <SortArrows type={type} />
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
            onResize({ property: children, width: width + resize });
            setDragged(false);
          }}
          className="drag"
          style={{
            position: 'absolute',
            top: 0,
            right: resize - 7,
            height: '100%',
            cursor: 'ew-resize',
            boxSizing: 'border-box',
          }}
        >
          {dragLine && <div className="dragLine" />}
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
