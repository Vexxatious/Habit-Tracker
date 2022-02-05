import React from "react";
import Habit from "./Habit";

const HabitList = ({ habits, onCellClick, week, onDelete, weeksShown }) => {
  return (
    <React.Fragment>
      {habits ? (
        habits.map((h) => (
          <Habit
            habit={h}
            key={h.key}
            onCellClick={onCellClick}
            week={week}
            onDelete={onDelete}
            weeksShown={weeksShown}
          />
        ))
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default HabitList;
