import React, { FC, useContext, useState } from 'react';
import { Loader } from '@keen.io/ui-core';

import { CDNContext } from '../../context';

type Props = {
  /** Resource name */
  name: string;
  /**  Source path */
  src?: string;
  /** Description */
  alt?: string;
  /** Resource initial height */
  initialHeight?: number;
  /** Show loader when resource is loading */
  useLoader?: boolean;
};

export const Image: FC<Props> = ({
  name,
  src,
  alt,
  initialHeight = 22,
  useLoader,
}) => {
  const { url } = useContext(CDNContext);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl = src ? src : `${url}/${name}`;

  return (
    <>
      {useLoader && !imageLoaded && (
        <Loader width={initialHeight} height={initialHeight} />
      )}
      <img src={imageUrl} alt={alt} onLoad={() => setImageLoaded(true)} />
    </>
  );
};

export default Image;
