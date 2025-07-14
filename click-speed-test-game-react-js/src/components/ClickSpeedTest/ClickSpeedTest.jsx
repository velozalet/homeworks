//import React from 'react';
//import { useState } from 'react';
import { useState, useRef, useEffect } from 'react';
import './ClickSpeedTest.css';

function ClickSpeedTest(){
    const [testDuration, setTestDuration] = useState(5); //Duration of the test in seconds. 
    const [timeLeft, setTimeLeft] = useState(0); //Timer countdown(depending on `testDuration`)
    const [clickCount, setClickCount] = useState(0); //Mouse click counting(what user sees)
    const [IsGameStarted, setIsGameStarted] = useState(false); //Is game active? Flag(Boolean)
    const [highScore, setHighScore] = useState(0); //To show the highest score ever achieved.
  
    
    const clickCountRef = useRef(0); //Real-time click counter (no re-render)
    const intervalRef = useRef(null); //To store interval ID
          
    function handleStartTest(duration) { 
      let time = duration; //5
    
      setTimeLeft(time); //Start countdown at 5 seconds
      setClickCount(0); //Reset state counter
      setIsGameStarted(true); //Enable "Click Me!" button
      clickCountRef.current = 0; //Reset ref counter
              
      //Clear previous interval if any
      if( intervalRef.current !== null ){
        clearInterval(intervalRef.current);
      }

      //Start countdown
      function countdownDuration(){
        time -= 1; //OR: time = time - 1;
        setTimeLeft(time);
    
        if(time <= 0){
          clearInterval(intervalRef.current);
          setIsGameStarted(false);

            //Update high score if needed - to show the highest score ever achieved.
            if (clickCountRef.current > highScore) {
                setHighScore(clickCountRef.current);
            }
        }
      }
      intervalRef.current = setInterval(countdownDuration, 1000);
    }
    
    function handleClickMe(){
      clickCountRef.current += 1; //update ref with NO re-render
      setClickCount(clickCountRef.current); //update UI
    }

	/*_____________________________________Bonus */
	function handleGetPrompt(){
        let promptDuration;
        while(true){
          let input = prompt("Please set test duration (seconds):", 5);

          //Cancel button returns null → break or set default
          if(input === null){
            promptDuration = 5;
            break;
          }
          //Convert to number
          promptDuration = Number(input);

          //Check if it's a number
          if (!Number.isNaN(promptDuration)) { break; }
        } //console.log(promptDuration);
        setTestDuration(promptDuration);
	}
  
    return (
      <div>
        <h1>Click Speed Test</h1>
        <button className="set-test-duration--btn"
		onClick={handleGetPrompt}
          disabled={IsGameStarted}
        >Set Test Duration 🔧</button> 
  
        <p className="time-left-info"> <code>⏳</code> Time Left: {timeLeft}s</p>
        <p className="clicks-info"> <code>🖱️</code> Clicks: {clickCount}</p>
  
        <button className="start-test--btn"
          onClick={() => handleStartTest(testDuration)}
          disabled={IsGameStarted}
        >Start Test</button>
  
        <button className="click-me--btn"
          onClick={handleClickMe}
          disabled={!IsGameStarted}
          style={{ marginLeft:'10px'}}
        >Click Me!</button>
  
        {!IsGameStarted && timeLeft === 0 && clickCount > 0 ? (
        <aside>
            <p className="final-score"> <code>✅</code> Final Score: {clickCount} clicks</p>
            <p className="final-score high-score"><code>🏆</code> Highest Score: {highScore} clicks</p>
        </aside>
            ) : null}
      </div>
    );
}
export default ClickSpeedTest;