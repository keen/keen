import { useState, useEffect, useRef, MutableRefObject } from 'react';
import { GeoProjection } from 'd3-geo';
import { drag } from 'd3-drag';
import { select, mouse } from 'd3-selection';

import { calculateEulerAngles } from '../../utils/math.utils';

import { ProjectionState } from './types';

export const useDragHandlers = (
  element: MutableRefObject<any>,
  projection: GeoProjection,
  setProjectionState: any
) => {
  const [dragged, setDragged] = useState(null);

  const dragStartPosition = useRef(null);
  const frameRequest = useRef(null);

  useEffect(() => {
    const handlers = drag()
      .on('start', () => {
        dragStartPosition.current = projection.invert(mouse(element.current));
        setDragged(true);
      })
      .on('end', () => setDragged(false))
      .on('drag', () => {
        {
          const dragCurrentPosition = projection.invert(mouse(element.current));

          const eulerAngles = calculateEulerAngles(
            dragStartPosition.current,
            dragCurrentPosition,
            projection.rotate()
          );

          if (eulerAngles) {
            if (frameRequest.current)
              window.cancelAnimationFrame(frameRequest.current);
            frameRequest.current = window.requestAnimationFrame(() => {
              setProjectionState((state: ProjectionState) => ({
                ...state,
                rotation: eulerAngles,
              }));
            });
          }
        }
      });

    select(element.current).call(handlers);
  }, [element.current]);

  return {
    dragged,
  };
};
