import { useState,useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import tsLogo from './assets/TS_logo.png';

//Components:
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import ModalContent from './components/ModalContent/ModalContent';
// Styles:
import './App.css';

function App(){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null); //??

  function openModal(){
    setIsModalOpen(true);
  }

  function closeModal(){
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
        <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="#" target="_self">
            <img src={tsLogo} className="logo ts" alt="TS logo" />
        </a>
    </div> <hr /><hr />
    

    <main>
        <div style={{padding:'30px'}}>  
            <Button ref={buttonRef} className="btn-example" onClick={openModal}>This "Button Elem."</Button>
            <Button as="a" href="https://example.com" title="Go there -->" target="_blank" className="btn-example" onClick={openModal}>Button as "LINK Elem."</Button>
            <Button as="div" className="btn-example" onClick={openModal}>Button as "DIV elem."</Button>
            <Button as="span" className="btn-example" onClick={openModal}>Button as "SPAN elem."</Button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <ModalContent />
            </Modal>
        </div>

        <div style={{ padding:'2rem'}}> 
            <h2>🔁 Ref Forwarding Test</h2>

            {/* Custom Button with ref */}
            <Button onClick={openModal}>I am focusable if U gime me "ref=/buttonRef/"</Button>
            <br /><br />
            {/* Another button to trigger focus */}
            <Button onClick={handleFocusClick}>Focus the Button Above</Button> 
        </div>
    </main>
    </>
) //return END
} //function App()
export default App
