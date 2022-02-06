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
  weeksShown,
}) => {
  return (
    <div>
      <div className="flex">
        <button className="scroll-left" onClick={() => scrollDate(-7)}>
          &lt;
        </button>
        <table className="habit-table">
          <tbody>
            <tr className="table-head">
              <th> </th>
              {new Array(weeksShown)
                .fill(days)
                .flat()
                .map((day, index) => (
                  <th
                    id={
                      getDate(index - currentDay.getDay()) ==
                      getDate(0, new Date())
                        ? "current-day"
                        : ""
                    }
                    key={index}
                  >
                    {day} <br /> {getDate(index - currentDay.getDay())}
                  </th>
                ))}
            </tr>
            <HabitList
              habits={habits}
              onCellClick={onCellClick}
              week={getWeek(currentDay)}
              onDelete={onDelete}
              weeksShown={weeksShown}
            />
          </tbody>
        </table>
        <button className="scroll-right" onClick={() => scrollDate(7)}>
          &gt;
        </button>
      </div>
      <div>
        <i
          className="fas fa-undo center fa-lg"
          id={isUndoEnabled ? "" : "undo-disabled"}
          onClick={onUndo}
        ></i>
      </div>
    </div>
  );
};

export default Table;
