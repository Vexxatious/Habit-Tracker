import React from "react";

const Habit = ({ name, tracker, onCellClick, week, onDelete }) => {
  return (
    <tr>
      <td className="habit-name-cell">{name}</td>
      {tracker[week].map((value, index) => (
        <td
          className={"habit-tracker-cell-" + value}
          key={index}
          onClick={() => onCellClick(name, index)}
        ></td>
      ))}

      <td>
        <form type="button" onClick={() => onDelete(name)}>
          <i className="fa fa-trash-o"></i>
        </form>
      </td>
    </tr>
  );
};

export default Habit;
