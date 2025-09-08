import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { selectFuelType } from "../../store/carsSlice";
import { fuelType } from "../../constants/fuelType"; //Array of strings with car's Body Styles

const fueltypes = fuelType; //-->['gas', 'diesel']
 
function FilterFuelType(){ 
    const dispatch = useDispatch<AppDispatch>(); 
    const selectedFuelType = useSelector((state: RootState) => state.cars.selectedFuelType); //-->contains: gas|diesel

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        dispatch(selectFuelType(e.target.value || null));
    };

    return(
    <select className="form-select mt-2" aria-label="Fuel Type" value={selectedFuelType ?? ""} onChange={handleChange}>
        <option value="">any fuel</option>
        {fueltypes.map( 
            (fueltype,index,array) => (<option key={fueltype} value={fueltype}>{fueltype}</option>)
        )}
    </select>
    );
}
export default FilterFuelType; 
  