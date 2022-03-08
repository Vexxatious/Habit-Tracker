import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";

const Habit = ({ habit, week, onCellClick, onDelete, weeksShown, index }) => {
  function getWeeks() {
    var habitList = [];
    for (let i = 0; i < weeksShown; i++) {
      habitList = [...habitList, habit[week + i]];
    }
    return habitList.flat();
  }
  return (
    <Draggable
      key={index}
      draggableId={habit.key}
      index={index}
      className="tableDisplay"
    >
      {(provided) => (
        <tr {...provided.draggableProps} ref={provided.innerRef}>
          <td className="habit-name-cell">{habit.name}</td>
          {getWeeks().map((value, index) => (
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

          <td {...provided.dragHandleProps}>
            <form type="button" style={{ marginLeft: 10 + "px" }}>
              <i className="fas fa-arrows-alt-v"></i>
            </form>
          </td>
        </tr>
      )}
    </Draggable>
  );
};

export default Habit;
