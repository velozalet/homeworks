import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { selectYear } from "../../store/carsSlice";
import { carYears } from "../../constants/carYears"; //Array of numbers with car's Years

const years = carYears; //-->[2025, 2024, 2023, 2022, 2021, 2020]
 
function FilterYear(){ 
    const dispatch = useDispatch<AppDispatch>(); 
    const selectedYear = useSelector((state: RootState) => state.cars.selectedYear); //-->contains: 2025|2024|2023| etc..

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        const value = e.target.value ? parseInt(e.target.value, 10) : null;
        dispatch(selectYear(value));
    };

    return(
    <select className="form-select mt-2" aria-label="Year" value={selectedYear ?? ""} onChange={handleChange}>
        <option value="">any year</option>
        {years.map( (year, index, array) => ( <option key={year} value={year}>{year}</option>  ))}
    </select>
    );
}
export default FilterYear; 
  