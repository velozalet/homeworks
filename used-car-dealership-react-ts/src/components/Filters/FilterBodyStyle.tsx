import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { selectBodyStyle } from "../../store/carsSlice";
import { bodyStyles } from "../../constants/bodyStyles"; //Array of strings with car's Body Styles

const bodystyles = bodyStyles; //-->['sedan', 'suv', 'hatch']
 
function FilterBodyStyle(){ 
    const dispatch = useDispatch<AppDispatch>(); //Redux'actions. Now we can use`dispatch(...)` to call fns: setCars(),selectMake(),selectModel(), etc..
    const selectedBodyStyle = useSelector((state: RootState) => state.cars.selectedBodyStyle); //-->contains: sedan|suv|hatch

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        dispatch(selectBodyStyle(e.target.value || null));
    };

    return(
    <select className="form-select mt-2" aria-label="Body Style" value={selectedBodyStyle ?? ""} onChange={handleChange}>
        <option value="">any body style</option>
        {bodystyles.map( 
            (bodystyle,index,array) => (<option key={bodystyle} value={bodystyle}>{ (bodystyle === "suv") ? bodystyle.toUpperCase() : bodystyle }</option>)
        )}
    </select>
    );
}
export default FilterBodyStyle; 
  