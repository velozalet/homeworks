import React from "react";
import { transmission } from "../../constants/transmission"; //Array of strings with car's Transmission
import { capitalize } from "../../utils/helpers";

interface _TransmissionProps {
    value:string;
    onChange:(e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function __Transmission({ value,onChange }: _TransmissionProps) {
    //-->Get list of Transmission 
    const car_transmissions = transmission; //-->['auto', 'manual']

	return (
    <div className="col-md-4">
        <label className="form-label text-black">Transmission</label>
        <select
            className="form-select"
            name="transmission"
            value={value || ""}
            onChange={onChange}
        >
        {car_transmissions.map( (transmission, index, array) => (
            <option key={transmission} value={transmission}>{ capitalize(transmission) }</option>
        ))}
        </select> 
    </div>
    );
}
