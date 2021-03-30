import React from "react";

export const Persons = props => {
  const { persons, filteredPersons, newName, handleDelete } = props;
  if (newName.length === 0) {
    return persons.map(person => {
      return (
        <div key={person.name}>
          <li>
            {person.name} - - - {person.number}
          </li>
          <button
            detector_id={person.id}
            onClick={handleDelete}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      );
    });
  } else {
    return filteredPersons.map(filteredPerson => {
      return (
        <div key={filteredPerson.name}>
          <li>
            {filteredPerson.name} - - - {filteredPerson.number}
            <button
              detector_id={filteredPerson.id}
              onClick={handleDelete}
              className="btn btn-danger"
            >
              Delete
            </button>
          </li>
        </div>
      );
    });
  }
};
