/*Component Structure:

pages/
  UsedCars/
    UsedCars.tsx   <-- Page (holds FilterSidebar + CarList)
components/
  Filters/
    FilterSidebar.tsx <-- Holds all filters (Make, Model, Year, etc.)
    FilterMake.tsx     <-- Single filter for "Make" (dropdown)
    FilterModel.tsx    <-- Single filter for "Model" (updates after Make chosen)
  CarList/
    CarList.tsx   <-- Gets cars from Redux, maps CarCard
    CarCard.tsx   <-- Renders single car

`CarCard.tsx` component  - dumb UI piece (one car only)
`CarList.tsx` - smart component that connects to Redux
Filters update Redux → Redux updates filteredCars → `CarList.tsx`  re-renders
*/