//Components:
import PageBanner from "../../components/PageBanner/PageBanner"; 
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
            </div>{/*.row*/} 
        </div>{/*.container*/} 
    </div> {/*.newcars--page*/} 
    </>
    ); 
}
export default NewCars; 