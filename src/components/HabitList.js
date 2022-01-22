import React from "react";
import Habit from "./Habit";

const HabitList = ({ habits, onCellClick, week, onDelete }) => {
  return (
    <React.Fragment>
      {habits.map((habit) => (
        <Habit
          name={habit.name}
          tracker={habit.tracker}
          key={habit.key}
          onCellClick={onCellClick}
          week={week}
          onDelete={onDelete}
        />
      ))}
    </React.Fragment>
  );
};

export default HabitList;
