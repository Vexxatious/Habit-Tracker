import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";
import React, { useState, useEffect } from "react";

function App() {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [inputText, setInputText] = useState("");
  const [currentDay, setCurrentDay] = useState(new Date());
  const [deletedHabits, setDeletedHabits] = useState([]);
  const [isUndoEnabled, setUndoEnabled] = useState(false);
  const [habits, setHabits] = useState(
    localStorage.getItem("habits")
      ? JSON.parse(localStorage.getItem("habits"))
      : [{ name: "Gym", tracker: createNewTracker(), key: 0 }]
  );

  function onSubmit(e) {
    e.preventDefault();
    addHabit(inputText);
    setInputText("");
    document.getElementById("habit-input").value = "";
  }

  function createNewTracker() {
    let tracker = [];
    for (var i = 0; i < 52; i++) {
      tracker[i] = [0, 0, 0, 0, 0, 0, 0];
    }
    return tracker;
  }
  function getDate(offset) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let date = new Date(currentDay.valueOf());
    date.setDate(date.getDate() + offset);
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, "0");
    return month + "\n" + day;
  }

  function addHabit(name) {
    let newHabits = [
      ...habits,
      { name: name, tracker: createNewTracker(), key: habits.length },
    ];
    setHabits(newHabits);
    return habits[name];
  }

  function scrollDate(i) {
    let newDate = new Date(currentDay.valueOf());
    newDate.setDate(newDate.getDate() + i);
    if (getWeek(newDate) > 0) setCurrentDay(newDate);
  }

  function onCellClick(name, index) {
    let newHabits = [...habits];
    let week = getWeek(currentDay);

    for (var i in newHabits) {
      if (newHabits[i].name === name) {
        newHabits[i].tracker[week][index] =
          (newHabits[i].tracker[week][index] + 1) % 4;

        break;
      }
    }

    setHabits(newHabits);
  }

  function onUndo() {
    if (!isUndoEnabled) return;
    let newHabits = [...habits];
    let newDeletedHabits = [...deletedHabits];

    newHabits.push(newDeletedHabits.pop());
    if (newDeletedHabits.length == 0) setUndoEnabled(false);

    setHabits(newHabits);
    setDeletedHabits(newDeletedHabits);
  }

  const saveLocalHabits = () => {
    localStorage.setItem("habits", JSON.stringify(habits));
  };

  useEffect(() => {
    saveLocalHabits();
  }, [habits]);

  function getWeek(date) {
    var onejan = new Date(date.getFullYear(), 0, 1);
    var millisecsInDay = 86400000;
    return (
      Math.floor(((date - onejan) / millisecsInDay + onejan.getDay()) / 7) - 1
    );
  }

  function onDelete(name) {
    let newHabits = [...habits];
    let newDeletedHabits = [...deletedHabits];
    for (var i in newHabits) {
      if (newHabits[i].name === name) {
        newDeletedHabits.push(newHabits[i]);
        newHabits.splice(i, 1);
        break;
      }
    }
    setDeletedHabits(newDeletedHabits);
    setHabits(newHabits);
    setUndoEnabled(true);
  }
  return (
    <div>
      <header>
        <h1>Simple Habit Tracker</h1>
      </header>
      <Form onSubmit={onSubmit} setInputText={setInputText} />
      <Table
        scrollDate={scrollDate}
        currentDay={currentDay}
        days={days}
        getDate={getDate}
        habits={habits}
        onCellClick={onCellClick}
        getWeek={getWeek}
        onDelete={onDelete}
        isUndoEnabled={isUndoEnabled}
        onUndo={onUndo}
      />
    </div>
  );
}

export default App;
