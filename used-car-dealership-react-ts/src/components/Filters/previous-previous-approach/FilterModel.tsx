import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectModel } from "../../store/carsSlice";
import type { RootState, AppDispatch } from "../../store/store";
import { carMakesAndModels } from "../../constants/carMakesAndModels"; //Array of Objs with car's Makes & Models

// type Props = {
//     selectedModel: string;
//     onChange: (value: string) => void;
// };
  
function FilterModel(){ //function FilterModel({ selectedModel, onChange }: Props) {..}
    const dispatch = useDispatch<AppDispatch>(); //Redux'actions. Now we can use`dispatch(...)` to call fns: setCars(),selectMake(),selectModel(), etc..
    const selectedMake = useSelector((state: RootState) => state.cars.selectedMake);
    const selectedModel = useSelector((state: RootState) => state.cars.selectedModel);

    // const { availableModels, selectedModel } = useSelector( (state: RootState) => state.cars );

    //Get list of models for selected make (or empty if none selected)
    const models = selectedMake ? carMakesAndModels[selectedMake] || [] : [];
    
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (value === "anymodel") {
          dispatch(selectModel(null));
        } else {
          dispatch(selectModel(value)); 
        }
    };

    return(
    <select 
        id="model" 
        className="form-select mt-2" 
        value={selectedModel || "anymodel"}
        onChange={handleChange} 
        disabled={!selectedMake} //disable until `Make` is selected
    >
        <option value="">any model</option>
        {models.map((model) => (
          <option key={model} value={model}>{model}</option>
        ))}
    </select>
    );
}
export default FilterModel;