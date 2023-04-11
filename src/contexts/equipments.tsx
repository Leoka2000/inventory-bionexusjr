import React, { createContext, useState, ReactNode, SetStateAction, Dispatch } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';


type Equipment = {
  id: number;
  name: string;
  type: string;
  manufacturer: string;
  serial: string;
  price: string;
  expiration: string;
  maintenanceSchedule: string;
  status: string;
  quantity: string;
  notes: string;
};

export type ContextProps = {
  equipmentList: Equipment[];
  addEquipment: () => void;
  deleteEquipment: (id: number) => void;
  updateEquipmentQuantity: (id: number) => void;
  updateEquipmentNotes: (id: number) => void;
  updateEquipmentStatus: (id: number) => void;
  updateMaintenanceSchedule: (id: number) => void;
  setName: Dispatch<SetStateAction<string>>;
  setType: Dispatch<SetStateAction<string>>;
  setManufacturer: Dispatch<SetStateAction<string>>;
  setSerial: Dispatch<SetStateAction<string>>;
  setPrice: Dispatch<SetStateAction<string>>;
  setExpiration: Dispatch<SetStateAction<string>>;
  setMaintenanceSchedule: Dispatch<SetStateAction<string>>;
    setStatus: Dispatch<SetStateAction<string>>;
  setNotes: Dispatch<SetStateAction<string>>;
  setNewNotes: Dispatch<SetStateAction<string>>;
  setNewStatus: Dispatch<SetStateAction<string>>;
  setNewMaintenanceSchedule: Dispatch<SetStateAction<string>>;
  setEquipmentList:Dispatch<SetStateAction<Equipment[]>>;
  setQuantity:Dispatch<SetStateAction<string>>;
  setNewQuantity:Dispatch<SetStateAction<string>>;
  
};

export const EquipmentContext = createContext<ContextProps>({
  equipmentList: [],
  addEquipment: () => {},
  deleteEquipment: (id: number) => {},
  updateEquipmentQuantity: (id: number) => {},
  updateEquipmentNotes: (id: number) => {},
  updateEquipmentStatus: (id: number) => {},
  updateMaintenanceSchedule: (id: number) => {},
  setName: () => {},
  setType: () => {},
  setManufacturer: () => {},
  setSerial: () => {},
  setPrice: () => {},
  setExpiration: () => {},
  setMaintenanceSchedule: () => {},
    setStatus: () => {},
  setNotes: () => {},
  setNewNotes: () => {},
  setNewStatus: () => {},
  setNewMaintenanceSchedule: () => {},
  setEquipmentList:() => [],
  setQuantity:() => {},
  setNewQuantity:() => {},
  
});

type EquipmentsProviderProps = {
  children: ReactNode;
};

export const EquipmentContextProvider = ({ children }: EquipmentsProviderProps) => {
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [manufacturer, setManufacturer] = useState<string>('');
  const [serial, setSerial] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [expiration, setExpiration] = useState<string>('');
  const [maintenanceSchedule, setMaintenanceSchedule] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [newQuantity, setNewQuantity] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [newNotes, setNewNotes] = useState<string>('');
  const [newStatus, setNewStatus] = useState<string>('');
  const [newMaintenanceSchedule, setNewMaintenanceSchedule] = useState<string>('');

  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);

  const addEquipment = () => {
    Axios.post('https://bionexusjr.herokuapp.com/equipments/create', {
      id: id,
      name: name,
      type: type,
      manufacturer: manufacturer,
      serial: serial,
      price: price,
      expiration: expiration,
      maintenanceSchedule: maintenanceSchedule,
      status: status,
      quantity: quantity,
      notes: notes,
    }).then(() => {
      setEquipmentList([
        ...equipmentList,
        {
          id: id,
          name: name,
          type: type,
          manufacturer: manufacturer,
          serial: serial,
          price: price,
          expiration: expiration,
          maintenanceSchedule: maintenanceSchedule,
          status: status,
          quantity: quantity,
          notes: notes,
        },
      ]);

      Swal.fire({
        icon: 'success',
        title: 'Equipment added',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        Swal.fire({
          icon: 'info',
          title: 'Refreshing page to apply changes',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          window.location.reload();
        });
      });
    });
  };
  
  const updateEquipmentNotes = (id: number) => {
    Axios.put('https://bionexusjr.herokuapp.com/equipments/updateNotes', { notes: newNotes, id: id }).then(
      (response) => {
        setEquipmentList(
          equipmentList.map((val) => {
            return val.id === id
              ? {
                id: val.id,
                name: val.name,
                type: val.type,
                manufacturer: val.manufacturer,
                serial: val.serial,
                price: val.price,
                expiration: val.expiration,
                maintenanceSchedule: val.maintenanceSchedule,
                status: val.status,
                quantity: val.quantity,
                notes: newNotes,
                }
              : val;
          })
        );
        Swal.fire({
          icon: 'success',
          text: 'List item updated, refreshing the page to apply changes...',
          showConfirmButton: false,
        timer: 2000,
        }).then(() => {
          window.location.reload();
        });
      }
    );
  };
 

