import React from 'react';
import { ConsumablesContextProvider } from '../../contexts/consumables';
import Consumables from './consumables';

const Index = () => {
  return (
    <>
      <ConsumablesContextProvider>
        <Consumables />
      </ConsumablesContextProvider>
    </>
  );
}

export default Index;
