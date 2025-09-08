import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { selectMake, selectModel } from "../../store/carsSlice";
import { carMakesAndModels } from "../../constants/carMakesAndModels"; //Array of Objs with car's Makes & Models

const makes =  Object.keys(carMakesAndModels); //-->['gmc', 'chevrolet', 'buick']
  
function FilterMake(){ 
    const dispatch = useDispatch<AppDispatch>();
    const selectedMake = useSelector((state: RootState) => state.cars.selectedMake); //-->contains: gmc|chevrolet|buick

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        dispatch( selectMake(e.target.value || null) );  //null if empty
    };

    return(
    <select id="make" className="form-select" value={selectedMake ?? ""} onChange={handleChange}>
        <option value="">any make</option>
        {makes.map( (make, index, array) => (
            <option key={make} value={make}>{ (make === "gmc") ? make.toUpperCase() : make }</option>
        ))}
    </select>
    );
}
export default FilterMake;
  