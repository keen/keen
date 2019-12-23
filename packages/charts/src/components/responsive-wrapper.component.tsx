import React, { useState } from 'react';
import Measure from 'react-measure';

type Props = {
  children: (width: number, height: number) => React.ReactNode;
};

const ResponsiveWrapper = ({ children }: Props) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const { width, height } = dimensions;

  return (
    <Measure
      bounds
      onResize={({ bounds }) => {
        setDimensions({
          height: bounds.height,
          width: bounds.width,
        });
      }}
    >
      {({ measureRef }) => (
        <div ref={measureRef} style={{ display: 'flex', flexGrow: 1 }}>
          {width > 0 && height > 0 && children(width, height)}
        </div>
      )}
    </Measure>
  );
};

export default ResponsiveWrapper;
