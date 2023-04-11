
import { useState, useContext, useEffect, Suspense } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { BeatLoader } from 'react-spinners';
import { FaToolbox } from 'react-icons/fa';
import { ConsumablesContext, ConsumablesContextType } from '../../contexts/consumables';
import Content from './content';
import '../equipments/equipments.css'
import './consumables.css'
import {BiShow} from 'react-icons/bi'
import {BiMessageAltAdd} from 'react-icons/bi'


const Index = () => {
  const [triggerPopup, setTriggerPopup] = useState<boolean>(false);
  const [lowQuantityItemName, setLowQuantityItemName] = useState<string>('');
  const [lowQuantity, setLowQuantity] = useState<number>(0);
  const [filterType, setFilterType] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const {
    quantity,
    setName,
    setType,
    setManufacturer,
    setLotNumber,
    setExpiration,
    setQuantity,
    setPrice,
    setNotes,
    addConsumable,
    consumablesList,
    setConsumablesList,
  } = useContext<ConsumablesContextType>(ConsumablesContext);

  const getConsumables = () => {
    setLoading(true);
    setTimeout(() => {
      Axios.get('https://bionexusjr.herokuapp.com/consumables')
        .then((response) => {
          setConsumablesList(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, 1000);
  };

  useEffect(() => {
    for (const item of consumablesList) {
      if (item.quantity < 15) {
        setTriggerPopup(true);
        setLowQuantityItemName(item.name);
        setLowQuantity(item.quantity);
        break;
      }
    }
  }, [consumablesList]);

  const showAlert = () => {
    Swal.fire({
      title: `Low Quantity of ${lowQuantityItemName}`,
      text: `there are only ${lowQuantity} of ${lowQuantityItemName}`,
      icon: 'warning',
      confirmButtonText: 'OK',
    });
  };

  useEffect(() => {
    if (triggerPopup) {
      showAlert();
    }
  }, [triggerPopup]);

  const handleFilter = (type: string) => {
    setFilterType(type);
  };

  return (
    <section className="consumables-section">

      <div className='consumables-form-information'>
        <div className='icons-wrapper'>
          <span><FaToolbox /></span>
          <p>CONSUMABLES</p>
        </div>
        <div className='consumables-form-row'>
          <fieldset>
            <label>Name</label>
            <input onChange={(event) => { setName(event.target.value) }} type='text'></input>
          </fieldset>
          <fieldset>
            <label>Type</label>
            <input onChange={(event) => { setType(event.target.value) }} type='text'></input>
          </fieldset>
        </div>
        <div className='consumables-form-row'>
          <fieldset>
            <label>Manufacturer</label>
            <input onChange={(event) => { setManufacturer(event.target.value) }} type='text'></input>
          </fieldset>
          <fieldset>
            <label>Lot</label>
            <input onChange={(event) => { setLotNumber(event.target.value) }} type='text'></input>
          </fieldset>
        </div>
        <div className='consumables-form-row'>
          <fieldset>
            <label>Expiration</label>
            <input onChange={(event) => { setExpiration(event.target.value) }} type='text'></input>
          </fieldset>
          <fieldset>
            <label>Quantity</label>

            <input onChange={(event) => { setQuantity(event.target.value) }} type='text'></input>
            {isNaN(quantity) && <span className='error-message'>Quantity should be a number</span>}

        
          </fieldset>
        </div>
        <div className='consumables-form-row'>
          <fieldset>
            <label>Price</label>
            <input onChange={(event) => { setPrice(event.target.value) }} type='text'></input>
          </fieldset>
          <fieldset>
            <label>Notes</label>
            <input onChange={(event) => { setNotes(event.target.value) }} type='text'></input>
          </fieldset>
        </div>

        <div className='button-wrapper'>
        <button onClick={addConsumable}> <BiMessageAltAdd/><p>ADD</p> </button>
          <button onClick={getConsumables}><BiShow/><p>SHOW ALL</p></button>
        </div>


      </div>
      <select className='dropdown' onChange={(e) => handleFilter(e.target.value)}>
        <option className='dropdown-content' value="">Filter by Type</option>
        <option className='dropdown-content' value="Reusable">Reusable</option>
        <option className='dropdown-content' value="Disposable">Disposable</option>
      </select>

      <Suspense fallback={<BeatLoader />}>
        {loading ? (
          <BeatLoader size={30} color='grey' />
        ) : (
          <main>

            {consumablesList
              .filter((val) => filterType === '' || val.type === filterType)
              .map((val, key) => {
                return <Content data={val} keyNumber={key} id={val.id} />
              })}

          </main>
        )} </Suspense>
    </section>
  )
}
export default Index