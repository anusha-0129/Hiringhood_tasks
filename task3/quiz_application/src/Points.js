import React from "react";
import './App.css';
function Points(props) {
  const sty={
 fontSize:'5rem'
  }
  const sty1={
    fontSize:'3rem',
    padding:'2rem'
  }
  return (
    <>
      {props.score >= 5 ? (
        <div className="decalre">
          <h1 style={sty}>Congratulations !!!</h1>
          <p style={sty1}>You scored {props.score} points</p>
        </div>
      ) : (
        <div className="declare">
          <h1 style={sty}>Well tried !!</h1>
          <p style={sty1}>You scored {props.score} points</p>
        </div>
      )}
    </>
  );
}
export default Points;