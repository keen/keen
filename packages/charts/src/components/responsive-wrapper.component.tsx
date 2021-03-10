import React, { useState } from 'react';
import Measure from 'react-measure';

type Props = {
  children: (width: number, height: number) => React.ReactNode;
  mountTreshold?: number;
};

const ResponsiveWrapper = ({ children, mountTreshold = 2 }: Props) => {
  const [resizeCount, setResizeCount] = useState(0);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const { width, height } = dimensions;
  const showContent = resizeCount >= mountTreshold && height > 0 && width > 0;

  return (
    <Measure
      bounds
      onResize={({ bounds }) => {
        if (resizeCount <= 2) {
          setResizeCount(resizeCount + 1);
        }
        setDimensions({
          height: bounds.height,
          width: bounds.width,
        });
      }}
    >
      {({ measureRef }) => (
        <div
          ref={measureRef}
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            minHeight: 0,
            minWidth: 0,
            position: 'relative',
          }}
        >
          {showContent && children(width, height)}
        </div>
      )}
    </Measure>
  );
};

export default ResponsiveWrapper;
