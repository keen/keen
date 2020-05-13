import React from 'react';

const CDNContext = React.createContext<{ url: string }>({
  url: '',
});

export default CDNContext;
