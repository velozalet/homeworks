//Components:
import ContactForm from "../../components/ContactForm/ContactForm";
import PageBanner from "../../components/PageBanner/PageBanner"; 
//import HtmlContent from "../../components/HtmlContent/HtmlContent";

//Styles:
import './ContactUs.css';

//Images:
import contactus_page_bg from '../../assets/page-bg/page-bg-3.jpg';

function ContactUs(){

    return(
    <>
    <div className="contactus--page"> 

        <PageBanner url={contactus_page_bg} title="Contact Us" />  

        <div className="container-lg py-lg-4 py-md-4 py-sm-2 mb-xl-0 mb-lg-0 mb-sm-0 mb-4"> 
            <div className="row">
            <aside className="contact-form contact-form--carbooking contact-form--contactus col-lg-12 order-lg-4 order-md-4 order-sm-4 order-4 mt-5">
                    <h3 className="text-center">Contact Us</h3> 
                    <p className="text-center mb-xl-5 mb-lg-5 mb-md-4 mb-sm-5 mb-4">Got a question? Drop us a message – we’ll get back to you</p> 
                    <div className="wrapper wrapper-placeholder">
                        <ContactForm mode="contact" /> 
                    </div>
                </aside>
            </div>{/*.row*/} 
        </div>{/*.container*/} 
    </div> {/*.contactus--page*/} 

    </>
    ); 
}
export default ContactUs;