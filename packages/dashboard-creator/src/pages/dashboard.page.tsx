/* eslint-disable react-hooks/rules-of-hooks */
import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

import { Grid } from '../components';

import { getDashboardById } from '../actions';
import { getDashboard } from '../selectors';

import { AppState } from '../types';

import { ROUTES } from '../constants';

export const Page: FC<{}> = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const state = useSelector((state: AppState) => getDashboard(state, id));

  useEffect(() => {
    dispatch(getDashboardById(id));
  }, [dispatch, id]);

  return (
    <div>
      {state?.isLoading && <div>Loading...</div>}
      <div>dashboard {id}</div>
      {state?.dashboard && (
        <Grid
          dashboardId={id}
          widgetsId={state.dashboard.widgets}
          isEditable={false}
        />
      )}
      <Link to={`${ROUTES.EDIT_DASHBOARD}/${id}`}>Edit</Link>
    </div>
  );
};

export default Page;
