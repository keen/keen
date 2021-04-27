import { useState, useEffect, useRef, MutableRefObject } from 'react';
import { GeoProjection } from 'd3-geo';
import { drag } from 'd3-drag';
import { zoom } from 'd3-zoom';
import { select, mouse, event } from 'd3-selection';

import { calculateEulerAngles } from '@keen.io/charts-utils';

import { ProjectionState } from './types';

type DragBehaviour = 'rotate' | 'translate';

export const useZoom = (
  element: MutableRefObject<any>,
  setProjectionState: any,
  initialScale: number
) => {
  const frameRequest = useRef(null);
  const [zoomDirection, setZoomDirection] = useState<
    'zoom-in' | 'zoom-out' | null
  >(null);

  useEffect(() => {
    const handlers = zoom()
      .scaleExtent([1, 8])
      .on('zoom', () => {
        const zoom = event.transform;
        if (event.sourceEvent?.wheelDelta) {
          const zoomDirection =
            event.sourceEvent.wheelDelta > 0 ? 'zoom-in' : 'zoom-out';
          setZoomDirection(zoomDirection);
        }
        if (frameRequest.current) cancelAnimationFrame(frameRequest.current);
        frameRequest.current = requestAnimationFrame(() => {
          setProjectionState((state: ProjectionState) => ({
            ...state,
            scale: initialScale * zoom.k,
          }));
        });
      })
      .on('end', () => {
        setZoomDirection(null);
      });

    select(element.current).call(handlers);

    return () => {
      if (handlers) handlers.on('zoom', null);
    };
  }, [element.current]);

  return {
    zoomDirection,
  };
};

export const useDragHandlers = (
  element: MutableRefObject<any>,
  projection: GeoProjection,
  setProjectionState: any,
  dragBehaviour: DragBehaviour = 'rotate'
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
        if (dragBehaviour === 'translate') {
          const { dx, dy } = event;
          if (frameRequest.current) {
            cancelAnimationFrame(frameRequest.current);
          }
          frameRequest.current = requestAnimationFrame(() => {
            setProjectionState((state: ProjectionState) => ({
              ...state,
              translation: [
                state.translation[0] + dx,
                state.translation[1] + dy,
              ],
            }));
          });
        }

        if (dragBehaviour === 'rotate') {
          const dragCurrentPosition = projection.invert(mouse(element.current));

          const eulerAngles = calculateEulerAngles(
            dragStartPosition.current,
            dragCurrentPosition,
            projection.rotate()
          );

          if (eulerAngles) {
            if (frameRequest.current)
              cancelAnimationFrame(frameRequest.current);
            frameRequest.current = requestAnimationFrame(() => {
              setProjectionState((state: ProjectionState) => ({
                ...state,
                rotation: eulerAngles,
              }));
            });
          }
        }
      });

    select(element.current).call(handlers);

    return () => {
      const detachElement = select(element.current);
      if (detachElement) detachElement.on('mousedown.drag', null);
    };
  }, [element.current]);

  return {
    dragged,
  };
};
