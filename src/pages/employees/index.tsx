import * as React from 'react';
import Employees from './employees';
import { EmployeeProvider } from '../../contexts/employee';

 function Index () {
  return (
    <>
     <EmployeeProvider >
      <Employees/>
      </EmployeeProvider>
    </>
  );
}

export default Index