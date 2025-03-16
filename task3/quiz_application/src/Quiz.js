import React, { useState, useEffect, useCallback } from "react";
import Points from "./Points";
import "./App.css";

const API_URL = process.env.REACT_APP_API_URL;

function decodeEntities(str) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = str;
  return textArea.value;
}

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [present, setPresent] = useState(0);
  const [score, setScore] = useState(0);
  const [showAns, setShowAns] = useState(false);
  const [complete, setComplete] = useState(false);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const fetchQuestions = useCallback(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          const shuffle = data.results.map((quest) => ({
            ...quest,
            options: shuffleArray(
              [...quest.incorrect_answers, quest.correct_answer].map(decodeEntities)
            ),
            question: decodeEntities(quest.question),
          }));
          setQuestions(shuffle);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleClick = (opted) => {
    if (opted === questions[present].correct_answer) {
      setScore(score + 1);
    }
    if (present === questions.length - 1) {
      setComplete(true);
    }
    setShowAns(true);
  };

  const nextQuestion = () => {
    setPresent((prev) => prev + 1);
    setShowAns(false);
  };

  return (
    <>
      {present < questions.length && questions[present] ? (
        <div className="show">
          <h2>{questions[present].question}</h2>
          <div className="answer">
            {questions[present].options.map((answer) => (
              <button key={answer} onClick={() => handleClick(answer)}>
                {answer}
              </button>
            ))}
          </div>
          {showAns && <p className="display">The correct answer is {questions[present].correct_answer}</p>}
          <div className="continue">
            <button onClick={nextQuestion} disabled={!showAns}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <div>{complete && <Points score={score} />}</div>
      )}
    </>
  );
}

export default Quiz;
