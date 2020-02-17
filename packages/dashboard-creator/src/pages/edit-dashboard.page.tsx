/* eslint-disable react-hooks/rules-of-hooks */
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { Toolbar, Grid, GridElementsPosition } from '../components';

import {
  getDashboardById,
  deleteDashboard,
  saveDashboard,
  updateWidgetsPosition,
  addWidget,
} from '../actions';
import { getDashboard } from '../selectors';
import { generateId, transformWidgetsPosition } from '../utils';

import { AppState, GridPosition } from '../types';

export const Page: FC<{}> = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const state = useSelector((state: AppState) => getDashboard(state, id));

  useEffect(() => {
    dispatch(getDashboardById(id));
  }, [dispatch, id]);

  return (
    <>
      <div>Edit {id}</div>
      <button onClick={() => dispatch(deleteDashboard(id))}>Delete</button>
      <button onClick={() => dispatch(saveDashboard(id))}>Save</button>
      {state?.isLoading && <div>Loading</div>}
      <Toolbar />
      {state?.dashboard && (
        <Grid
          dashboardId={id}
          widgetsId={state.dashboard.widgets}
          onWidgetDrag={(elements: GridElementsPosition) => {
            const widgets = transformWidgetsPosition(elements);
            dispatch(updateWidgetsPosition(widgets));
          }}
          onWidgetResize={(elements: GridElementsPosition) => {
            const widgets = transformWidgetsPosition(elements);
            dispatch(updateWidgetsPosition(widgets));
          }}
          onWidgetDrop={(element: GridPosition & { e: Event }) =>
            dispatch(addWidget(id, `widget/${generateId()}`, element))
          }
          isEditable={true}
        />
      )}
    </>
  );
};

export default Page;