const updateMaintenanceSchedule = (id: number) => {
  Axios.put('https://bionexusjr.herokuapp.com/equipments/updateMaintenanceSchedule', { maintenanceSchedule: newMaintenanceSchedule, id: id }).then(
    (response) => {
      setEquipmentList(
        equipmentList.map((val) => {
          return val.id === id
            ? {
              id: val.id,
              name: val.name,
              type: val.type,
              manufacturer: val.manufacturer,
              serial: val.serial,
              price: val.price,
              expiration: val.expiration,
              maintenanceSchedule: newMaintenanceSchedule,
              status: val.status,
              quantity: val.quantity,
              notes: val.notes,
              }
            : val;
        })
      );
      Swal.fire({
        icon: 'success',
        text: 'List item updated, refreshing the page to apply changes',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        window.location.reload();
      });
    }
  );
};


  
  const updateEquipmentQuantity = (id: number) => {
    Axios.put('https://bionexusjr.herokuapp.com/equipments/updateQuantity', { quantity: newQuantity, id: id }).then(
      (response) => {
        setEquipmentList(
          equipmentList.map((val) => {
            return val.id === id
              ? {
                id: val.id,
                name: val.name,
          type: val.type,
          manufacturer: val.manufacturer,
          serial: val.serial,
          price: val.price,
          expiration: val.expiration,
          maintenanceSchedule: val.maintenanceSchedule,
          status: val.status,
          quantity: newQuantity,
          notes: val.notes,
              }
              : val;
          })
        );
        Swal.fire({
          icon: 'success',
          text: 'List item updated, refreshing the page to apply changes',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          window.location.reload();
        });
      }
    );
  };

  const deleteEquipment = (id:number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this equipment!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'red',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`https://bionexusjr.herokuapp.com/equipments/delete/${id}`).then((response) => {
          setEquipmentList(
            equipmentList.filter((val) => {
              return val.id !== id;
            })
          );
          Swal.fire(
            'Deleted!',
            'Equipment has been deleted.',
            'success'
          );
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Equipment deletion cancelled :)',
          'error'
        );
      }
    });
  };
  
  const updateEquipmentStatus = (id: number) => {
    Axios.put('https://bionexusjr.herokuapp.com/equipments/updateStatus', { status: newStatus, id: id }).then(
      (response) => {
        setEquipmentList(
          equipmentList.map((val) => {
            return val.id === id
              ? {
                id: val.id,
                name: val.name,
                type: val.type,
                manufacturer: val.manufacturer,
                serial: val.serial,
                price: val.price,
                expiration: val.expiration,
                maintenanceSchedule: val.maintenanceSchedule,
                status: newStatus,
                quantity: val.quantity,
                notes: val.notes,
                }
              : val;
          })
        );
        Swal.fire({
          icon: 'success',
          text: 'List item updated, refreshing the page to apply changes',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          window.location.reload();
        });
      }
    );
  };

  const values: ContextProps = {
    deleteEquipment,
    updateEquipmentQuantity,
    setName,
    setType,
    setManufacturer,
    updateMaintenanceSchedule,
    setSerial,
    setPrice,
    setExpiration,
    setMaintenanceSchedule,
    updateEquipmentStatus,
      setStatus,
      updateEquipmentNotes,
    setNotes,
    setNewNotes,
    setNewStatus,
    setNewMaintenanceSchedule,
    addEquipment,
    setEquipmentList,
    equipmentList,
    setQuantity,
    setNewQuantity}
    // passing state variables and functions through React's Context API
  return (
    <>
    <EquipmentContext.Provider value={values}>
      {children}
    </EquipmentContext.Provider>
    </>
  );
};



