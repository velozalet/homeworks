/*How `Make` filter will work:
`FilterMake.tsx` → Dropdown with 3 options.
When user selects one, update `selectedMake` State in `UsedCars.tsx` page
`CarList.txs` component  gets filteredCars based on selectedMake.*/

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMake, selectModel } from "../../store/carsSlice";
import type { RootState, AppDispatch } from "../../store/store";
import { carMakesAndModels } from "../../constants/carMakesAndModels"; //Array of Objs with car's Makes & Models

const makes =  Object.keys(carMakesAndModels); //--> ['gmc', 'chevrolet', 'buick']
  
function FilterMake(){ 
    const dispatch = useDispatch<AppDispatch>(); //Redux'actions. Now we can use`dispatch(...)` to call fns: setCars(),selectMake(),selectModel(), etc..
    const selectedMake = useSelector((state: RootState) => state.cars.selectedMake); //-->contains: gmc|chevrolet|buick

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        dispatch( selectMake(e.target.value) );
        dispatch( selectModel("") ); //reset `Model` when `Make` changes
    };

    return(
    <select id="make" className="form-select" value={selectedMake || ""} onChange={handleChange}>
        <option value="">any make</option>
        {makes.map( (make, index, array) => (
            <option key={make} value={make}>{ (make === "gmc") ? make.toUpperCase() : make }</option>
        ))}
    </select>
    );
}
export default FilterMake;
  