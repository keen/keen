import React from 'react';
import styled from 'styled-components';
import { color } from '@storybook/addon-knobs';
import { data } from './table.fixtures';
import { action } from '@storybook/addon-actions';

import TableChart from './table-chart.component';

import { theme } from '../../theme';
import { PaginatedTable } from '@keen.io/ui-core';

export default {
  title: 'Visualizations /Table Chart / Plot',
  parameters: {
    component: TableChart,
  },
};

const Container = styled.div`
  width: 700px;
  height: 500px;
`;

export const Plot = () => {
  return (
    <Container>
      <TableChart
        data={data}
        theme={{
          ...theme,
          table: {
            ...theme.table,
            mainColor: color('Main color', '#27566d', 'Chart'),
          },
        }}
        onResize={action('onResize')}
      />
    </Container>
  );
};

export const NotPaginated = () => {
  const generateData = () => {
    const data = [];
    for (let i = 0; i < 1000; i++) {
      data.push({
        referrer: 'google/ads' + i,
        price: 0.5 + i,
        province: 'Liaoning' + i,
        city: 'Shenyang' + i,
        country: 'China' + i,
        platform2: i,
        platform:
          'https://staging-static.keen.io/dashboard-creator/a@5#$5daa87sd87676621glkjasd0!@3sad9234as!slkjad@34Sdf0@#4,dsa' +
          i,
        referrer2: 'google/ads' + i,
        price2: 0.5 + i,
        province2: 'Liaoning' + i,
        city2: 'Shenyang' + i,
        country2: 'China' + i,
        platform3: i,
        referrer3: 'google/ads' + i,
        price3: 0.5 + i,
        province3: 'Liaoning' + i,
        city3: 'Shenyang' + i,
        country3: 'China' + i,
        platform4: i,
        referrer4: 'google/ads' + i,
        price4: 0.5 + i,
        province4: 'Liaoning' + i,
        city4: 'Shenyang' + i,
        country4: 'China' + i,
        platform5: i,
        referrer5: 'google/ads' + i,
        price5: 0.5 + i,
        province5: 'Liaoning' + i,
        city5: 'Shenyang' + i,
        country5: 'China' + i,
        platform6: i,
        referrer6: 'google/ads' + i,
        price6: 0.5 + i,
        province6: 'Liaoning' + i,
        city6: 'Shenyang' + i,
        country6: 'China' + i,
        platform7: i,
        referrer7: 'google/ads' + i,
        price7: 0.5 + i,
        province7: 'Liaoning' + i,
        city7: 'Shenyang' + i,
        country7: 'China' + i,
        platform8: i,
        referrer8: 'google/ads' + i,
        price8: 0.5 + i,
        province8: 'Liaoning' + i,
        city8: 'Shenyang' + i,
        country8: 'China' + i,
        a_platform:
          'https://staging-static.keen.io/dashboard-creator/a@5#$5daa87sd87676621glkjasd0!@3sad9234as!slkjad@34Sdf0@#4,dsa' +
          i,
        a_referrer: 'google/ads' + i,
        a_price: 0.5 + i,
        a_province: 'Liaoning' + i,
        a_city: 'Shenyang' + i,
        a_country: 'China' + i,
        a_platform2: i,
        a_referrer2: 'google/ads' + i,
        a_price2: 0.5 + i,
        a_province2: 'Liaoning' + i,
        a_city2: 'Shenyang' + i,
        a_country2: 'China' + i,
        a_platform3: i,
        a_referrer3: 'google/ads' + i,
        a_price3: 0.5 + i,
        a_province3: 'Liaoning' + i,
        a_city3: 'Shenyang' + i,
        a_country3: 'China' + i,
        a_platform4: i,
        a_referrer4: 'google/ads' + i,
        a_price4: 0.5 + i,
        a_province4: 'Liaoning' + i,
        a_city4: 'Shenyang' + i,
        a_country4: 'China' + i,
        a_platform5: i,
        a_referrer5: 'google/ads' + i,
        a_price5: 0.5 + i,
        a_province5: 'Liaoning' + i,
        a_city5: 'Shenyang' + i,
        a_country5: 'China' + i,
        a_platform6: i,
        a_referrer6: 'google/ads' + i,
        a_price6: 0.5 + i,
        a_province6: 'Liaoning' + i,
        a_city6: 'Shenyang' + i,
        a_country6: 'China' + i,
        a_platform7: i,
        a_referrer7: 'google/ads' + i,
        a_price7: 0.5 + i,
        a_province7: 'Liaoning' + i,
        a_city7: 'Shenyang' + i,
        a_country7: 'China' + i,
        a_platform8: i,
        a_referrer8: 'google/ads' + i,
        a_price8: 0.5 + i,
        a_province8: 'Liaoning' + i,
        a_city8: 'Shenyang' + i,
        a_country8: 'China' + i,
        a_referrer9: 'google/ads' + i,
        a_price9: 0.5 + i,
        a_province9: 'Liaoning' + i,
        a_city9: 'Shenyang' + i,
        a_country9: 'China' + i,
      });
    }
    return data;
  };

  const generatedData = generateData();

  return (
    <Container>
      <TableChart
        data={generatedData}
        theme={{
          ...theme,
          table: {
            ...theme.table,
            mainColor: color('Main color', '#27566d', 'Chart'),
          },
        }}
        onResize={action('onResize')}
      />
    </Container>
  );
};

