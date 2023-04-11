import { createContext, useState, ReactNode, SetStateAction, Dispatch } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';


export type Employee = {
  id: number;
  name: string;
  age: number;
  country: string;
  position: string;
  wage: number;
};

export type EmployeeContextType = {
  id: number;
  name: string;
  age: number;
  country: string;
  position: string;
  wage: number;
  newWage: number;
  newPosition: string;
  newAge: number;
  employeeList: Employee[];
  addEmployee: () => void;
  updateEmployeeWage: (id: number) => void;
  updateEmployeePosition: (id: number) => void;
  updateEmployeeAge: (id: number) => void;
  deleteEmployee: (id: number) => void;
  setName: Dispatch<SetStateAction<string>>;
    setWage: Dispatch<SetStateAction<number>>;
  setAge: Dispatch<SetStateAction<number>>;
  setCountry: Dispatch<SetStateAction<string>>;
  setPosition: Dispatch<SetStateAction<string>>;
  setNewWage:Dispatch<SetStateAction<number>>;
  setNewPosition: Dispatch<SetStateAction<string>>;
  setNewAge: Dispatch<SetStateAction<number>>;
  setEmployeeList: Dispatch<SetStateAction<Employee[]>>;

};

type EmployeeProviderProps = {
  children: ReactNode;
};

export const EmployeeContext = createContext<EmployeeContextType>({
  id: 0,
  name: '',
  age: 0,
  country: '',
  position: '',
  wage: 0,
  newWage: 0,
  newPosition: '',
  newAge: 0,
  employeeList: [],
  addEmployee: () => { },
  updateEmployeeWage: () => { },
  updateEmployeePosition: () => { },
  updateEmployeeAge: () => { }, 
  deleteEmployee: () =>  {},
  setName: () => {},
  setAge: () =>  {},
  setWage: () =>  {},
  setCountry: () =>  {},
  setPosition: () =>  {},
  setNewWage: () =>  {},
  setNewPosition: () =>  {},
  setNewAge: () =>  {},
  setEmployeeList: () =>  [] 
  
});




export const EmployeeProvider = ({ children }: EmployeeProviderProps) => {
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [country, setCountry] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [wage, setWage] = useState<number>(0);
  const [newWage, setNewWage] = useState<number>(0);
  const [newPosition, setNewPosition] = useState<string>('');
  const [newAge, setNewAge] = useState<number>(0);
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);

  const addEmployee = () => {
    try {
      if (isNaN(age)) {
        throw new Error('Age should be a number');
      }
      if (isNaN(wage)) {
        throw new Error('Wage should be a number');
      }
      Axios.post('https://bionexusjr.herokuapp.com/create', {
        id: id,
        name: name,
        age: age,
        country: country,
        position: position,
        wage: wage,
      }).then(() => {
        setEmployeeList([
          ...employeeList,
          {
            id: id,
            name: name,
            age: age,
            country: country,
            position: position,
            wage: wage,
          },
        ]);
        Swal.fire({
          icon: 'success',
          title: 'Employee added',
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
    } catch (error: unknown) {
      alert(error.message);
    }
  };

  const updateEmployeePosition = ( id: number ) => {
    Axios.put('https://bionexusjr.herokuapp.com/update/employeePosition', { position: newPosition, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id === id
              ? {
                id: val.id,
                name: val.name,
                country: val.country,
                age: val.age,
                position: newPosition,
                wage: val.wage,
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


  const updateEmployeeAge = (id: number) => {
    Axios.put('https://bionexusjr.herokuapp.com/update/employeeAge', { age: newAge, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id == id
              ? {
                id: val.id,
                name: val.name,
                country: val.country,
                age: newAge,
                position: val.position,
                wage: val.wage,
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


  const updateEmployeeWage = (id: number) => {
    Axios.put('https://bionexusjr.herokuapp.com/update', { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id === id
              ? {
                id: val.id,
                name: val.name,
                country: val.country,
                age: val.age,
                position: val.position,
                wage: newWage,
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

  const deleteEmployee = (id:number ) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this employee!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'red',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`https://bionexusjr.herokuapp.com/delete/${id}`).then((response) => {
          setEmployeeList(
            employeeList.filter((val) => {
              return val.id !== id;
            })
          );
          Swal.fire(
            'Deleted!',
            'Employee has been deleted.',
            'success'
          );
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Employee deletion cancelled :)',
          'error'
        );
      }
    });
  };
  
  const values: EmployeeContextType = {
    setName,
    setAge,
    setCountry,
    setPosition,
    setWage,
    setNewWage,
    setNewPosition,
    setNewAge,
    setEmployeeList,
    id,
    name,
    age,
    country,
    updateEmployeePosition,
    position,
    wage,
    newWage,
    newPosition,
    newAge,
    updateEmployeeAge,
    employeeList,
    deleteEmployee,
    updateEmployeeWage,
    addEmployee,
  };

  return (
    <EmployeeContext.Provider value={values}>
      {children}
    </EmployeeContext.Provider>
  );
};