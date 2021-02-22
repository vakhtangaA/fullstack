import React from "react";

export const Persons = (props) => {
  const { persons, filteredPersons, newName } = props;
  if (newName.length === 0) {
    return persons.map((person) => {
      return (
        <li key={person.name}>
          {person.name} ___ {person.number}
        </li>
      );
    });
  } else {
    return filteredPersons.map((filteredPerson) => {
      return (
        <li key={filteredPerson.name}>
          {filteredPerson.name}___{filteredPerson.number}
        </li>
      );
    });
  }
};
