//import { useState } from 'react';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSettings } from "./services/settingsService";
import { setSettings, setLoading } from "./store/settingsSlice";
import type { AppDispatch,RootState } from "./store/store";
//import { useSelector } from "react-redux";

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
import CarFavorite from "./pages/CarFavorite/CarFavorite";
import PageNotFound from './pages/PageNotFound/PageNotFound';

//_________________`Admin Panel`:
//Admin Routes:
import AdminProtectedRoute from './routes/AdminProtectedRoute';
//Pages(of `Admin Panel`):
import AdminDashboard from './pages/__AdminPanel/subpages/AdminDashboard';
import CreateCar from './pages/__AdminPanel/subpages/CreateCar';
import BookingCar from './pages/__AdminPanel/subpages/BookingCar';
import MailBox from './pages/__AdminPanel/subpages/MailBox';
import Settings from './pages/__AdminPanel/subpages/Settings';


//Components:
import CarDetails from './components/CarDetails/CarDetails';
import EditCar from './components/EditCar/EditCar';

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
    const dispatch = useDispatch<AppDispatch>();

    //Get All settings of project in global
    useEffect(() => {
        async function loadSettings() {
          try {
            dispatch(setLoading(true));
            const settings = await fetchSettings();
            dispatch(setSettings(settings));
          } catch (err) {
            console.error("Error loading settings:", err);
          } finally {
            dispatch(setLoading(false));
          }
        }
        loadSettings();
      }, [dispatch]);
    //   const settings = useSelector((state: RootState) => state.settings.allSettings); console.log(settings);

    return(
    <>
    <BrowserRouter>
        <Routes>
            {/*Front-End site routes:*/}
            <Route element={<FrontLayout />} >
                <Route path="/" element={<Home />} />
                <Route path="/new-cars" element={<NewCars />} />
                <Route path="/used-cars" element={<UsedCars />} /> 
                <Route path="/used-cars/:carId" element={<CarDetails />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/used-cars/favorite" element={<CarFavorite />} />
                {/*Fallback for invalid URLs*/}
                <Route path="*" element={<PageNotFound />} />
            </Route>
            {/*__/Front-End site routes:*/}
            {/*`Admin Panel` protected routes:*/}
            <Route path="/admin/*" element={<AdminProtectedRoute />}> 
                <Route index element={<AdminDashboard />} />
                <Route path="create" element={<CreateCar />} />
                <Route path=":carId" element={<EditCar />} />{/*just added for Edit Car routing*/}
                <Route path="booking-car" element={<BookingCar />} /> 
                <Route path="mail-box" element={<MailBox />} />
                <Route path="settings" element={<Settings />} />
            </Route>
            {/*__/`Admin Panel` protected routes:*/}
        </Routes>
    </BrowserRouter> 
    </>
    );
}
export default App
