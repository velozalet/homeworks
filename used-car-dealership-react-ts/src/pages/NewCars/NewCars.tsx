//Components:
import PageBanner from "../../components/PageBanner/PageBanner"; 
import SliderCarousel from '../../components/SliderCarousel/SliderCarousel'; 
import SliderCarouselTestimonialsContent from '../../components/SliderCarouselTestimonialsContent/SliderCarouselTestimonialsContent';
//import HtmlContent from "../../components/HtmlContent/HtmlContent";

//Styles:
import './NewCars.css';

//Images:
import newcars_page_bg from '../../assets/page-bg/page-bg-1.jpg';

function NewCars(){

    return(
    <>
    <div className="newcars--page">  

        <PageBanner url={newcars_page_bg} title="New Cars" />   

        <div className="container-lg py-lg-4 py-md-4 py-sm-2 mb-xl-0 mb-lg-0 mb-sm-0 mb-4"> 
            <div className="row">
                <p className="text-black">content ..... </p> <a href="https://www.murraymaplecreek.ca/" target="_blank">content from here...</a>
                <br /><br /><hr />
                        {/* Testimonials Section - Slider*/} 
        <section className="pb-0 pt-lg-5 pt-md-5 pt-sm-5 pt-4 bg-dark">
            <div className="container-lg">
                <h2 className="text-center text-warning mb-0">What Our Clients Say</h2>
                <div className="row g-4">
                    <SliderCarousel id={"slider_testimonials"} interval={6000}  autoloop={true} effect_name="simply-carousel">
                        <SliderCarouselTestimonialsContent />
                    </SliderCarousel> 
                </div> {/*.row*/} 
            </div> {/*.container*/} 
        </section>
        {/*__/Testimonials Section - Slider*/}
                <img src="https://static.foxdealer.com/assets/A/N/compressed/300x300_ANLk9.png" style={{width:'300px',height:'quto'}} alt="" />
                SHEVROLET:
                https://static.foxdealer.com/assets/Q/W/compressed/300x300_QWBwZ.png -- Cruze
                https://static.foxdealer.com/assets/N/L/compressed/300x300_NLjpp.png -- Blazer
                https://static.foxdealer.com/assets/k/8/compressed/300x300_k8w65.png -- Camaro
                https://static.foxdealer.com/assets/1/W/compressed/300x300_1WolZ.png -- Colorado
                https://static.foxdealer.com/assets/A/N/compressed/300x300_ANLk9.png -- Equinox
                https://static.foxdealer.com/assets/P/7/compressed/300x300_P7lrW.png -- Blazer
                https://static.foxdealer.com/assets/n/x/compressed/300x300_nx9WR.png -- Traverse
                https://static.foxdealer.com/assets/D/R/compressed/300x300_DRYMA.png -- Impala
                https://static.foxdealer.com/assets/w/V/compressed/300x300_wVxZw.png -- Malibu
                https://static.foxdealer.com/assets/0/Y/compressed/300x300_0YrM5.png -- Silverado 1500
                https://static.foxdealer.com/assets/N/k/compressed/300x300_NkPg2.png -- Silverado 1500 LD
                https://static.foxdealer.com/assets/v/l/compressed/300x300_vlpz0.png -- Silverado 2500 HD
                https://static.foxdealer.com/assets/Y/W/compressed/300x300_YWMqO.png -- Silverado 3500 HD
                https://static.foxdealer.com/assets/Z/Y/compressed/300x300_ZYx42.png -- Tahoe 
                https://static.foxdealer.com/assets/Y/W/compressed/300x300_YW9DK.png -- Trax
                https://static.foxdealer.com/assets/o/Q/compressed/300x300_oQK6A.png -- Spark
                https://static.foxdealer.com/assets/j/Z/compressed/300x300_jZJjz.png -- Trailblazer
                https://static.foxdealer.com/assets/Y/W/compressed/300x300_YWJx0.png -- Blazer EV

                BUICK:
                https://static.foxdealer.com/assets/D/1/compressed/300x300_D1llA.png -- Enclave
                https://static.foxdealer.com/assets/j/q/compressed/300x300_jqD6v.png -- Encore
                https://static.foxdealer.com/assets/x/n/compressed/300x300_xnrGr.png -- Envision
                https://static.foxdealer.com/assets/X/D/compressed/300x300_XDRyA.png -- Regal Sportback

                GMC:
                https://static.foxdealer.com/assets/Z/Y/compressed/300x300_ZYE2v.png -- Acadia
                https://static.foxdealer.com/assets/7/1/compressed/300x300_71xQr.png -- Canyon
                https://static.foxdealer.com/assets/y/o/compressed/300x300_yo40W.png -- Sierra 1500
                https://static.foxdealer.com/assets/1/W/compressed/300x300_1Wk50.png -- Sierra 2500 HD 
                https://static.foxdealer.com/assets/O/M/compressed/300x300_OMvYE.png -- Terrain
                https://static.foxdealer.com/assets/G/v/compressed/300x300_Gv7JQ.png -- Yukon
                https://static.foxdealer.com/assets/N/L/compressed/300x300_NLg88.png --  Yukon XL
                https://static.foxdealer.com/assets/M/Q/compressed/300x300_MQrEA.png -- Sierra 3500 hd

            </div>{/*.row*/} 
        </div>{/*.container*/} 
    </div> {/*.newcars--page*/} 
    </>
    ); 
}
export default NewCars; 