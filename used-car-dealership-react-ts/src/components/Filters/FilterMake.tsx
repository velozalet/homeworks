/*How `Make` filter will work:
`FilterMake.tsx` → Dropdown with 3 options.
When user selects one, update `selectedMake` State in `UsedCars.tsx` page
`CarList.txs` component  gets filteredCars based on selectedMake.*/

type Props = {
    selectedMake: string;
    onChange: (value: string) => void;
};
  
function FilterMake({ selectedMake, onChange }: Props) {

    return(
    <select id="make" className="form-select" value={selectedMake} onChange={(e) => onChange(e.target.value)}>
        <option value="">Any Make</option>
        <option value="gmc">GMC</option>
        <option value="chevrolet">Chevrolet</option>
        <option value="buick">Buick</option>
    </select>
    );
}
export default FilterMake;
  