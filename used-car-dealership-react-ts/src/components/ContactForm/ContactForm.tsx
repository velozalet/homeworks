import { useState } from "react";
import { useForm } from "react-hook-form";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";

//Components:
import MaskedInput from "../../components/MaskedInput/MaskedInput";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

//Styles:
import './ContactForm.css';
//Images:

interface ContactFormProps {
    mode: "booking" | "contact"; //reusable: `booking`(for booking car) or `contact`(simple form for Contact Form)
    carId?: string;
    make?: string;
    model?: string;
    year?: number;
    mileage?: number;
    price?: number;
}
interface ContactFormData { 
    name: string;
    phone?: string;
    email: string;
    contactByEmail?: boolean;
    contactByPhone?: boolean;
    message?: string; //optional field
}

const ContactForm = ( {mode,carId,make,model,year,mileage,price}: ContactFormProps ) => {
  const { register,handleSubmit,reset, formState:{errors,isSubmitting} } = useForm<ContactFormData>();

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const triggerSnackbar = (msg: string) => {
    setSnackbarMessage(msg);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 5000); //5000
  };

  const onSubmit = async (data: ContactFormData) => {
    try {
        //await addDoc(collection(db, "bookings"), { ...data,carId,make,model,year,mileage,price,createdAt:serverTimestamp(),status:"pending" });
        const docData = (mode === "booking")
            ? { ...data,carId,make,model,year,mileage,price,createdAt:serverTimestamp(),status:"pending" }
            : { ...data,createdAt:serverTimestamp(),status:"new-message" };
        await addDoc(collection(db, mode === "booking" ? "bookings" : "contacts"), docData);
        triggerSnackbar("✅ Form submitted successfully!"); reset(); // alert("✅ Form submitted successfully!");
        }catch(err){
            triggerSnackbar("❌ Something went wrong. Try again later."); //alert("❌ Something went wrong. Try again later.");
            console.error("Error saving form data:", err);
        }
  };

  return(
    <>
    <form onSubmit={handleSubmit(onSubmit)} id="booking_form" className="row g-3 form booking-form">
        {/* Name */}
        <div className="col-md-6 form-group">
            <input
            id="name"
            type="text"
            className="form-control"
            placeholder=" "
            {...register("name", { 
                required:"Name is required",
                minLength: {value:2, message:"Name must be at least 2 characters"}
            })}
            />
            <label htmlFor="name" className="form-label">Name</label>
            {errors.name && <small className="text-danger">{errors.name.message}</small>}
        </div>
        {/* Phone */}
        <div className="col-md-6 form-group">
        <MaskedInput
            id="phone"
            type="tel"
            className="form-control"
            placeholder=" "
            mask="+1 999 999 9999"
            {...register("phone", 
                mode === "booking" ? { 
                required: "Phone is required",
                pattern: { 
                    value: /^\+1\s\d{3}\s\d{3}\s\d{4}$/, 
                    message: "Phone must be in format +1 000 000 0000" 
                }
                } : { pattern: { value: /^\+1\s\d{3}\s\d{3}\s\d{4}$/, message: "Phone must be in format +1 000 000 0000" } }
            )}
        />
            <label htmlFor="phone" className="form-label">Phone</label>
            {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
        </div>
        {/* Email */}
        <div className="col-md-6 form-group">
            <input
            id="email"
            type="email"
            className="form-control"
            placeholder=" "
            {...register("email", { 
                required:"Email is required",
                pattern:{ value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message:"Enter a valid email (example@mail.com)" }
            })}
            />
            <label htmlFor="email" className="form-label">Email</label>
            {errors.email && <small className="text-danger">{errors.email.message}</small>}
        </div>
       {/*Preferred contact method (only in`booking`mode)*/}
       { mode === "booking" && (
        <div className="col-md-6 form-group contact-preference">
            <label className="form-label form-label--flow">Contact preference:</label>
            <div className="form-check pe-4">
                <label className="switch">
                    <input 
                        type="checkbox"
                        id="contactByEmail"
                        className="form-check-input"
                        {...register("contactByEmail")}
                    /> 
                    <div className="slider"></div>
                </label>
                <label className="form-label form-label--email ps-1"><i className="fa fa-envelope"></i></label>
            </div>
            <div className="form-check">
                <label className="switch">
                    <input 
                        type="checkbox"
                        id="contactByPhone"
                        className="form-check-input"
                        {...register("contactByPhone")}
                    /> 
                    <div className="slider"></div>
                </label>
                <label className="form-label form-label--phone ps-1"><i className="fa fa-volume-control-phone"></i></label>
            </div>
        </div>
        )}
        {/*Message*/}
        <div className="col-12 form-group">
            <textarea
                id="message"
                className="form-control"
                placeholder=" " 
                rows={2} 
                {...register("message", 
                (mode === "contact") ? { 
                    required:"Message is required",
                    maxLength:{ value: 250, message: "Message cannot exceed 250 characters" }
                } : {
                    maxLength:{ value: 250, message: "Message cannot exceed 250 characters" }
                })}
            ></textarea>
             <label htmlFor="message" className="form-label">Message {mode === "contact" && "(required)"}</label>
            {errors.message && <small className="text-danger">{errors.message.message}</small>}
        </div>
        {/*Submit*/}
        <div className="col-12 text-center">
            <button type="submit" className="btn btn-warning btn-lg" disabled={isSubmitting}> 
                {isSubmitting ? "Submitting..." : mode === "booking" ? "Book Now" : "Send Message"}
            </button>
        </div>
    </form>
    {/*Snackbar*/}
    <div id="snackbar" className={showSnackbar ? "_show_" : ""}>{snackbarMessage}</div>
    {/*Snackbar*/}
    </>
  );
};
export default ContactForm; 
/* Use it:
    <ContactForm
        mode="booking" carId={car.id} make={car.make} model={car.model} year={car.year} mileage={car.mileage} price={car.price}
    />
    and
    <ContactForm mode="contact" />
*/
