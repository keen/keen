import React, { FC } from 'react';
import { Text, Typography, Badge } from '@keen.io/ui-core';

import {
  Container,
  Heading,
  Header,
  TagContainer,
} from './widget-heading.styles';

import { TextSettings, Tag } from '../types';

type Props = {
  title: TextSettings;
  subtitle: TextSettings;
  tags?: Tag[];
};

const Title = ({
  content,
  typography,
}: {
  content: string;
  typography: Typography;
}) => (
  <Heading>
    <Text {...typography}>{content}</Text>
  </Heading>
);

const Tags = ({
  tags,
  marginTop,
  marginLeft,
}: {
  tags: Tag[];
  marginTop: number;
  marginLeft: number;
}) => (
  <TagContainer
    marginTop={marginTop}
    marginLeft={marginLeft}
    data-testid="widget-tags"
  >
    {tags.map(({ label, variant }: Tag) => (
      <Badge key={label} variant={variant}>
        {label}
      </Badge>
    ))}
  </TagContainer>
);

export const WidgetHeading: FC<Props> = ({ title, subtitle, tags }) => (
  <Container data-testid="widget-heading">
    {title?.content && (
      <Header>
        <Title {...title} data-testid="widget-title" />{' '}
        {tags && tags.length > 0 && (
          <Tags tags={tags} marginTop={5} marginLeft={title ? 5 : 0} />
        )}
      </Header>
    )}
    {subtitle?.content && (
      <Header>
        <Title {...subtitle} data-testid="widget-subtitle" />{' '}
        {!title && tags && tags.length > 0 && (
          <Tags tags={tags} marginTop={0} marginLeft={subtitle ? 5 : 0} />
        )}
      </Header>
    )}
    {!title && !subtitle && tags && tags.length > 0 && (
      <Tags tags={tags} marginTop={0} marginLeft={0} />
    )}
  </Container>
);

export default WidgetHeading;
