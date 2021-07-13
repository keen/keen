import React, {
  FC,
  useRef,
  useState,
  useCallback,
  useReducer,
  useEffect,
  useMemo,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Rail from './rail';
import Mark from './mark';
import OffRange from './off-range';
import Control from './control';

import { sliderActions } from './slider.actions';
import { sliderReducer, initialState } from './slider.reducer';

import { sliderControlSettings, tooltipTypography } from './slider.settings';

import TooltipPosition, { tooltipMotion } from './tooltip-position.component';
import { arrowReverse } from './utils';

import Tooltip from '../tooltip';
import { Text } from '../../typography';

import { ControlSettings, TooltipSettings, RailSettings } from './types';
import { Layout } from '../../types';
import { generateContinuousColorScale } from '@keen.io/charts-utils';

const initialDragControlsState = {
  minimum: {
    active: false,
    moving: false,
    position: 0,
  },
  maximum: {
    active: false,
    moving: false,
    position: 0,
  },
};

type Props = {
  /** Minimum range value */
  minimum: number;
  /** Maximum range value */
  maximum: number;
  /** Colors applied to rail container  */
  colors: string[];
  /** Change range event handler  */
  onChange?: (minimum: number, maximum: number) => void;
  /** Slider layout  */
  layout?: Layout;
  /** Drag controls settings  */
  controlSettings?: ControlSettings;
  /** Tooltip settings  */
  tooltipSettings?: TooltipSettings;
  /** Rail settings  */
  railSettings?: RailSettings;
  /** Number of colors steps */
  colorSteps?: number;
};

export const RangeSlider: FC<Props> = ({
  layout = 'horizontal',
  controlSettings = sliderControlSettings,
  colors,
  onChange,
  colorSteps = 2,
  tooltipSettings = {
    enabled: true,
    position: 'bottom',
    typography: undefined,
    theme: 'dark',
  },
  railSettings = { size: 4, borderRadius: 3 },
  minimum,
  maximum,
}) => {
  const slider = useRef(null);
  const isHorizontal = layout === 'horizontal';
  const dragDirection = isHorizontal ? 'x' : 'y';

  const [tooltip, setTooltip] = useState<{
    visible: 'minimum' | 'maximum' | null;
    x: number;
    y: number;
  }>({ visible: null, x: 0, y: 0 });

  const showTooltip = useCallback(
    (dragTooltip: 'minimum' | 'maximum') => {
      if (tooltipSettings.enabled) {
        setTooltip((state) => ({
          ...state,
          visible: dragTooltip,
        }));
      }
    },
    [tooltipSettings.enabled]
  );

  const hideTooltip = useCallback(() => {
    if (tooltipSettings.enabled) {
      setTooltip((state) => ({
        ...state,
        visible: null,
      }));
    }
  }, [tooltipSettings.enabled]);

  const [{ value, dimension, dragControls }, dispatch] = useReducer(
    sliderReducer,
    {
      ...initialState,
      dragControls: initialDragControlsState,
      value: [minimum, maximum],
    }
  );

  const calculateControlValue = useCallback(
    (position: number) => {
      if (!dimension) return maximum;
      const percent = (position / dimension) * 100;
      return Math.round((maximum - minimum) * (percent / 100)) + minimum;
    },
    [dimension, minimum, maximum]
  );

  useEffect(() => {
    const { width, height } = slider.current.getBoundingClientRect();
    const sliderDimension = isHorizontal ? width : height;
    dispatch(sliderActions.setControlPosition('maximum', sliderDimension));
    dispatch(sliderActions.setDimension(sliderDimension));
  }, [slider.current, isHorizontal]);

  const layoutStyle = isHorizontal
    ? {
        width: '100%',
        height: `${controlSettings.size}px`,
      }
    : {
        width: `${controlSettings.size}px`,
        height: '100%',
      };

  const [currentMinimum, currentMaximum] = value as number[];
  const colorScale = useMemo(
    () => generateContinuousColorScale(minimum, maximum, colorSteps, colors),
    [minimum, maximum, colorSteps, colors]
  );
  const colorScaleRange = colorScale.range();
  const absoluteMinimum = Math.abs(minimum);
  const zeroPoint: number =
    (absoluteMinimum * 100) / (absoluteMinimum + maximum);

  return (
    <div ref={slider} style={{ position: 'relative', ...layoutStyle }}>
      <Rail
        type={layout}
        size={railSettings.size}
        borderRadius={railSettings.borderRadius}
        colors={colorScaleRange}
        colorSteps={colorSteps}
        zeroPoint={zeroPoint}
      />
      {dimension !== null && (
        <>
          <OffRange
            borderRadius={railSettings.borderRadius}
            styles={
              isHorizontal
                ? {
                    width: `${dragControls.minimum.position}px`,
                    height: `${railSettings.size}px`,
                    left: 0,
                    position: 'absolute',
                    top: '50%',
                    transform: `translateY(-50%)`,
                  }
                : {
                    width: `${railSettings.size}px`,
                    height: `${dragControls.minimum.position}px`,
                    top: 0,
                    position: 'absolute',
                    left: '50%',
                    transform: `translateX(-50%)`,
                  }
            }
          />
          <OffRange
            borderRadius={railSettings.borderRadius}
            styles={
              isHorizontal
                ? {
                    width: `calc(100% - ${dragControls.maximum.position}px)`,
                    height: `${railSettings.size}px`,
                    left: `${dragControls.maximum.position}px`,
                    position: 'absolute',
                    top: '50%',
                    transform: `translateY(-50%)`,
                  }
                : {
                    width: `${railSettings.size}px`,
                    height: `calc(100% - ${dragControls.maximum.position}px)`,
                    top: `${dragControls.maximum.position}px`,
                    position: 'absolute',
                    left: '50%',
                    transform: `translateX(-50%)`,
                  }
            }
          />
          <Control
            onDragStart={() => {
              dispatch(sliderActions.setControlDrag('minimum', true));
              showTooltip('minimum');
            }}
            onDragEnd={() => {
              dispatch(sliderActions.setControlDrag('minimum', false));
              if (!dragControls.minimum.active) hideTooltip();
            }}
            onDrag={(_event, dragInfo) => {
              const {
                point: { x, y },
              } = dragInfo;
              const position = isHorizontal ? x : y;

              const minimumValue = calculateControlValue(position);
              const [, maximumValue] = value as number[];

              dispatch(sliderActions.setValue([minimumValue, maximumValue]));
              dispatch(sliderActions.setControlPosition('minimum', position));

              onChange && onChange(minimumValue, maximumValue);
              if (tooltipSettings.enabled) {
                setTooltip((state) =>
                  isHorizontal ? { ...state, y: 0, x } : { ...state, x: 0, y }
                );
              }
            }}
            dragDirection={dragDirection}
            dragConstraints={
              isHorizontal
                ? {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: dragControls.maximum.position,
                  }
                : {
                    top: 0,
                    bottom: dragControls.maximum.position,
                    left: 0,
                    right: 0,
                  }
            }
            controlStyles={{ zIndex: 2 }}
          >
            <>
              <Mark
                {...controlSettings}
                onMouseEnter={() => {
                  dispatch(sliderActions.setControlState('minimum', true));
                  showTooltip('minimum');
                }}
                onMouseLeave={() => {
                  dispatch(sliderActions.setControlState('minimum', false));
                  if (!dragControls.minimum.moving) hideTooltip();
                }}
              />
              {tooltipSettings.enabled && (
                <TooltipPosition
                  x={tooltip.x}
                  y={tooltip.y}
                  visible={tooltip.visible === 'minimum'}
                  containerSize={controlSettings.size}
                  position={tooltipSettings.position}
                >
                  <AnimatePresence>
                    {tooltip.visible === 'minimum' && (
                      <motion.div {...tooltipMotion}>
                        <Tooltip
                          arrowDirection={arrowReverse(
                            tooltipSettings.position
                          )}
                          mode={tooltipSettings.theme}
                        >
                          <Text
                            {...(tooltipSettings.typography
                              ? tooltipSettings.typography
                              : tooltipTypography)}
                          >
                            {tooltipSettings.renderText
                              ? tooltipSettings.renderText(
                                  currentMinimum as number
                                )
                              : currentMinimum}
                          </Text>
                        </Tooltip>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </TooltipPosition>
              )}
            </>
          </Control>
          <Control
            onDragStart={() => {
              dispatch(sliderActions.setControlDrag('maximum', true));
              showTooltip('maximum');
            }}
            onDragEnd={() => {
              dispatch(sliderActions.setControlDrag('maximum', false));
              if (!dragControls.minimum.active) hideTooltip();
            }}
            onDrag={(_event, dragInfo) => {
              const {
                point: { x, y },
              } = dragInfo;
              const position = isHorizontal ? x : y;
              const maximumValue = calculateControlValue(position);

              const [minimumValue] = value as number[];

              dispatch(sliderActions.setValue([minimumValue, maximumValue]));
              dispatch(sliderActions.setControlPosition('maximum', position));

              onChange && onChange(minimumValue, maximumValue);
              if (tooltipSettings.enabled) {
                setTooltip((state) =>
                  isHorizontal ? { ...state, y: 0, x } : { ...state, x: 0, y }
                );
              }
            }}
            dragDirection={dragDirection}
            dragConstraints={
              isHorizontal
                ? {
                    top: 0,
                    bottom: 0,
                    left: dragControls.minimum.position,
                    right: dimension,
                  }
                : {
                    top: dragControls.minimum.position,
                    bottom: dimension,
                    left: 0,
                    right: 0,
                  }
            }
            controlStyles={{
              [isHorizontal ? 'x' : 'y']: dimension,
              [isHorizontal ? 'y' : 'x']: 0,
              zIndex: currentMinimum === maximum ? 1 : 3,
            }}
          >
            <>
              <Mark
                {...controlSettings}
                onMouseEnter={() => {
                  dispatch(sliderActions.setControlState('maximum', true));
                  showTooltip('maximum');
                }}
                onMouseLeave={() => {
                  dispatch(sliderActions.setControlState('maximum', false));
                  if (!dragControls.maximum.moving) hideTooltip();
                }}
              />
              {tooltipSettings.enabled && (
                <TooltipPosition
                  x={tooltip.x}
                  y={tooltip.y}
                  visible={tooltip.visible === 'maximum'}
                  containerSize={controlSettings.size}
                  position={tooltipSettings.position}
                >
                  <AnimatePresence>
                    {tooltip.visible === 'maximum' && (
                      <motion.div {...tooltipMotion}>
                        <Tooltip
                          arrowDirection={arrowReverse(
                            tooltipSettings.position
                          )}
                          mode={tooltipSettings.theme}
                        >
                          <Text
                            {...(tooltipSettings.typography
                              ? tooltipSettings.typography
                              : tooltipTypography)}
                          >
                            {tooltipSettings.renderText
                              ? tooltipSettings.renderText(
                                  currentMaximum as number
                                )
                              : currentMaximum}
                          </Text>
                        </Tooltip>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </TooltipPosition>
              )}
            </>
          </Control>
        </>
      )}
    </div>
  );
};

export default RangeSlider;
