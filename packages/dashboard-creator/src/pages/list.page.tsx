import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { createDashboard } from '../actions';
import { getDashboardsMeta } from '../selectors';

import { ROUTES } from '../constants';

import { DashboardMetaData } from '../types';

export const Page: FC<{}> = () => {
  const dispatch = useDispatch();
  const dashboards: DashboardMetaData[] = useSelector(getDashboardsMeta);

  return (
    <>
      <button onClick={() => dispatch(createDashboard())}>
        Create Dashboard
      </button>
      <ul>
        {dashboards.map(({ id }) => (
          <li key={id}>
            <Link to={`${ROUTES.DASHBOARD}/${id}`}>{id}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Page;
