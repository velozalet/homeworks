import { useForm } from "react-hook-form";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";

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

  const onSubmit = async (data: ContactFormData) => {
    try {
        //await addDoc(collection(db, "bookings"), { ...data,carId,make,model,year,mileage,price,createdAt:serverTimestamp(),status:"pending" });
        const docData = (mode === "booking")
            ? { ...data,carId,make,model,year,mileage,price,createdAt:serverTimestamp(),status:"pending" }
            : { ...data,createdAt:serverTimestamp(),status:"new-message" };
        await addDoc(collection(db, mode === "booking" ? "bookings" : "contacts"), docData);

        alert("✅ Booking submitted successfully!"); reset();
        }catch(err){
            console.error("Error saving booking:", err);
            alert("❌ Something went wrong. Try again later.");
        }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="row g-3">

        {/* Name */}
        <div className="col-12">
            <label className="form-label">Name</label>
            <input
            type="text"
            className="form-control"
            {...register("name", { required:"Name is required" })}
            />
            {errors.name && <small className="text-danger">{errors.name.message}</small>}
        </div>
        {/* Phone */}
        <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input
            type="tel"
            className="form-control"
            {...register("phone", mode === "booking" ? { required:"Phone is required" } : {} )}
            />
            {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
        </div>
        {/* Email */}
        <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
            type="email"
            className="form-control"
            {...register("email", { required:"Email is required" })}
            />
            {errors.email && <small className="text-danger">{errors.email.message}</small>}
        </div>
       {/*Preferred contact method (only in`booking`mode)*/}
       { mode === "booking" && (
        <div className="col-12">
            <label className="form-label">How would you prefer to be contacted?</label>
            <div className="form-check">
            <input
                type="checkbox"
                id="contactByEmail"
                className="form-check-input"
                {...register("contactByEmail")}
            />
            <label className="form-check-label" htmlFor="contactByEmail">Email</label>
            </div>
            <div className="form-check">
            <input
                type="checkbox"
                id="contactByPhone"
                className="form-check-input"
                {...register("contactByPhone")}
            />
            <label className="form-check-label" htmlFor="contactByPhone">Phone</label> 
            </div>
        </div>
        )}
        {/*Message (optional)*/}
        <div className="col-12">
            <label className="form-label">Message {mode === "contact" && "(required)"}</label>
            <textarea
                className="form-control"
                rows={5}
                {...register("message", mode === "contact" ? { required:"Message is required" } : {} )}
            ></textarea>
            {errors.message && <small className="text-danger">{errors.message.message}</small>}
        </div>
        {/*Submit*/}
        <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}> 
            {isSubmitting ? "Submitting..." : mode === "booking" ? "Book Now" : "Send Message"}
            </button>
        </div>
    </form>
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
