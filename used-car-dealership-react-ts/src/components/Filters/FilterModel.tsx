import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { selectModel } from "../../store/carsSlice";
import { carMakesAndModels } from "../../constants/carMakesAndModels"; //Array of Objs with car's Makes & Models


function FilterModel(){
    const dispatch = useDispatch<AppDispatch>(); 
    const selectedMake = useSelector((state: RootState) => state.cars.selectedMake); //-->contains: gmc|chevrolet|buick
    const selectedModel = useSelector((state: RootState) => state.cars.selectedModel);  //-->contains: Model of car after filtering `Make-filter`

    //Get list of models for selected make (or empty if none selected)
    let models: string[];
    if (!selectedMake) { models = []; } //case-1: no `Make` chosen
    else if( !carMakesAndModels[selectedMake] ){ models = []; } //case-2: `Make` chosen but not in our dictionary
    else{  models = carMakesAndModels[selectedMake]; } //case-3: make chosen and exists in dictionary
    //OR one line: --> const models = (selectedMake) ? carMakesAndModels[selectedMake] || [] : [];
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if( e.target.value === "" ){ dispatch(selectModel(null)); 
        }else{ dispatch(selectModel(e.target.value)); }
    };

    return(
    <select 
        id="model" 
        className="form-select mt-2" 
        value={selectedModel ?? ""}
        onChange={handleChange} 
        disabled={!selectedMake} //disable until `Make` is selected
    >
        <option value="">any model</option>
        {models.map( (model, index, array) => ( <option key={model} value={model}>{model}</option> ) )}
    </select>
    );
}
export default FilterModel;