export const Paginated = () => {
  const generateData = () => {
    const data = [];
    for (let i = 0; i < 1000; i++) {
      data.push({
        referrer: 'google/ads' + i,
        price: 0.5 + i,
        province: 'Liaoning' + i,
        city: 'Shenyang' + i,
        country: 'China' + i,
        platform2: i,
        platform:
          'https://staging-static.keen.io/dashboard-creator/a@5#$5daa87sd87676621glkjasd0!@3sad9234as!slkjad@34Sdf0@#4,dsa' +
          i,
        referrer2: 'google/ads' + i,
        price2: 0.5 + i,
        province2: 'Liaoning' + i,
        city2: 'Shenyang' + i,
        country2: 'China' + i,
        platform3: i,
        referrer3: 'google/ads' + i,
        price3: 0.5 + i,
        province3: 'Liaoning' + i,
        city3: 'Shenyang' + i,
        country3: 'China' + i,
        platform4: i,
        referrer4: 'google/ads' + i,
        price4: 0.5 + i,
        province4: 'Liaoning' + i,
        city4: 'Shenyang' + i,
        country4: 'China' + i,
        platform5: i,
        referrer5: 'google/ads' + i,
        price5: 0.5 + i,
        province5: 'Liaoning' + i,
        city5: 'Shenyang' + i,
        country5: 'China' + i,
        platform6: i,
        referrer6: 'google/ads' + i,
        price6: 0.5 + i,
        province6: 'Liaoning' + i,
        city6: 'Shenyang' + i,
        country6: 'China' + i,
        platform7: i,
        referrer7: 'google/ads' + i,
        price7: 0.5 + i,
        province7: 'Liaoning' + i,
        city7: 'Shenyang' + i,
        country7: 'China' + i,
        platform8: i,
        referrer8: 'google/ads' + i,
        price8: 0.5 + i,
        province8: 'Liaoning' + i,
        city8: 'Shenyang' + i,
        country8: 'China' + i,
        a_platform:
          'https://staging-static.keen.io/dashboard-creator/a@5#$5daa87sd87676621glkjasd0!@3sad9234as!slkjad@34Sdf0@#4,dsa' +
          i,
        a_referrer: 'google/ads' + i,
        a_price: 0.5 + i,
        a_province: 'Liaoning' + i,
        a_city: 'Shenyang' + i,
        a_country: 'China' + i,
        a_platform2: i,
        a_referrer2: 'google/ads' + i,
        a_price2: 0.5 + i,
        a_province2: 'Liaoning' + i,
        a_city2: 'Shenyang' + i,
        a_country2: 'China' + i,
        a_platform3: i,
        a_referrer3: 'google/ads' + i,
        a_price3: 0.5 + i,
        a_province3: 'Liaoning' + i,
        a_city3: 'Shenyang' + i,
        a_country3: 'China' + i,
        a_platform4: i,
        a_referrer4: 'google/ads' + i,
        a_price4: 0.5 + i,
        a_province4: 'Liaoning' + i,
        a_city4: 'Shenyang' + i,
        a_country4: 'China' + i,
        a_platform5: i,
        a_referrer5: 'google/ads' + i,
        a_price5: 0.5 + i,
        a_province5: 'Liaoning' + i,
        a_city5: 'Shenyang' + i,
        a_country5: 'China' + i,
        a_platform6: i,
        a_referrer6: 'google/ads' + i,
        a_price6: 0.5 + i,
        a_province6: 'Liaoning' + i,
        a_city6: 'Shenyang' + i,
        a_country6: 'China' + i,
        a_platform7: i,
        a_referrer7: 'google/ads' + i,
        a_price7: 0.5 + i,
        a_province7: 'Liaoning' + i,
        a_city7: 'Shenyang' + i,
        a_country7: 'China' + i,
        a_platform8: i,
        a_referrer8: 'google/ads' + i,
        a_price8: 0.5 + i,
        a_province8: 'Liaoning' + i,
        a_city8: 'Shenyang' + i,
        a_country8: 'China' + i,
        a_referrer9: 'google/ads' + i,
        a_price9: 0.5 + i,
        a_province9: 'Liaoning' + i,
        a_city9: 'Shenyang' + i,
        a_country9: 'China' + i,
      });
    }
    return data;
  };

  const generatedData = generateData();

  return (
    <Container>
      <PaginatedTable
        data={generatedData}
        theme={{
          ...theme,
          table: {
            ...theme.table,
            mainColor: color('Main color', '#27566d', 'Chart'),
          },
        }}
      />
    </Container>
  );
};
