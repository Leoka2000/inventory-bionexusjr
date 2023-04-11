import { useState, useContext, Suspense} from 'react';
import './employees.css';
import {BsPersonCircle} from 'react-icons/bs'
import { EmployeeContext, EmployeeContextType } from '../../contexts/employee';
import Axios from 'axios';
import { BeatLoader } from 'react-spinners';
import Content from './content';
import {BiShow} from 'react-icons/bi'
import {BiMessageAltAdd} from 'react-icons/bi'



const Employees = () => {
  const [filterType, setFilterType] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
 

  const {
    setName,
    setAge,
    setCountry,
    setPosition,
    setWage,
    addEmployee,
 age,
  wage,
    employeeList,
    setEmployeeList, } = useContext<EmployeeContextType>(EmployeeContext);

  
    const getEmployees = () => {
      setLoading(true);
      setTimeout(() => {
        Axios.get('https://bionexusjr.herokuapp.com/employees')
          .then((response) => {
            setEmployeeList(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }, 1000);
    };

    const handleFilter = (type: string) => {
      setFilterType(type);
    }

    

  return (

    <section className='employee-section'>

      <div className='employee-information'>
      <div className='icons-wrapper'><span><BsPersonCircle/></span> <p>EMPLOYEES</p></div>
        <div className='employee-form-row'>
          <fieldset>
            <label>Name</label>
            <input onChange={(event) => { setName(event.target.value) }} type='text'></input>
          </fieldset>
          <fieldset>
            <label>Age</label>
            <input onChange={(event) => { setAge(event.target.value) }} type='text'></input>
            {isNaN(age) && <span className='error-message'>Age should be a number</span>}
          </fieldset>
        </div>
        <div className='employee-form-row'>
          <fieldset>
            <label>Country</label>
            <input onChange={(event) => { setCountry(event.target.value) }} type='text'></input>
          </fieldset>
          <fieldset>
            <label>Position</label>
            <input onChange={(event) => { setPosition(event.target.value) }} type='text'></input>
          </fieldset>
        </div>
        <div className='button-wrapper'>
        <button onClick={addEmployee}> <BiMessageAltAdd/><p>ADD</p> </button>
          <button onClick={getEmployees}><BiShow/><p>SHOW ALL</p></button>
        </div>
      </div>

      <select className='dropdown' onChange={(e) => handleFilter(e.target.value)}>
  <option className='dropdown-content' value="">Filter by position</option>
  <option className='dropdown-content' value="President">President</option>
  <option className='dropdown-content' value="Vice President">Vice President</option>
  <option className='dropdown-content' value="Chief Marketing Officer">Chief Marketing Officer</option>
  <option className='dropdown-content' value="Chief Human Development Officer">Chief Human Development Officer</option>
  <option className='dropdown-content' value="Chief Research Officer">Chief Research Officer</option>
  <option className='dropdown-content' value="Chief Financial Officer">Chief Financial Officer / Chief Commercial Officer</option>
  <option className='dropdown-content' value="Chief Commercial Officer">Chief Commercial Officer</option>
  </select>

  <Suspense fallback={<BeatLoader />}> 
  {loading ? (
          <BeatLoader color='grey' size={30} />
        ) : (
      <main>
         {employeeList.filter((val) => filterType === '' || val.position === filterType).map((val, key) => {

return <Content data={val} keyNumber={key} id={val.id} />
        })} 
      </main> 

      )}

      </Suspense>
    </section>

  );
}

export default Employees;
