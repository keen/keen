import React, { FC, useContext } from 'react';

import { CDNContext } from '../../context';

type Props = {
  /** Resource name */
  name: string;
  /** Description */
  alt?: string;
};

export const Image: FC<Props> = ({ name, alt }) => {
  const { url } = useContext(CDNContext);
  console.log('dd', `${url}/${name}`);

  return <img src={`${url}/${name}`} alt={alt} />;
};

export default Image;
