//import { useState } from 'react';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSettings } from "./services/settingsService";
import { setSettings, setLoading } from "./store/settingsSlice";
import type { AppDispatch,RootState } from "./store/store";

import { BrowserRouter,Routes,Route,Link } from 'react-router-dom'; 

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
