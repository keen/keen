import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { BillingSummary, List, ListTitle, ListItem } from './components';
import { getCurrentPlan } from './selectors';
import { getCalculatorState } from '../calculator';

import { Container, Heading, Title } from './recommendation.styles';

import { plansConfig } from '../plans-config';

import { calculateCost } from '../utils';

const Recommendation: FC<{}> = () => {
  const planId = useSelector(getCurrentPlan);
  const { queries, events, services } = useSelector(getCalculatorState);
  const { basePrice } = plansConfig[planId];

  const { servicesCost, overageCost } = calculateCost({
    planId,
    queries,
    events,
    s3Streaming: services.s3Streaming,
  });

  const planName = plansConfig[planId].title;

  return (
    <Container>
      <Heading>Our recommendation</Heading>
      <Title>{planName}</Title>
      <BillingSummary
        planName={planName}
        basePrice={basePrice}
        overageEventsPrice={overageCost.events}
        overageQueriesPrice={overageCost.queries}
        s3ServicePrice={servicesCost.s3}
      />
      <List type="secondary">
        <ListTitle>What’s included?</ListTitle>
        {plansConfig[planId].components.map(component => (
          <ListItem key={component}>{component}</ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Recommendation;
