import React, { useContext, useState } from 'react';
import { ConsumablesContext, ConsumablesContextType } from '../../contexts/consumables';

interface Props {
  data: {
    id: number;
    name: string;
    type: string;
    manufacturer: string;
    lotNumber: string;
    expiration: string;
    quantity: number;
    price: number;
    notes: string;
  };
  keyNumber: number;
  id: number;
}

const Content: React.FC<Props> = ({ data, keyNumber, id }: Props) => {
  const { setNewQuantity, updateConsumableQuantity, setNewNotes, updateConsumableNotes, deleteConsumables } = useContext<ConsumablesContextType>(ConsumablesContext);
  const [quantityError, setQuantityError] = useState(false);
 



  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuantity(event.target.value);
    setQuantityError(isNaN(event.target.value));
  };
  return (
    <div key={keyNumber} className="list-parent">
      <div className='list-wrapper'>
        <div className='list-individual-wrapper'>
          <div className='text-wrapper'> <h3>NAME: </h3> <p>{data.name}</p> </div>
        </div>
        <div className='list-individual-wrapper'>
          <div className='text-wrapper'> <h3>TYPE: </h3> <p>{data.type}</p> </div>
        </div>
        <div className='list-individual-wrapper'>
          <div className='text-wrapper'> <h3>MANUFACTURER: </h3> <p>{data.manufacturer}</p> </div>

        </div>
        <div className='list-individual-wrapper'>
          <div className='text-wrapper'> <h3>LOT NUMBER: </h3> <p>{data.lotNumber}</p> </div>
        </div>
        <div className='list-individual-wrapper'>
          <div className='text-wrapper'> <h3>EXPIRATION: </h3> <p>{data.expiration}</p> </div>
        </div>
        <div className='list-individual-wrapper'>
          <div className='text-wrapper'> <h3>QUANTITY: </h3> <p id='consumables-quantity' style={{ color: data.quantity < 15 ? 'red' : 'green' }}>{data.quantity}</p> </div>
          <div className='input-box'>
            <div className="column-error">
              <input type="text" onChange={handleQuantityChange} />
              {quantityError && <span className="error-message">Age should be a number</span>}
            </div>
            <button onClick={() => updateConsumableQuantity(id)}>UPDATE</button>

          </div>
        </div>
        <div className='list-individual-wrapper'>
          <div className='text-wrapper'> <h3>PRICE: </h3> <p>{data.price}</p> </div>
        </div>
        <div className='list-individual-wrapper'>
          <div className='text-wrapper'> <h3>NOTES: </h3> <p>{data.notes}</p> </div>
          <div className='input-box'>
            <input type="text" onChange={(event) => { setNewNotes(event.target.value); }} />
            <button onClick={() => { updateConsumableNotes(id); }}>UPDATE</button>
          </div>
        </div>
      </div>
      <div className='delete-wrapper'>
        <button className='delete'
          onClick={() => {
            deleteConsumables(id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Content
