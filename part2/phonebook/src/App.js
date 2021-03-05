import React, { useState, useEffect } from "react";
import { Form } from "./Form";
import "./index.css";
import { Persons } from "./Persons";
import contactService from "./services/contacts";
import Error from "./Error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [alertStyle, setAlertStyle] = useState("success");

  useEffect(() => {
    contactService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let personsNames = persons.map((person) => person.name);
    let index = personsNames.indexOf(newName);
    if (personsNames.includes(newName)) {
      let currentPerson = persons[index];
      if (currentPerson.number !== newNumber) {
        let changedPerson = { ...currentPerson, number: newNumber };
        let id = changedPerson.id;
        let result = window.confirm(
          `Would you like to replace number of ${newName}?`
        );
        if (result) {
          contactService
            .update(id, changedPerson)
            .then((response) => {
              setPersons(
                persons.map((person) =>
                  person.id !== id ? person : response.data
                )
              );
              setAlertStyle("success");
              setErrorMessage(`Changed number of ${newName}`);
              setTimeout(() => {
                setErrorMessage(null);
              }, 4000);
            })
            .catch((error) => {
              setAlertStyle("error");
              setErrorMessage(`Something went wrong`);
              setTimeout(() => {
                setErrorMessage(null);
              }, 4000);
            });
        }
      } else {
        setAlertStyle("error");
        setErrorMessage(`${newName} with this number already exists`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 4000);
      }
    } else {
      const newContact = {
        name: newName,
        number: newNumber,
      };
      contactService.create(newContact).then((response) => {
        setPersons(persons.concat(response.data));
      });
      setAlertStyle("success");
      setErrorMessage(`${newName} added to contacts`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
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

  const handleDelete = (event) => {
    let id = event.target.getAttribute("detector_id");
    let result = window.confirm("Do you want to delete?");
    if (result) {
      contactService.deleteContact(id).then(() => {
        contactService.getAll().then((response) => {
          setPersons(response.data);
        });
        setAlertStyle("success");
        setErrorMessage(`deleted from contacts`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 4000);
      });
    }
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
      <Error message={errorMessage} style={alertStyle} />
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
          handleDelete={handleDelete}
        />
      </ul>
    </div>
  );
};

export default App;
