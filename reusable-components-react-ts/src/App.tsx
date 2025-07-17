import { useState,useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import jsLogo from './assets/JS_logo.png';

//Components:
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
// Styles:
import './App.css';

function App(){
  //const [count, setCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleFocusClick() {
    if( buttonRef.current ){
      buttonRef.current.focus(); //Focus the custom Button
    }
  }


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
        <h1>React + TypeScript: Reusable Modal & Button System</h1>

        <div style={{padding:'30px'}}>
            <Button ref={buttonRef} onClick={openModal}>This "Button Elem."</Button>
            <Button as="a" href="https://example.com" onClick={openModal}>Button as "LINK Elem."</Button>
            <Button as="div" onClick={openModal}>Button as "DIV elem."</Button>
            <Button as="span" onClick={openModal}>Button as "SPAN elem."</Button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <p>This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.</p>
            </Modal>
        </div>

        <div style={{ padding: '2rem' }}> 
            <h2>🔁 Ref Forwarding Test</h2>

            {/* Custom Button with ref */}
            <Button onClick={openModal}>I am focusable if U gime me "ref=/buttonRef/"</Button>
            <br /><br />
            {/* Another button to trigger focus */}
            <button onClick={handleFocusClick}>Focus the Button Above</button> 
        </div>
    </main>
    </>
) //return END
} //function App()
export default App
