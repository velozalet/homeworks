//import React from 'react';
import { useParams } from "react-router-dom";

//Styles:
import './CarDetails.css';

  //Here, you can fetch the car details from Firebase, Redux, etc.
  //For now, let's just display the param
const CarDetails = (): JSX.Element => {
    const {carId} = useParams<{ carId: string }>();

    return(
    <div className="text-center">
        <h1 className="text-black">Car Details</h1>
        <p className="text-black">Car ID: {carId}</p>
    </div>
    );
}
export default CarDetails;
