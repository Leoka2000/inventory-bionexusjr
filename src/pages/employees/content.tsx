import React, { FC, useContext, useEffect, useState } from 'react';
import { EmployeeContext, EmployeeContextType } from '../../contexts/employee';

type Props = {
  data: {
    name: string;
    age: number;
    country: string;
    position: string;
    wage: number;
  };
  id: number;
  keyNumber: number;
};

const Content: FC<Props> = ({ data, keyNumber, id }: Props) => {
  const { setNewAge, updateEmployeeAge, setNewPosition, updateEmployeePosition, setNewWage, updateEmployeeWage, deleteEmployee, newAge } = useContext<EmployeeContextType>(EmployeeContext);
  const [ageError, setAgeError] = useState(false);

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewAge(event.target.value);
    setAgeError(isNaN(event.target.value));
  };

  return (
    <div className="list-parent">
      <div key={keyNumber} className="list-wrapper">
        <div className="list-individual-wrapper">
          <div className="text-wrapper">
            <h3>NAME: </h3>
            <p>{data.name}</p>
          </div>
        </div>
        <div className="list-individual-wrapper">
          <div className="text-wrapper">
            <h3>AGE: </h3>
            <p>{data.age}</p>
          </div>
          <div className="input-box">
            <div className="column-error">
              <input type="text" onChange={handleAgeChange} />
              {ageError && <span className="error-message">Age should be a number</span>}
            </div>
            <button onClick={() => updateEmployeeAge(id)}>UPDATE</button>
          </div>
        </div>
        <div className="list-individual-wrapper">
          <div className="text-wrapper">
            <h3>COUNTRY: </h3>
            <p>{data.country}</p>
          </div>
        </div>
        <div className="list-individual-wrapper">
          <div className="text-wrapper">
            <h3>POSITION: </h3>
            <p>{data.position}</p>
          </div>
          <div className="input-box">
            <input type="text" onChange={(event) => setNewPosition(event.target.value)} />
            <button onClick={() => updateEmployeePosition(id)}>UPDATE</button>
          </div>
        </div>
      </div>
      <div className="delete-wrapper">
        <button
          className="delete"
          onClick={() => {
            deleteEmployee(id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Content;
