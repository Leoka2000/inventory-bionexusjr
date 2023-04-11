import React, { useContext, useState, Suspense } from 'react'
import { FaTools } from 'react-icons/fa'
import './equipments.css'
import Axios from 'axios';
import { BeatLoader } from 'react-spinners';
import Content from './content';
import { EquipmentContext, ContextProps } from '../../contexts/equipments';
import '../employees/employees.css'
import { BiShow } from 'react-icons/bi'
import { BiMessageAltAdd } from 'react-icons/bi'



const Equipments = () => {
  const [filterType, setFilterType] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);


  const {
    setName,
    setType,
    setManufacturer,
    setSerial,
    setPrice,
    setExpiration,
    setMaintenanceSchedule,
    setEquipmentList,
    setStatus,
    setNotes,
    equipmentList,
    addEquipment,
    setQuantity, } = useContext<ContextProps>(EquipmentContext);


  const getEquipment = () => {
    setLoading(true);
    setTimeout(() => {
      Axios.get('https://bionexusjr.herokuapp.com/equipments')
        .then((response) => {
          setEquipmentList(response.data);
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
    <section className='equipments-section'>
      <div className='equipments-information'>
        <div className='icons-wrapper'><span><FaTools /></span> <p>EQUIPMENTS</p></div>
        <div className='equipments-form-row'>
          <fieldset>
            <label>Name</label>
            <input onChange={(event) => { setName(event.target.value) }} type='text'></input>
          </fieldset>
          <fieldset>
            <label>Type</label>
            <input onChange={(event) => { setType(event.target.value) }} type='text'></input>
          </fieldset>
        </div>
        <div className='equipments-form-row'>
          <fieldset>
            <label>Manufacturer</label>
            <input onChange={(event) => { setManufacturer(event.target.value) }} type='text'></input>
          </fieldset>
          <fieldset>
            <label>Serial</label>
            <input onChange={(event) => { setSerial(event.target.value) }} type='text'></input>
          </fieldset>
        </div>
        <div className='equipments-form-row'>
          <fieldset>
            <label>Price</label>
            <input onChange={(event) => { setPrice(event.target.value) }} type='text'></input>
          </fieldset>
          <fieldset>
            <label>Expiration</label>
            <input onChange={(event) => { setExpiration(event.target.value) }} type='text'></input>
          </fieldset>
        </div>
        <div className='equipments-form-row'>
          <fieldset>
            <label>Maintenance schedule</label>
            <input onChange={(event) => { setMaintenanceSchedule(event.target.value) }} type='text'></input>
          </fieldset>

          <fieldset>
            <label>Quantity</label>
            <input onChange={(event) => { setQuantity(event.target.value) }} type='text'></input>
          </fieldset>
        </div>
        <div className='equipments-form-row'>
          <fieldset>
            <label>Status</label>
            <select onChange={(event) => { setStatus(event.target.value) }}>
              <option value="">Status?</option>
              <option value="In maintenance">In maintenance</option>
              <option value="In use">In use</option>
            </select>
          </fieldset>
        </div>
        <div className='equipments-form-row'>
          <fieldset>
            <label>Notes</label>
            <input onChange={(event) => { setNotes(event.target.value) }} type='text'></input>
          </fieldset>
        </div>
        <div className='button-wrapper'>
          <button onClick={addEquipment}> <BiMessageAltAdd /><p>ADD</p> </button>
          <button onClick={getEquipment}><BiShow /><p>SHOW ALL</p></button>
        </div>
      </div>
      <select className='dropdown' onChange={(e) => handleFilter(e.target.value)}>
        <option className='dropdown-content' value="">Filter by status</option>
        <option className='dropdown-content' value="In use">In use</option>
        <option className='dropdown-content' value="In maintenance">In maintenance</option>
      </select>

      <Suspense fallback={<BeatLoader />}>
        {loading ? (
          <BeatLoader size={30} color='grey' />
        ) : (

          <main>
            {equipmentList.filter((val) => filterType === '' || val.status === filterType).map((val, key) => {
              return <Content data={val} keyNumber={key} id={val.id} />
            })}
          </main>
        )}</Suspense>

    </section>
  )
}

export default Equipments
