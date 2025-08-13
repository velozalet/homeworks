// Header + Footer wrapper
import {Outlet} from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ModalWindow from '../components/ModalWindow/ModalWindow';
import PrivacyPolicyContent from '../components/PrivacyPolicyContent/PrivacyPolicyContent';

const FrontLayout = ()=> (
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
);
export default FrontLayout;
