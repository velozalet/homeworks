/*How `Make` filter will work:
`FilterMake.tsx` → Dropdown with 3 options.
When user selects one, update `selectedMake` State in `UsedCars.tsx` page
`CarList.txs` component  gets filteredCars based on selectedMake.*/

import { carMakesAndModels } from "../../constants/carMakesAndModels"; //Array of Objs with car's Makes & Models

//console.log(carMakesAndModels);
const makes =  Object.keys(carMakesAndModels); //console.log(makes); 

type Props = {
    selectedMake: string;
    onChange: (value: string) => void;
}; 

  
function FilterMake({ selectedMake, onChange }: Props){
    //console.log(selectedMake); -->contains: gmc|chevrolet|buick
    return(
    <select id="make" className="form-select" value={selectedMake} onChange={ (e) => { onChange(e.target.value);} }>
        <option value="">any make</option>
        {makes.map((make) => (
            <option key={make} value={make}>
                { (make === "gmc") ? make.toUpperCase() : make }
            </option>
        ))}
    </select>
    );
}
export default FilterMake;
  