import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

//Images:
import siteLogo from '../../assets/site_logo.png';

const Header = ()=> {
   const navbarRef = useRef<HTMLElement | null>(null); //Reference to`.navbar` elem.

    useEffect( ()=>{
        const handleScroll = ()=>{
            if( navbarRef.current ){
                if( window.scrollY > 50 ){ navbarRef.current.classList.add('scrolled');
                }else{ navbarRef.current.classList.remove('scrolled'); }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return(
    <nav  ref={navbarRef} className="navbar navbar-expand-md navbar-dark bg-dark sticky-top py-0"> {/*navbar-dark bg-dark*/}
    <div className="container-lg">
        <Link className="navbar-brand" to="/">
        <img src={siteLogo} alt="Brand" />
        </Link>
        <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggl-icon fa"></span> {/*navbar-toggler-icon*/}
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto me-auto d-flex justify-content-center">
            {/* <li className="nav-item pe-2"><Link className="nav-link px-3 py-1 text-center" to="/">Home</Link></li> */}
            <li className="nav-item px-0 py-1 pe-md-3"><Link className="nav-link px-3 py-1 text-center fw-light" to="/used-cars">Used Cars</Link></li>
            <li className="nav-item px-0 py-1 pe-md-3"><Link className="nav-link px-3 py-1 text-center fw-light" to="/new-cars">New Cars</Link></li>
            <li className="nav-item px-0 py-1 pe-md-3"><Link className="nav-link px-3 py-1 text-center fw-light" to="/about">About Us</Link></li>
            <li className="nav-item px-0 py-1 pe-md-3"><Link className="nav-link px-3 py-1 text-center fw-light" to="/contact">Contact Us</Link></li>
            {/* <li className="nav-item pe-2"><Link className="nav-link px-3 py-1 text-center fw-light disabled" to="/admin" aria-disabled="true">Admin</Link></li> */}
        </ul>
        </div> {/*.navbar-collapse*/}
    </div> {/*.container*/}
    </nav>
    );
};
export default Header;
