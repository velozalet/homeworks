import { Link } from 'react-router-dom';
//Components:
import Button from '../../components/Button/Button';

//Styles:
import './PageNotFound.css';

function PageNotFound(){
    return(
    <div className="not-found--page d-flex align-items-center text-center">
        <div className="container ">
            <h1 className="chromatic-aberration-effect">Page Not Found 
                <small>Go to Home Page
                    <Button as="a" className="btn btn-yellow px-4 py-2 ms-4 rounded text-decoration-none" href="/" text="Back To Home"></Button>
                </small>
            </h1>
        </div>
    </div>
    ); 
}
export default PageNotFound;