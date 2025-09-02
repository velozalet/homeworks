import React from "react";
import { carMakesAndModels } from "../../constants/carMakesAndModels";
import { capitalize } from "../../utils/helpers";

interface ModelProps {
    make: string | undefined;
    model: string | undefined;
    onChange:(e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function __Model({ make,model,onChange }: ModelProps) {
    //-->Get list of Models according to before selected Makes
    let car_models: string[];
    if( !make ){ car_models = []; }  //case-1: no `Make` chosen
    else if( !carMakesAndModels[make] ){ car_models = []; } //case-2: `Make` chosen but not in our dictionary
    else{  car_models = carMakesAndModels[make]; } //case-3: make chosen and exists in dictionary

	return (
    <div className="col-md-6">
        <label className="form-label text-black">Model</label> 
        <select
            className="form-select"
            name="model"
            value={model || ""}
            onChange={onChange}
        >
        { ( make )  
            ? car_models.map( (model, index, array) => (
            <option key={model} value={model}>{ capitalize(model) }</option>
        ))
        : "" }
        </select> 
    </div>
    );
}
