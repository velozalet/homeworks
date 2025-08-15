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
      <div>
        <label htmlFor="make">Make:</label>
        <select
          id="make"
          value={selectedMake}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">All</option>
          <option value="GMC">GMC</option>
          <option value="Chevrolet">Chevrolet</option>
          <option value="Buick">Buick</option>
        </select>
      </div>
    );
}
export default FilterMake;
  