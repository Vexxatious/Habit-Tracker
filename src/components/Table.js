import React, { useState, useEffect } from "react";
import HabitList from "./HabitList";

const Table = ({
  scrollDate,
  days,
  getDate,
  habits,
  onCellClick,
  getWeek,
  currentDay,
  onDelete,
  isUndoEnabled,
  onUndo,
}) => {
  return (
    <div>
      <div className="flex">
        <button className="scroll-left" onClick={() => scrollDate(-7)}>
          &lt;
        </button>
        <table className="habit-table">
          <thead>
            <tr>
              <th> </th>
              {days.map((day, index) => (
                <th
                  id={index == currentDay.getDay() ? "current-day" : ""}
                  key={index}
                >
                  {day} <br /> {getDate(index - currentDay.getDay())}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <HabitList
              habits={habits}
              onCellClick={onCellClick}
              week={getWeek(currentDay)}
              onDelete={onDelete}
            />
          </tbody>
        </table>
        <button className="scroll-right" onClick={() => scrollDate(7)}>
          &gt;
        </button>
      </div>
      <div>
        <i
          className="fa fa-refresh center fa-lg"
          id={isUndoEnabled ? "" : "undo-disabled"}
          onClick={onUndo}
        ></i>
      </div>
    </div>
  );
};

export default Table;
