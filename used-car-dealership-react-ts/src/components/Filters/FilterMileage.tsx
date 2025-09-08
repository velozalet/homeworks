import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { selectMileage } from "../../store/carsSlice";
import { mileageRanges } from "../../constants/mileageRanges"; //Array of Objs with mileage ranges

const mileageranges = mileageRanges; //--> {label: '10k - 25k', min: 10000, max: 25000} {label: '25k - 40k', min: 25000, max: 40000}...
 
function FilterMileage(){ 
    const dispatch = useDispatch<AppDispatch>();
    const selectedMileage = useSelector((state: RootState) => state.cars.selectedMileage); //-->{min: 10000, max: 25000} | {min: 60000, max: 85000}..

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        //dispatch(selectMileage(e.target.value || null));
        if( !e.target.value ){ 
            dispatch(selectMileage(null));
            return;
        }

        const range = mileageRanges.find((range) =>{
            return range.label === e.target.value;
        });
        if( range ){ dispatch(selectMileage({ min:range.min, max:range.max })); }
    };

    return(
    <select 
        className="form-select mt-2" 
        aria-label="Mileage" 
        value={selectedMileage ? mileageRanges.find( (r) =>
            r.min === selectedMileage.min &&
            r.max === selectedMileage.max
        )?.label ?? "" : ""}
        onChange={handleChange}
    >
        <option value="">any mileage</option>
        {mileageranges.map( 
            (mileagerange,index,array) => (<option key={mileagerange.label} value={mileagerange.label}>{mileagerange.label}</option>)
        )}
    </select>
    );
}
export default FilterMileage; 
  