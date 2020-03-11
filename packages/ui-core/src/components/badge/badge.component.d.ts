import React, { FC } from 'react';
import { BadgeType } from './badge.styles';
declare type Props = {
  children: React.ReactNode;
  type: BadgeType;
};
export declare const Badge: FC<Props>;
export default Badge;
