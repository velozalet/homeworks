import { useState, useRef } from 'react';
import './ClickSpeedTest.css';

function ClickSpeedTest() {
  const [testDuration, setTestDuration] = useState<number>(5); ///Duration of the test in seconds. 
  const [timeLeft, setTimeLeft] = useState<number>(0); //Timer countdown(depending on `testDuration`)
  const [clickCount, setClickCount] = useState<number>(0); //Mouse click counting(what user sees)
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false); //Is game active? Flag(Boolean)
  const [highScore, setHighScore] = useState<number>(0);

  const clickCountRef = useRef<number>(0); //Real-time click counter (no re-render)
  const intervalRef = useRef<number | null>(null); //To store interval ID

  function handleStartTest(duration: number): void {
    let time: number = duration; //5

    setTimeLeft(time);  //Start countdown at 5 seconds
    setClickCount(0); //Reset state counter
    setIsGameStarted(true); //Enable "Click Me!" button
    clickCountRef.current = 0; //Reset ref counter

    //Clear previous interval if any
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    //Start countdown
    function countdownDuration(): void {
      time -= 1;
      setTimeLeft(time);

      if (time <= 0) {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
        }
        setIsGameStarted(false);

        //Update high score if needed - to show the highest score ever achieved.
        if (clickCountRef.current > highScore) {
            setHighScore(clickCountRef.current);
        }
      }
    }
    intervalRef.current = setInterval(countdownDuration, 1000);
  }

  function handleClickMe(): void {
    clickCountRef.current += 1; //update ref with NO re-render
    setClickCount(clickCountRef.current); //update UI
  }


	/*_____________________________________Bonus */
  function handleGetPrompt(): void {
    let promptDuration: number;
    while(true){
      const input: string | null = prompt("Please set test duration (seconds):", "5");

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
      <button
        className="set-test-duration--btn"
        onClick={handleGetPrompt}
        disabled={isGameStarted}
      >
        Set Test Duration 🔧
      </button>

      <p className="time-left-info">
        <code>⏳</code> Time Left: {timeLeft}s
      </p>
      <p className="clicks-info">
        <code>🖱️</code> Clicks: {clickCount}
      </p>

      <button
        className="start-test--btn"
        onClick={() => handleStartTest(testDuration)}
        disabled={isGameStarted}
      >Start Test</button>

      <button
        className="click-me--btn"
        onClick={handleClickMe}
        disabled={!isGameStarted}
        style={{ marginLeft: '10px' }}
      >Click Me!</button>

      {!isGameStarted && timeLeft === 0 && clickCount > 0 ? (
        <aside>
            <p className="final-score"><code>✅</code> Final Score: {clickCount} clicks</p>
            <p className="final-score high-score"><code>🏆</code> Highest Score: {highScore} clicks</p>  
        </aside>
      ) : null}
    </div>
  );
}
export default ClickSpeedTest;