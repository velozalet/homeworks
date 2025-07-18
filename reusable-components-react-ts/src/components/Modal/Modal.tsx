import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

function Modal(props: ModalProps){
   //Close modal when "Escape" key is pressed
    useEffect(() => {
      function handleEscapeKey(e: KeyboardEvent){
        if( e.key === 'Escape'){ props.onClose(); }
      }
      document.addEventListener('keydown', handleEscapeKey); 
 
      return () => { //--> unmounts: cleans up listener
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }, [props.isOpen, props.onClose]); 

    //Create portal root (you must have <div id="modal-root"></div> in index.html)
    const modalRoot = document.getElementById('modal-root');
    if( !modalRoot ) { return null; }

    //If modal not open, don’t render anything
    if( !props.isOpen ){ return null; } 
  
    return ReactDOM.createPortal(
      <div className="modal-backdrop" onClick={props.onClose}>
        <div
          className="modal-content"
          style={{width:'575px',height:'230px'}}
          onClick={(e) => e.stopPropagation()} //prevent close when clicking inside modal
        >{props.children}
            <button 
            style={{position:'absolute',bottom:'10px',right:'10px',backgroundColor:'red',color:'white'}}
            className="modal-close"
            onClick={props.onClose} 
            >Close</button>
        </div>
      </div>,
      modalRoot
    ); //return END
  }  //function Modal()
export default Modal; 
