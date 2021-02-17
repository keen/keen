import React from 'react';

const PropertiesTreeContext = React.createContext<{ modalContainer: string }>({
  modalContainer: '',
});

export default PropertiesTreeContext;
