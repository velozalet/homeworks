import React from 'react';
import tsLogo from '../../assets/TS_logo.png';

import './ModalContent.css';

function ModalContent() {
return (
    <div>
        <h2>Modal Title</h2>
        <p>
            <img src={tsLogo} className="logo ts" alt="TS logo" />
            This is the custom content from <code>`ModalContent`</code> component passed as <strong>children </strong> 
            into <code>`Modal`</code> component in main component <code>`App`</code> !
        </p>
    </div>
); //return END
} //function ModalContent() 
export default ModalContent; 