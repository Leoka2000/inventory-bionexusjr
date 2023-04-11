import React from 'react'
import Equipments from './equipments'
import { EquipmentContextProvider } from '../../contexts/equipments'

const Index = () => {
  return (
    <>
      <EquipmentContextProvider>
      <Equipments/>
      </EquipmentContextProvider>
    </>
  )
}

export default Index