import React, { FC, useContext } from 'react'
import { EquipmentContext } from '../../contexts/equipments';

type Props = {
  data: {
    name: string;
    type: string;
    price: string;
    manufacturer: string;
    serial: string;
    expiration: number;
    maintenanceSchedule: string;
    status: string;
    quantity: string;
    notes: string;
  };
  id: number;
  keyNumber: number;
};

const Content: FC<Props> = ({ data, keyNumber, id }: Props) => {


  const { setNewMaintenanceSchedule, updateMaintenanceSchedule, setNewStatus, updateEquipmentStatus, setNewQuantity, updateEquipmentQuantity, setNewNotes, updateEquipmentNotes, deleteEquipment } = useContext(EquipmentContext);
  return (
    <div className="list-parent">

      <div key={keyNumber} className='list-wrapper'>
        <div className='list-individual-wrapper'>
          <div className='text-wrapper'> <h3>NAME: </h3> <p>{data.name}</p> </div>
        </div>
        <div className='list-individual-wrapper'>
          <div className='text-wrapper'> <h3>TYPE: </h3> <p>{data.type}</p> </div>
        </div>
        <div className='list-individual-wrapper'>
          <div className='text-wrapper'> <h3>MANUFACTURER: </h3> <p>{data.manufacturer}</p> </div>
          <div className='input-box'>
            {/* <input type="text" onChange={(event) => { setNewManufacturer(event.target.value); }} /> */}
            {/* <button onClick={() => { updateConsumableManufacturer(val.id); }}>UPDATE</button> */}
          </div>
        </div>
        <div className='list-individual-wrapper'>
          <div className='text-wrapper'> <h3>SERIAL: </h3> <p>{data.serial}</p> </div>

        </div>
        <div className='list-individual-wrapper'>
          <div className='text-wrapper'>
            <h3>PRICE / UNIT: </h3>
            <p>{data.price}</p>
          </div>

        </div>
        <div className='list-individual-wrapper'>
          <div className='text-wrapper'>
            <h3>EXPIRATION: </h3> <p>{data.expiration}</p>
          </div>
          <div className='input-box'>
            {/* <input type="number" onChange={(event) => { setNewExpiration(event.target.value); }} /> */}
            {/* <button onClick={() => { updateEquipmentExpiration(val.id); }}>UPDATE</button> */}
          </div>
        </div>
        <div className='list-individual-wrapper'>
          <div className='text-wrapper'>
            <h3>MAINTENANCE: </h3>
            <p>{data.maintenanceSchedule}</p>
          </div>
          <div className='input-box'>
            <input type="text" onChange={(event) => { setNewMaintenanceSchedule(event.target.value); }} />
            <button onClick={() => { updateMaintenanceSchedule(id) }}>UPDATE</button>
          </div>
        </div>
        <div className='list-individual-wrapper'>
          <div className='text-wrapper'>
            <h3>STATUS: </h3> <p style={{ color: data.status === "In use" ? "green" : data.status === "In maintenance" ? "saddlebrown" : "" }}>
              {data.status}
            </p>
          </div>
          <div className='input-box'>
            <select onChange={(event) => { setNewStatus(event.target.value); }}>
              <option value="">Select Status</option>
              <option value="In use">In use</option>
              <option value="In maintenance">In maintenance</option>
            </select>
            <button onClick={() => { updateEquipmentStatus(id); }}>UPDATE</button>
          </div>

        </div>
        <div className='list-individual-wrapper'>
          <div className='text-wrapper'>
            <h3>QUANTITY: </h3> <p>{data.quantity}</p>
          </div>
          <div className='input-box'>
            <input type="text" onChange={(event) => { setNewQuantity(event.target.value); }} />
            <button onClick={() => { updateEquipmentQuantity(id); }}>UPDATE</button>
          </div>
        </div>
        <div className='list-individual-wrapper'>
          <div className='text-wrapper'>
            <h3>NOTES: </h3> <p>{data.notes}</p>
          </div>
          <div className='input-box'>
            <input type="text" onChange={(event) => { setNewNotes(event.target.value); }} />
            <button onClick={() => { updateEquipmentNotes(id); }}>UPDATE</button>
          </div>
        </div>
      </div>

      <div className='delete-wrapper'>
        <button className='delete'
          onClick={() => {
            deleteEquipment(id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Content
