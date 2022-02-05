import React from "react";

const Form = ({ setInputText, onSubmit, onWeekSelect, shownWeeks }) => {
  return (
    <form
      onChange={(e) => {
        setInputText(e.target.value);
      }}
    >
      <div>
        <label>Weeks Shown: </label>
        <select
          onChange={onWeekSelect}
          value={shownWeeks}
          name="weeks"
          className="habit-select"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div>
        <label>New Habit: </label>
        <input type="text" className="habit-input" id="habit-input"></input>
        <button type="submit" className="habit-button" onClick={onSubmit}>
          +
        </button>
      </div>
    </form>
  );
};

export default Form;
