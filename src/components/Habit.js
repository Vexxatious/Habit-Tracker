import React from "react";

const Habit = ({ habit, week, onCellClick, onDelete }) => {
  return (
    <tr>
      <td className="habit-name-cell">{habit.name}</td>
      {habit[week].map((value, index) => (
        <td
          className={"habit-tracker-cell-" + value}
          key={index}
          onClick={() => onCellClick(habit, index)}
        ></td>
      ))}

      <td>
        <form type="button" onClick={() => onDelete(habit)}>
          <i className="fa fa-trash-o"></i>
        </form>
      </td>
    </tr>
  );
};

export default Habit;
