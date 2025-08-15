/*src/
├── routes/
│   └── AdminProtectedRoute.tsx
├── pages/
│   └── __AdminPanel/
│   ├── Home
│   ├── AboutUs
│   ├── ContactUs
│   ├── NewCars
│   ├── UsedCars
---------------------------------------------------------------------------------------------------*/
//import { useState } from 'react';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

//Layouts
import FrontLayout from './layouts/FrontLayout';

//Pages (Front-End site):
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import ContactUs from './pages/ContactUs/ContactUs';
import NewCars from './pages/NewCars/NewCars';
import UsedCars from './pages/UsedCars/UsedCars';
import PageNotFound from './pages/PageNotFound/PageNotFound';

//_________________`Admin Panel`:
//Admin Routes:
import AdminProtectedRoute from './routes/AdminProtectedRoute';
//Pages(of `Admin Panel`):
import AdminDashboard from './pages/__AdminPanel/subpages/AdminDashboard';
import CreateCar from './pages/__AdminPanel/subpages/CreateCar';
import EditCar from './pages/__AdminPanel/subpages/EditCar';
import DeleteCar from './pages/__AdminPanel/subpages/DeleteCar';

//Components:
import CarDetails from './components/CarDetails/CarDetails';

//Styles:
import './App.css';

//`Front-End site Menu`
const FrontSiteNavigation = ()=> { //check the URL. If we're in `Admin Panel` --> don't display `Front-End site Menu`
    const isAdmin = useLocation().pathname.startsWith("/admin");
    if( isAdmin ){ return null; }

    return(
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark py-3">
        <div className="container">
            <Link className="navbar-brand" to="/">
                <img src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Brand" />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto me-auto d-flex justify-content-center">
                    {/* <li className="nav-item pe-2"><Link className="nav-link px-3 py-1 text-center" to="/">Home</Link></li> */}
                    <li className="nav-item pe-2"><Link className="nav-link px-3 py-1 text-center fw-light" to="/used-cars">Used Cars</Link></li>
                    <li className="nav-item pe-2"><Link className="nav-link px-3 py-1 text-center fw-light" to="/new-cars">New Cars</Link></li>
                    <li className="nav-item pe-2"><Link className="nav-link px-3 py-1 text-center fw-light" to="/about">About Us</Link></li>
                    <li className="nav-item pe-2"><Link className="nav-link px-3 py-1 text-center fw-light" to="/contact">Contact Us</Link></li>
                    <li className="nav-item pe-2"><Link className="nav-link px-3 py-1 text-center fw-light disabled" to="/admin" aria-disabled="true">Admin</Link></li>
                </ul>
            </div> {/*.navbar-collapse*/}
        </div> {/*.container*/}
    </nav>
    );
};  //(!)==> DELETE IT in PRODACTION


const App = ():JSX.Element => { 

    return(
    <>
    <BrowserRouter>
        {/* <nav style={{display:'flex',gap:'1rem'}}>
            <Link to="/">Home</Link>
            <Link to="/new-cars">New Cars</Link>
            <Link to="/used-cars">Used Cars</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/admin">Admin</Link>
        </nav> */} {/*1.Moved this to`const FrontSiteNavigation` to use`useLocation()` in order not to display `Front-End site Menu` when we're in the`Admin Panel`*/}
        {/* <FrontSiteNavigation /> */} {/*--> 2.Moved this Navigation to`Header` component. And `Header`,`Footer` components inside `FrontLayout`*/}
        <Routes>
             {/*Front-End site routes:*/}
            <Route element={<FrontLayout />} >
                <Route path="/" element={<Home />} />
                <Route path="/new-cars" element={<NewCars />} />
                <Route path="/used-cars" element={<UsedCars />} />
                <Route path="/used-cars/:carId" element={<CarDetails />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                {/*Fallback for invalid URLs*/}
                <Route path="*" element={<PageNotFound />} />
            </Route>

            {/*`Admin Panel` protected routes:*/}
            <Route path="/admin/*" element={<AdminProtectedRoute />}> 
                <Route index element={<AdminDashboard />} />
                <Route path="create" element={<CreateCar />} />
                <Route path="edit" element={<EditCar />} />
                <Route path="delete" element={<DeleteCar />} />
            </Route>
        </Routes>
    </BrowserRouter>
    </>
    );
}
export default App
