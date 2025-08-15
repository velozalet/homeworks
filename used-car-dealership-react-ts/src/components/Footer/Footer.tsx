import { Link } from 'react-router-dom';

//Components:
import ScrollUpButton from "../ScrollUpButton/ScrollUpButton";

//Images:
import footerlogo from '../../assets/footer_logo.png';
import siteLogo from '../../assets/site_logo.png';


const Footer = () => (
    <footer className="pt-4 pb-1 text-white"> {/*bg-dark*/}
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 mb-lg-0 mb-md-0 mb-sm-3 mb-3 text-center">
            <h5 className="text-warning">Used Car Dealership</h5>
            <div className="footer-logo">
              <img src={siteLogo} alt="Brand" /> <br />
              <span>(355)128-4557</span>
            </div>
            {/* <p>Top quality used cars from trusted brands.</p> */}

          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 text-lg-start text-md-start text-sm-start text-center">
            <h5 className="text-warning">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-3"><Link className="text-white" to="/used-cars">Used Cars</Link></li>
              <li className="mb-3"><Link className="text-white" to="/new-cars">New Cars</Link></li>
              <li className="mb-3"><Link className="text-white" to="/about">About Us</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 text-lg-start text-md-start text-sm-start text-center">
            <h5 className="text-warning">Contact</h5>
            <ul className="list-unstyled">
              <li className="mb-lg-1 mb-md-1 mb-sm-1 mb-3"><Link className="text-white" to="/contact">Contact Us</Link></li>
              <li className="mb-lg-1 mb-md-1 mb-sm-1 mb-3"><a href="#" className="text-white" data-bs-toggle="modal" data-bs-target="#privacy_policy">Privacy Policy</a></li>
              <li className="footer-social pt-2">
                <a className="pe-3" href="https://www.facebook.com/"><i className="fa fa-facebook"></i></a>
                <a className="pe-3" href="https://www.facebook.com/"><i className="fa fa-twitter"></i></a>
                <a className="pe-3" href="https://www.facebook.com/"><i className="fa fa-linkedin"></i></a> 
              </li> 
            </ul>
          </div>
        </div>
        <hr />  
        <p className="bottom-footer text-center"> 
          <img src={footerlogo} alt="footer logo" /> &copy; 2025 &nbsp; Yaroslav L <span className="d-lg-inline d-md-inline d-sm-inline d-none">-- All rights reserved : )</span>
        </p>
        <ScrollUpButton />
      </div>   
    </footer> 
 );
export default Footer; 