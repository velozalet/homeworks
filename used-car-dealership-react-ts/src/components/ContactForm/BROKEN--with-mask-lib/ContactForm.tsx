import { useForm,Controller } from "react-hook-form";
import InputMask from "react-input-mask";
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
  const { control } = useForm();

  const onSubmit = async (data: ContactFormData) => {
    try {
        //await addDoc(collection(db, "bookings"), { ...data,carId,make,model,year,mileage,price,createdAt:serverTimestamp(),status:"pending" });
        const docData = (mode === "booking")
            ? { ...data,carId,make,model,year,mileage,price,createdAt:serverTimestamp(),status:"pending" }
            : { ...data,createdAt:serverTimestamp(),status:"new-message" };
        await addDoc(collection(db, mode === "booking" ? "bookings" : "contacts"), docData);

        alert("✅ Form submitted successfully!"); reset();
        }catch(err){
            console.error("Error saving form data:", err);
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
            {...register("name", { 
                required:"Name is required",
                minLength: {value:2, message:"Name must be at least 2 characters"}
            })}
            />
            {errors.name && <small className="text-danger">{errors.name.message}</small>}
        </div>


        {/* Phone */}
        <div className="col-md-6">
            <label className="form-label">Phone</label>
            <Controller
                name="phone"
                control={control}
                rules={{
                    required: mode === "booking" ? "Phone is required" : false,
                    pattern: {
                        value: /^\+1\s\d{3}\s\d{3}\s\d{4}$/,
                        message: "Phone must be in format +1 000 000 0000"
                    }
                }} 
                render={({ field }) => (
                    <InputMask
                        {...field}
                        mask="+1 999 999 9999"
                        maskChar=" "
                        className="form-control"
                        placeholder="+1 000 000 0000"
                        type="tel"
                    />
                )}
            />
            {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
        </div>


        {/* Email */}
        <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
            type="email"
            className="form-control"
            {...register("email", { 
                required:"Email is required",
                pattern:{ value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message:"Enter a valid email (example@mail.com)" }
            })}
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
        {/*Message*/}
        <div className="col-12">
            <label className="form-label">Message {mode === "contact" && "(required)"}</label>
            <textarea
                className="form-control"
                rows={5}
                {...register("message", 
                (mode === "contact") ? { 
                    required:"Message is required",
                    maxLength:{ value: 250, message: "Message cannot exceed 250 characters" }
                } : {
                    maxLength:{ value: 250, message: "Message cannot exceed 250 characters" }
                })}
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
