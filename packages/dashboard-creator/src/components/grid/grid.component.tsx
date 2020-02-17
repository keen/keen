import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { WidthProvider, Responsive } from 'react-grid-layout';

import { WidgetContainer } from '../../containers';
import { getWidgetsPosition } from '../../selectors';

import { AppState, GridPosition } from '../../types';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export type ElementsPosition = (GridPosition & { i: string })[];

type Props = {
  isEditable: boolean;
  widgetsId: string[];
  dashboardId: string;
  onWidgetResize?: (elements: ElementsPosition) => void;
  onWidgetDrag?: (elements: ElementsPosition) => void;
  onWidgetDrop?: (elements: any) => void;
};

const Grid: FC<Props> = ({
  widgetsId,
  dashboardId,
  isEditable,
  onWidgetDrop,
  onWidgetDrag,
  onWidgetResize,
}) => {
  const widgets = useSelector((state: AppState) =>
    getWidgetsPosition(state, widgetsId)
  );
  const gridProps = {
    isDraggable: isEditable,
    isResizable: isEditable,
    isDroppable: isEditable,
  };

  return (
    <ResponsiveReactGridLayout
      {...gridProps}
      onDragStop={onWidgetDrag}
      onResizeStop={onWidgetResize}
      onDrop={onWidgetDrop}
    >
      {widgets.map(({ id, position }) => (
        <div key={id} data-grid={{ ...position, i: id, static: false }}>
          <WidgetContainer id={id} dashboardId={dashboardId} />
        </div>
      ))}
    </ResponsiveReactGridLayout>
  );
};

export default Grid;
