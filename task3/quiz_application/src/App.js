import React, { useState } from "react";
import Quiz from "./Quiz";
import './App.css';

function App() {
  const [begin, setBegin] = useState(false);
  function initiate() {
    setBegin(true);
  }
  return (
    <div className="container">
      {begin ? (
        <Quiz />
      ) : (
        <div  className="box">
          <h1>Hello Quizzer</h1>
          <p>Ready to play quiz</p>
          <button onClick={initiate}>Start</button>
        </div>
      )}
    </div>
  );
      }
export default App
   
