import React from "react";

export function Form(props) {
  const {
    handleSubmit,
    newName,
    handleName,
    filterName,
    newNumber,
    handleNumber
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      {/* <h3>Add new contact</h3> */}
      <div>
        name:
        <input
          id="nameInput"
          value={newName}
          onChange={handleName}
          onKeyUp={filterName}
        />
      </div>
      <div>
        number:
        <input
          id="numberInput"
          type="tel"
          value={newNumber}
          onChange={handleNumber}
        />
      </div>
      <br></br>
      <div>
        <button className="btn btn-success" type="submit">
          <b>Add contact</b>
        </button>
      </div>
    </form>
  );
}
