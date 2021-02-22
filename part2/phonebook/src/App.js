import React, { useState, useEffect } from "react";
import { Form } from "./Form";
import "./index.css";
import { Persons } from "./Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      let fetchedpersons = response.data;
      setPersons(fetchedpersons);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.map((person) => person.name).includes(newName)) {
      alert(`${newName} already exists`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
    }

    setNewName("");
    setNewNumber("");
  };

  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const filterName = () => {
    let regex = new RegExp("^" + newName, "i");
    let filteredPersons = persons.filter((person) => {
      return regex.test(person.name);
    });

    if (newName.length === 0) {
      setPersons(persons);
    } else {
      setFilteredPersons(filteredPersons);
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Form
        handleSubmit={handleSubmit}
        newName={newName}
        handleName={handleName}
        filterName={filterName}
        newNumber={newNumber}
        handleNumber={handleNumber}
      />
      <h3>Numbers</h3>
      <ul id="myUL">
        <Persons
          persons={persons}
          filteredPersons={filteredPersons}
          newName={newName}
        />
      </ul>
    </div>
  );
};

export default App;
