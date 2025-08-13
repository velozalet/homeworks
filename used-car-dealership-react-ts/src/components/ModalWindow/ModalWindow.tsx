import React from 'react'; 

import './ModalWindow.css';

type ModalWindowProps = {
    /**Bootstrap allows:
       `data-bs-keyboard` is our `keyboard` → true | false
        `data-bs-backdrop` is our `backdrop` → true | false | 'static' 
        
    `data-bs-keyboard` => FALSE - ESC key won’t close the modal | TRUE - ESC key will close the modal(default) 
    `data-bs-backdrop` => 
            "static" -Do NOT close the modal when clicking the backdrop
            TRUE - Allow closing the modal when clicking the backdrop(default)
            FALSE - No backdrop at all (ModalWindow appears without overlay)__________________*/
    id: string; //to control the ModalWindow
    title?: string;
    keyboard?: boolean; //default=TRUE --> allows `ESC` key to close ModalWindow
    backdrop?: boolean | 'static'; //default=TRUE --> allows clicking backdrop to close ModalWindow
    children: React.ReactNode;
};

const ModalWindow: React<ModalWindowProps> = ({
    id,
    title='Default Title of ModalWindow',
    keyboard = true,
    backdrop = true,
    children,
}) => {
    return (
    <section 
    className="modal fade" 
    id={id} 
    tabIndex={-1} 
    data-bs-backdrop={String(backdrop)}
    data-bs-keyboard={keyboard}> 
        <div className="modal-dialog modal-lg modal-dialog-centered"> {/*`modal-xl`,`modal-lg`,`modal-md`,`modal-sm`, `modal-fullscreen`*/}
            <div className="modal-content">
                <div className="modal-header bg-warning">
                    <h4 className="modal-title">{title}</h4>
                    <button 
                    type="button" 
                    className="btn-close" 
                    data-bs-dismiss="modal" 
                    aria-label="Close"
                    onClick={ (e) => {(e.target as HTMLButtonElement).blur();} }
                    ></button>
                </div>
                <div className="modal-body page--privacy-policy text-black">
                    {children}
                </div>
                <div className="modal-footer bg-light">
                    <button 
                    type="button" 
                    className="btn btn-sm btn-secondary" 
                    data-bs-dismiss="modal"
                    onClick={ (e) => {(e.target as HTMLButtonElement).blur();} }
                    >Close</button>
                </div>
            </div> {/*.modal-content*/} 
        </div> {/*.modal-dialog*/}
    </section> 
    );
};
export default ModalWindow;

