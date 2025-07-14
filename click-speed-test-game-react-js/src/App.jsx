//import React from 'react';
import { useState } from 'react';
//import { useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import jsLogo from './assets/JS_logo.png';
//Components:
import ClickSpeedTest from './components/ClickSpeedTest/ClickSpeedTest';
//Styles:
import './App.css';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 className="js-is-power">JS is power!</h1>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <a href="#" target="_self">
            <img src={jsLogo} className="logo js" alt="JS logo" />
          </a>
      </div>
      <hr /><hr />

      <main> 
          <ClickSpeedTest />
      </main>
    </>
  )
}
export default App
