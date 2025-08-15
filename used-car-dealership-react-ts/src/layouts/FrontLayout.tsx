// Header + Footer wrapper
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {Outlet} from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ModalWindow from '../components/ModalWindow/ModalWindow';
import PrivacyPolicyContent from '../components/PrivacyPolicyContent/PrivacyPolicyContent';
import Preloader from '../components/Preloader/Preloader';

const FrontLayout = ()=> {
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect( () => { //=> For preloader effect
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 700); // simulate load time
        return () => clearTimeout(timer);
    }, [location]);

    return(
    <>
        {loading && <Preloader />}
        {!loading && (
            <>
                <Header />
                <main>
                    <Outlet /> {/*Page content goes here*/}
                </main>

                <ModalWindow id="privacy_policy" keyboard={false} backdrop="static" title="Privacy Policy++">
                    <PrivacyPolicyContent />
                </ModalWindow>
                <Footer />
            </>
        )}
    </>
    );
};
export default FrontLayout;
