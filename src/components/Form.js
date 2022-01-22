import React from "react";

const Form = ({ setInputText, onSubmit }) => {
  return (
    <form
      onChange={(e) => {
        setInputText(e.target.value);
      }}
    >
      <input type="text" className="habit-input" id="habit-input"></input>
      <button type="submit" className="habit-button" onClick={onSubmit}>
        +
      </button>
    </form>
  );
};

export default Form;
