import { useState, createContext, ReactNode, SetStateAction, Dispatch } from 'react';
import Axios from "axios";
import Swal from 'sweetalert2';


type ConsumableType = {
  id: number;
  name: string;
  type: string;
  manufacturer: string;
  lotNumber: string;
  expiration: string;
  quantity: number;
  price: string;
  notes: string;
};

export type ConsumablesContextType = {
  id: number;
  setId: Dispatch<SetStateAction<number>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  manufacturer: string;
  setManufacturer: Dispatch<SetStateAction<string>>;
  lotNumber: string;
  setLotNumber: Dispatch<SetStateAction<string>>;
  expiration: string;
  setExpiration: Dispatch<SetStateAction<string>>;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  price: string;
  setPrice: Dispatch<SetStateAction<string>>;
  notes: string;
  setNotes: Dispatch<SetStateAction<string>>;
  consumablesList: ConsumableType[];
  setConsumablesList: Dispatch<SetStateAction<ConsumableType[]>>;
  newName: string;
  setNewName: Dispatch<SetStateAction<string>>;
  newType: string;
  setNewType: Dispatch<SetStateAction<string>>;
  newManufacturer: string;
  setNewManufacturer: Dispatch<SetStateAction<string>>;
  newLotNumber: string;
  setNewLotNumber: Dispatch<SetStateAction<string>>;
  newExpiration: string;
  setNewExpiration: Dispatch<SetStateAction<string>>;
  newQuantity: number;
  setNewQuantity: Dispatch<SetStateAction<number>>;
  newPrice: string;
  setNewPrice: Dispatch<SetStateAction<string>>;
  newNotes: string;
  setNewNotes: Dispatch<SetStateAction<string>>;
  
  addConsumable: () => void;
  deleteConsumables: (id: number) => void;
  updateConsumableQuantity: (id: number) => void;
  updateConsumableManufacturer: (id: number) => void;
  updateConsumableNotes: (id: number) => void;
  updateConsumablePrice: (id: number) => void;

  

  
};

export const ConsumablesContext = createContext<ConsumablesContextType>(
  {} as ConsumablesContextType
);

type ConsumablesProviderProps = {
    children: ReactNode;
  };
  

export const ConsumablesContextProvider = ({ children }: ConsumablesProviderProps) => {
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [manufacturer, setManufacturer] = useState<string>("");
  const [lotNumber, setLotNumber] = useState<string>("");
  const [expiration, setExpiration] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const [consumablesList, setConsumablesList] = useState<ConsumableType[]>([]);

  const [newName, setNewName] = useState<string>("");
  const [newType, setNewType] = useState<string>("");
  const [newManufacturer, setNewManufacturer] = useState<string>("");
  const [newLotNumber, setNewLotNumber] = useState<string>("");
  const [newExpiration, setNewExpiration] = useState<string>("");
  const [newQuantity, setNewQuantity] = useState<number>(0);
  const [newPrice, setNewPrice] = useState<string>("");
  const [newNotes, setNewNotes] = useState<string>("")

  


  const addConsumable = () => {
    try {
      if (isNaN(quantity)) {
        throw new Error('quantity should be a number');
      }
      
    Axios.post("https://bionexusjr.herokuapp.com/consumables/create", {
      id: id,
      name: name,
      type: type,
      manufacturer: manufacturer,
      lotNumber: lotNumber,
      expiration: expiration,
      quantity: quantity,
      price: price,
      notes: notes,
    }).then(() => {
      setConsumablesList([
        ...consumablesList,
        {
          id: id,
          name: name,
          type: type,
          manufacturer: manufacturer,
          lotNumber: lotNumber,
          expiration: expiration,
          quantity: quantity,
          price: price,
          notes: notes,
        },
      ]);
      Swal.fire({
        icon: 'success',
        title: 'Consumable added',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        Swal.fire({
          icon: 'info',
          title: 'Refreshing page to apply changes',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          window.location.reload();
        });
      });
    });
  } catch (error) {
    alert(error.message);
  }
};

const deleteConsumables = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this consumable!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'red',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`https://bionexusjr.herokuapp.com/consumables/delete/${id}`).then((response) => {
          setConsumablesList(
            consumablesList.filter((val) => {
              return val.id !== id;
            })
          );
          Swal.fire(
            'Deleted!',
            'Consumable has been deleted.',
            'success'
          );
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Consumable deletion cancelled :)',
          'error'
        );
      }
    });
  };

  const updateConsumableQuantity = (id: number) => {
    Axios.put("https://bionexusjr.herokuapp.com/consumables/updateQuantity", {
      quantity: newQuantity,
      id: id,
    }).then((response) => {
      setConsumablesList(
        consumablesList.map((val) => {
          return val.id === id
            ? {
              id: val.id,
              name: val.name,
              type: val.type,
              manufacturer: val.manufacturer,
              lotNumber: val.lotNumber,
              expiration: val.expiration,
              quantity: newQuantity,
              price: val.price,
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
    });
  };

  const updateConsumableNotes = (id: number) => {
    Axios.put('https://bionexusjr.herokuapp.com/consumables/updateNotes', { notes: newNotes, id: id }).then(
      (response) => {
        setConsumablesList(
          consumablesList.map((val) => {
            return val.id === id
              ? {
                id: val.id,
              name: val.name,
              type: val.type,
              manufacturer: val.manufacturer,
              lotNumber: val.lotNumber,
              expiration: val.expiration,
              quantity: val.quantity,
              price: val.price,
              notes: newNotes,
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
        })
      }
    );
  };

  const values: ConsumablesContextType = {
    setName,
    setType,
    setManufacturer,
    setLotNumber,
    setExpiration,
    setQuantity,
    setPrice,
    setNotes,
    setNewName,
    setNewType,
    setNewManufacturer,
    setNewLotNumber,
    setNewExpiration,
    setNewQuantity,
    setNewPrice,
    setNewNotes,
    addConsumable,
    deleteConsumables,
    updateConsumableQuantity,
    updateConsumableNotes,
    consumablesList,
    setConsumablesList,
    quantity,
  };

  return (
    <ConsumablesContext.Provider value={values}>
      {children}
    </ConsumablesContext.Provider>
  );
};


