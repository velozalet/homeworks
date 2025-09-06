import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type {  RootState, AppDispatch } from "../../../store/store"; 
import { setBookings, setLoading } from "../../../store/bookingSlice";
import { fetchBookings, updateBookingStatus, deleteBooking } from "../../../services/bookingService";

import { formatDateFull } from "../../../utils/helpers";
import { formatDateMMDDYYYY } from "../../../utils/helpers";

function BookingCar(){
    const dispatch = useDispatch();
    const allBookings = useSelector((state: RootState) => state.bookings.allBookings);
    const loading = useSelector((state: RootState) => state.bookings.loading);


    //1.Load All bookings from Firebase DB 
    useEffect(() => {
        async function loadBookings() { 
          try {
            dispatch(setLoading(true)); //start loading...
            const bookings = await fetchBookings();
            dispatch(setBookings(bookings));
          }catch(error){
            console.error("Error loading bookings:", error); 
          }finally{
            dispatch(setLoading(false)); //stop loading...
          }
        }
        loadBookings();
    }, [dispatch]); //console.log(allBookings);

     //2.Update status (`pending` → `answered`)
    const handleUpdateStatus = async (id:string) => {
        try {
            await updateBookingStatus(id, "answered"); //update in Firestore
            const updated = await fetchBookings();     //refresh state
            dispatch(setBookings(updated));
        }catch(error){ console.error("Error updating status:", error); }
    };

    //3.Update status (`pending` → `answered`)
    const handleDelete = async (id: string) => {
        try {
            await deleteBooking(id);
            const updated = await fetchBookings();
            dispatch(setBookings(updated));
        }catch(error){ console.error("Error deleting booking:", error); }
    };


    return(
    <div className="booking-car--page mt-4"> 
        <div className="container-lg"> 
            <div className="row"> 
                <h1 className="text-center">Car Booking</h1>
                <hr />

                <div className="accordion booking-car--accordion" id="booking_car__accordion"> 
                    <div className="accordion-item">
                    {allBookings .slice().sort( //The latest bookings are first
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
                                        <strong className="me-3">{index + 1}: </strong> {item.name} { (item.createdAt) ? formatDateMMDDYYYY(item.createdAt) : "" } 
                                        { (item.status === "pending")
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
                                            <li className="list-group-item"><strong>E-mail: </strong> <a href={`mailto:${item.email}`}>{item.email}</a></li> 
                                            <li className="list-group-item"><strong>Name: </strong>{item.name}</li> 
                                            <li className="list-group-item"><strong>Phone: </strong><a href={`tel:${item.phone}`}>{item.phone}</a></li>
                                            <li className="list-group-item"><strong>Contact Preference: </strong>
                                                { (item.contactByEmail) ? <i className="fa fa-envelope ms-1 me-3" style={{fontSize:"1.4rem",color:"#ffc107"}}></i> : "" } 
                                                { (item.contactByPhone) ? <i className="fa fa-volume-control-phone" style={{fontSize:"1.4rem",color:"#ffc107"}}></i>: "" }
                                            </li> 
                                            <li className="list-group-item mess"><strong>Message:  </strong>{item.message}</li> 
                                            <br />
                                            <li className="list-group-item car"><strong className="veich fs-4"><em>{item.make} {item.model}, {item.year}</em></strong></li> 
                                            <li className="list-group-item"><strong>Mileage(km): </strong>{item.mileage}</li> 
                                            <li className="list-group-item"><strong>VIN: </strong>{item.vin}</li>
                                            <li className="list-group-item"><strong>Price($): </strong>{item.price}</li> 
                                            <li className="list-group-item">
                                                <strong>Staus: </strong>
                                                <button 
                                                className="btn btn-secondary btn-sm ms-0"
                                                title="Change 🔄 the Status"
                                                onClick={ () => handleUpdateStatus(item.id) }
                                                >{ (item.status === "pending") ? "Pending" : "Answered" }</button>  
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
export default BookingCar;