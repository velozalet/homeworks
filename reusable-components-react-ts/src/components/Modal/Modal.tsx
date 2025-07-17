import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';

import './Modal.css';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  };


function Modal(props: ModalProps){
    useEffect(() => {
      function handleEscapeKey(e: KeyboardEvent){
        if( e.key === 'Escape') {
          props.onClose();
        }
      }
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }, [props]);

    //If modal not open, don’t render anything
    if (!props.isOpen) return null;
  
    return ReactDOM.createPortal(
      <div className="modal-backdrop" onClick={props.onClose}>
        <div
          className="modal-content"
          style={{ width: '660px', height: '300px' }}
          onClick={(e) => e.stopPropagation()} //prevent close when clicking inside modal
        >
          {props.children}
          <button 
            style={{ position:'absolute',bottom:'10px',right:'10px',backgroundColor:'red',color:'white' }}
            className="modal-close"
            onClick={props.onClose} 
          >Close</button>
        </div>
      </div>,
      document.getElementById('modal-root')!
    ); //return END
  }  //function Modal()
export default Modal;
