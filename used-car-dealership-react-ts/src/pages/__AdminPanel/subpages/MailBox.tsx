import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type {  RootState, AppDispatch } from "../../../store/store"; 
import { setContacts, setLoading } from "../../../store/contactSlice"; 
import { fetchContacts, updateContactStatus, deleteContact } from "../../../services/contactService"; 

import { formatDateFull } from "../../../utils/helpers";
import { formatDateMMDDYYYY } from "../../../utils/helpers";

function MailBox(){
    const dispatch = useDispatch();
    const allContacts = useSelector((state: RootState) => state.contacts.allContacts);
    const loading = useSelector((state: RootState) => state.contacts.loading);


    //1.Load All contacts from Firebase DB
    useEffect(() => {
        async function loadContacts() { 
          try {
            dispatch(setLoading(true)); //start loading...
            const contacts = await fetchContacts();
            dispatch(setContacts(contacts));
          }catch(error){
            console.error("Error loading contacts:", error); 
          }finally{
            dispatch(setLoading(false)); //stop loading...
          }
        }
        loadContacts();
    }, [dispatch]); //console.log(allContacts); 


    //2.Update status (`pending` → `answered`)
     const handleUpdateStatus = async (id:string) => { 
        try {
            await updateContactStatus(id, "answered"); //update in Firestore
            const updated = await fetchContacts();     //refresh state
            dispatch(setContacts(updated));
        }catch(error){ console.error("Error updating status:", error); }
    };

    //3.Delete mail
    const handleDelete = async (id: string) => {
        try {
            await deleteContact(id);
            const updated = await fetchContacts();
            dispatch(setContacts(updated));
        }catch(error){ console.error("Error deleting booking:", error); }
    };

    return(
    <div className="booking-car--page mt-4"> 
        <div className="container-lg"> 
            <div className="row"> 
                <h1 className="text-center">Mail-Box (Contact Us)</h1> 
                <hr />

                <div className="accordion booking-car--accordion" id="booking_car__accordion"> 
                    <div className="accordion-item">
                    {allContacts .slice().sort( //The latest bookings are first
                        (a,b) => {
                            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                            return dateB - dateA; 
                        }
                    ).map( (item, index, array) => ( 
                        <div key={index} className="accordion-item">
                            <h2 className="accordion-header" id={`booking_car_${index + 1}`}>
                                <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapseBookingCar_${index + 1}`}
                                    aria-expanded="true"
                                    aria-controls={`collapseBookingCar_${index + 1}`}
                                    >
                                        <strong className="me-3"> {index + 1}: </strong> {item.name} { (item.createdAt) ? formatDateMMDDYYYY(item.createdAt) : "" } 
                                        { (item.status === "new-message")
                                            ? <span className="ms-1 badge bg-primary">New</span>
                                            : <span className="ms-1 badge bg-secondary">Answered</span>
                                        }
                                </button>
                            </h2>
                            <div
                                id={`collapseBookingCar_${index + 1}`}  
                                className="accordion-collapse collapse"
                                aria-labelledby={`booking_car_${index + 1}`}
                                data-bs-parent="#booking_car__accordion"
                                >
                                    <div className="accordion-body">
                                        <ul className="list-group">
                                            <li className="list-group-item"><strong><em>{ (item.createdAt) ? formatDateFull(item.createdAt) : "" }</em></strong></li>  
                                            <li className="list-group-item"><strong>E-mail: </strong><a href={`mailto:${item.email}`}>{item.email}</a></li> 
                                            <li className="list-group-item"><strong>Name: </strong>{item.name}</li> 
                                            <li className="list-group-item"><strong>Phone: </strong><a href={`tel:${item.phone}`}>{item.phone}</a></li> 
                                            <li className="list-group-item mess"><strong>Message:  </strong>{item.message}</li> 
                                            <li className="list-group-item">
                                                <strong>Staus: </strong>
                                                <button 
                                                className="btn btn-secondary btn-sm ms-0"
                                                title="Change 🔄 the Status"
                                                onClick={ () => handleUpdateStatus(item.id) }
                                                >{ (item.status === "new-message") ? "New" : "Answered" }</button>  
                                                <button 
                                                className="btn btn-danger ms-2 btn-sm"
                                                title="Delete ❌ the Message"
                                                onClick={ () => handleDelete(item.id) }
                                                ><i className="fa fa-trash-o"></i></button>  
                                            </li>
                                        </ul>
                                    </div>
                            </div>
                        
                        </div>
                        ))} 

                    </div> {/*accordion-item*/}
                </div> {/*accordion*/}
            </div> {/*row*/}
        </div> {/*container*/}
    </div> //.booking-car--page
    ); 
}
export default MailBox;
