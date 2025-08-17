import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectModel } from "../../store/carsSlice";
import type { RootState, AppDispatch } from "../../store/store";

// type Props = {
//     selectedModel: string;
//     onChange: (value: string) => void;
// };
  
function FilterModel(){ //function FilterModel({ selectedModel, onChange }: Props) {..}
    const dispatch = useDispatch<AppDispatch>(); //Redux'actions. Now we can use`dispatch(...)` to call fns: setCars(),selectMake(),selectModel(), etc..

    const { availableModels, selectedModel } = useSelector(
        (state: RootState) => state.cars
    );

    return(
    <select 
        id="model" 
        className="form-select mt-2" 
        value={selectedModel ?? ""} 
        onChange={ (e) => dispatch(selectModel(e.target.value || null)) } 
        disabled={availableModels.length === 0} //disable if no make chosen
    >
        {availableModels.map((model) => (
          <option key={model} value={model}>{model}</option>
        ))}
    </select>

    );
}
export default FilterModel;