import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/main/index'
import Employees from './pages/employees/index'
import Consumables from './pages/consumables/index'
import Equipments from './pages/equipments/index'

// import Equipments from './pages/equipments/index'
import Navbar  from './components/navbar';


function RootRoutes() {
  return (
    <>
    
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='employees/' element={<Employees />} />
          <Route path='consumables/' element={<Consumables />} />
          
          <Route path='equipments/' element={<Equipments/>} />
       
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RootRoutes;
