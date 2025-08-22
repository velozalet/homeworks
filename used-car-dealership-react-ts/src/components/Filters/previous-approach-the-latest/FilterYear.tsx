import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectYear } from "../../store/carsSlice";
import type { RootState, AppDispatch } from "../../store/store";
 
function FilterYear(){ 
    const dispatch = useDispatch<AppDispatch>(); //Redux'actions. Now we can use`dispatch(...)` to call fns: setCars(),selectMake(),selectModel(), etc..
    const selectedYear = useSelector((state: RootState) => state.cars.selectedYear); //-->contains: gmc|chevrolet|buick
                            const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016];

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        const value = e.target.value ? parseInt(e.target.value, 10) : null;
        dispatch(selectYear(value));
    };

    return(
    <select className="form-select mt-2" aria-label="Year" value={selectedYear ?? ""} onChange={handleChange}>
        <option value="">any years</option>
        {years.map( (year) => ( <option key={year} value={year}>{year}</option>  ))}
    </select>
    );
}
export default FilterYear;
  