import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";
import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import SignIn from "./components/SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import SignOut from "./components/SignOut";
import { disableNetwork, doc } from "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDEMAFLn5R4ATMtMe0a3GTrzP2cM2gXGmk",
  authDomain: "habit-tracker-d0509.firebaseapp.com",
  projectId: "habit-tracker-d0509",
  storageBucket: "habit-tracker-d0509.appspot.com",
  messagingSenderId: "246770081392",
  appId: "1:246770081392:web:fce8813be2797da41b1eb5",
  measurementId: "G-TJY51B5W6F",
});

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [user] = useAuthState(auth);
  const [inputText, setInputText] = useState("");
  const [currentDay, setCurrentDay] = useState(getFirstSunday());
  const [deletedHabits, setDeletedHabits] = useState([]);
  const [isUndoEnabled, setUndoEnabled] = useState(false);
  const [habits, setHabits] = useState([]);
  const [weeksShown, setWeeksShown] = useState(3);

  function onSubmit(e) {
    e.preventDefault();
    addHabit(inputText);
    setInputText("");
    document.getElementById("habit-input").value = "";
  }

  function onWeekSelect(e) {
    db.collection(user.uid).doc("settings").update({ weeks: e.target.value });
    setWeeksShown(Number(e.target.value));
  }

  function createNewTracker() {
    let tracker = [];
    for (var i = 0; i < 52; i++) {
      tracker[i] = [0, 0, 0, 0, 0, 0, 0];
    }
    return tracker;
  }

  function getFirstSunday() {
    var td = new Date();
    var y = td.getFullYear();
    var m = td.getMonth();
    var FirstDay = new Date(y, m, 1);
    while (FirstDay.getDay() != 0) FirstDay.setDate(FirstDay.getDate() - 1);

    return FirstDay;
  }

  function getDate(offset, startDay = currentDay) {
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
    let date = new Date(startDay.valueOf());
    date.setDate(date.getDate() + offset);
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, "0");
    return month + "\n" + day;
  }

  function addHabit(name) {
    let newHabits = [...habits];
    let newHabit = {
      name: name,
    };
    createNewTracker().map((tracker, index) => (newHabit[index] = tracker));
    newHabits.push(newHabit);
    db.collection(user.uid).add(newHabit);

    setHabits(newHabits);
  }

  function scrollDate(i) {
    let newDate = new Date(currentDay.valueOf());
    newDate.setDate(newDate.getDate() + i);
    if (getWeek(newDate) > 0) setCurrentDay(newDate);
  }

  function onCellClick(habit, index) {
    let newHabits = [...habits];
    let week = getWeek(currentDay);

    let weekOffset = Math.floor(index / 7);
    let day = index % 7;
    for (var i in newHabits) {
      if (newHabits[i].name === habit.name) {
        newHabits[i][week + weekOffset][day] =
          (newHabits[i][week + weekOffset][day] + 1) % 4;
        db.collection(user.uid)
          .doc(habit.key)
          .update({ [week + weekOffset]: newHabits[i][week + weekOffset] });
        break;
      }
    }

    setHabits(newHabits);
  }

  function onUndo() {
    if (!isUndoEnabled) return;
    let newHabits = [...habits];
    let newDeletedHabits = [...deletedHabits];

    let undodHabit = newDeletedHabits.pop();
    newHabits.push(undodHabit);
    delete undodHabit["key"];
    db.collection(user.uid).add(undodHabit);
    if (newDeletedHabits.length == 0) setUndoEnabled(false);

    setHabits(newHabits);
    setDeletedHabits(newDeletedHabits);
  }

  useEffect(() => {
    if (!user) return;
    var settings = null;
    db.collection(user.uid).onSnapshot((snapshot) => {
      let newHabits = snapshot.docs.map((doc) => ({
        key: doc.id,
        ...doc.data(),
      }));

      settings = newHabits.find((habit) => habit.key == "settings");
      if (settings) {
        setWeeksShown(Number(settings.weeks));
      } else {
        db.collection(user.uid).doc("settings").set({ weeks: 1 });
      }
      newHabits = newHabits.filter((habit) => habit.key != "settings");
      setHabits(newHabits);
    });
  }, [user]);

  function getWeek(date) {
    var onejan = new Date(date.getFullYear(), 0, 1);
    var millisecsInDay = 86400000;
    return (
      Math.floor(((date - onejan) / millisecsInDay + onejan.getDay()) / 7) - 1
    );
  }

  function onDelete(habit) {
    let newHabits = [...habits];
    let newDeletedHabits = [...deletedHabits];
    for (var i in newHabits) {
      if (newHabits[i].name === habit.name) {
        newDeletedHabits.push(newHabits[i]);
        newHabits.splice(i, 1);
        break;
      }
    }
    db.collection(user.uid).doc(habit.key).delete();

    setHabits(newHabits);
    setDeletedHabits(newDeletedHabits);
    setUndoEnabled(true);
  }
  return (
    <div>
      <header>
        <h1>Simple Habit Tracker</h1>
      </header>
      <section>
        {user ? (
          <div>
            <div className="flex">
              <Form
                onSubmit={onSubmit}
                setInputText={setInputText}
                onWeekSelect={onWeekSelect}
                shownWeeks={weeksShown}
              />
            </div>
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
              weeksShown={weeksShown}
            />
            <SignOut auth={auth} />
          </div>
        ) : (
          <div className="flex">
            <SignIn auth={auth} />
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
