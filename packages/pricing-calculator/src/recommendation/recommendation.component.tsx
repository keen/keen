import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@keen.io/ui-core';

import { BillingSummary, List, ListTitle, ListItem } from './components';
import { getCurrentPlan } from './selectors';
import { getCalculatorState } from '../calculator';

import {
  Container,
  PlanComponents,
  ActionsContainer,
  Heading,
  Anchor,
  Title,
} from './recommendation.styles';

import { plansConfig } from '../plans.config';

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

  const { ctaLabel, ctaUrl, detailsUrl, title: planName } = plansConfig[planId];

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
      <PlanComponents>
        <List type="secondary">
          <ListTitle>What’s included?</ListTitle>
          {plansConfig[planId].components.map(component => (
            <ListItem key={component}>{component}</ListItem>
          ))}
        </List>
      </PlanComponents>
      <ActionsContainer>
        <Button href={ctaUrl}>{ctaLabel}</Button>
      </ActionsContainer>
      <Anchor href={detailsUrl}>Plan details »</Anchor>
    </Container>
  );
};

export default Recommendation;
