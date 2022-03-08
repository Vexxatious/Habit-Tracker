import React, { useState, useEffect } from "react";
import HabitList from "./HabitList";

import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
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
  onDragEnd,
}) => {
  return (
    <div>
      <div className="flex">
        <button className="scroll-left" onClick={() => scrollDate(-7)}>
          &lt;
        </button>

        <DragDropContext onDragEnd={(e) => onDragEnd(e)}>
          <Droppable droppableId="habitDrag">
            {(provided) => (
              <table className="habit-table">
                <thead>
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
                </thead>
                <tbody {...provided.droppableProps} ref={provided.innerRef}>
                  <HabitList
                    habits={habits}
                    onCellClick={onCellClick}
                    week={getWeek(currentDay)}
                    onDelete={onDelete}
                    weeksShown={weeksShown}
                  ></HabitList>

                  {provided.placeholder}
                </tbody>
              </table>
            )}
          </Droppable>
        </DragDropContext>
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
