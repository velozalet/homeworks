import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {Car} from '../types/car'; 


//I) Define the shape of this slice State
interface CarsState {
  allCars: Car[];                //every car fetched/stored
  filteredCars: Car[];          //result after filters (Make/Model/Color/Price, etc..)
  selectedMake: string | null;  //current selected `Make-filter`
  selectedModel: string | null; //current selected `Model-filter`
  selectedYear: number | null;  //current selected `Year-filter`
  selectedBodyStyle: string | null; //current selected `BodyStyle-filter`
  selectedFuelType: string | null;  //current selected `FuelType-filter`
  selectedMileage: {min:number; max?:number} | null; //current selected `Mileage-filter`
  selectedPrice: { min:number; max?:number } | null; //current selected `Price-filter`
  loading: boolean; // for loading indicator when we're expecting car's data from Firebase DB
  sortOrder: 'asc' | 'desc' | null; //sort Order by `Price`: Low --> High | High --> Low
}
//II) Initial default State
const initialState: CarsState = {
  allCars: [],  //will be fetched or imported --> will be filled by reducer `setCars()`
  filteredCars: [], 
  selectedMake: null, 
  selectedModel: null, 
  selectedYear: null, 
  selectedBodyStyle: null,
  selectedFuelType: null,
  selectedMileage: null,
  selectedPrice: null,
  loading: true, //start as TRUE until Firebase fetch finishes
  sortOrder: null,
};

//III) Centralized Filtering. Store all active filters values in here. Each reducer`selectMake`,`selectModel`,`selectYear` etc. would just update its value and call applyFilters().
function applyFilters(state: CarsState) {
    state.filteredCars = state.allCars.filter( (car) => {
        if (state.selectedMake && car.make !== state.selectedMake) return false;
        if (state.selectedModel && car.model !== state.selectedModel) return false;
        if (state.selectedYear && car.year !== state.selectedYear) return false;
        if (state.selectedBodyStyle && car.bodyStyle !== state.selectedBodyStyle) return false;
        if (state.selectedFuelType && car.fuelType !== state.selectedFuelType) return false;

        if( state.selectedMileage ){
            const {min,max} = state.selectedMileage;
            if( car.mileage < min ) { return false; }
            if( max !== undefined && car.mileage > max ) { return false; }
        }

        if( state.selectedPrice ) {
            const {min,max} = state.selectedPrice;
            if( car.price < min ) { return false; }
            if (max !== undefined && car.price > max) { return false; }
        }
        return true;
    }); //--> Now every time you call`selectMake`,`selectModel`,`selectYear`, etc.. they don’t need to “know” about each other — `applyFilters()` always enforces all active filters at once

        //Sort AFTER filtering
        if (state.sortOrder) {
            state.filteredCars.sort((a, b) => {
                if (state.sortOrder === 'asc') return a.price - b.price;
                else return b.price - a.price;
            });
        }
}

//IV) `createSlice` — generates reducers + actions for us
const carsSlice = createSlice({
  name: 'cars',
  initialState, 
  reducers:{ 
    //III.1) replace `allCars` and `filteredCar`s` with provided array
    setCars(state, action: PayloadAction<Car[]>) {
      state.allCars = action.payload; 
      applyFilters(state); //always filter after setting
    },
    //III.2) set which `Make` is selected and recompute `filteredCars`
    selectMake(state, action: PayloadAction<string | null>) {
        state.selectedMake = action.payload; 
        state.selectedModel = null; 
        applyFilters(state); //always filter after setting
    },
    //III.3) `Model` - set `selectedModel` and recompute `filteredCars` from `selectModel` ???
    selectModel(state, action: PayloadAction<string | null>) {
        state.selectedModel = action.payload;
        applyFilters(state); //always filter after setting
    },
    //III.4) `Year` 
    selectYear(state, action: PayloadAction<number | null>) {
        state.selectedYear = action.payload;
        applyFilters(state); //always filter after setting
    },
    //III.5) `BodyStyle` 
    selectBodyStyle(state, action: PayloadAction<string | null>) {
        state.selectedBodyStyle = action.payload;
        applyFilters(state); //always filter after setting
    },
    //III.6) `FuelType` 
    selectFuelType(state, action: PayloadAction<string | null>) {
        state.selectedFuelType = action.payload;
        applyFilters(state);
    },
    //III.7) `Mileage` 
    selectMileage(state, action: PayloadAction<{ min:number; max?:number } | null>) {
        state.selectedMileage = action.payload;
        applyFilters(state);
    },
    //III.8) `Price` 
    selectPrice(state, action: PayloadAction<{ min:number; max?:number } | null>) { //👈 NEW
        state.selectedPrice = action.payload;
        applyFilters(state);
    },
    //III.9) Reset All Filters --> to default Filters condition 
    resetFilters(state) {
        state.selectedMake = null;
        state.selectedModel = null;
        state.selectedYear = null;
        state.selectedBodyStyle = null;
        state.selectedFuelType = null;
        state.selectedMileage = null;
        state.selectedPrice = null;
        applyFilters(state); //reapply without filters = show all
    },
    //III.10) Sort Order by `Price`: Low --> High | High --> Low
    setSortOrder(state, action: PayloadAction<'asc' | 'desc' | null>) {
        state.sortOrder = action.payload;
        applyFilters(state);
    },
    //III.11) `loading process` until Firebase fetch finishes to show `loading indicator`
    setLoading(state, action: PayloadAction<boolean>) {
        state.loading = action.payload;
    }
  } //reducers
});

//IV) => Export actions
export const {
    setCars,
    selectMake,
    selectModel,
    selectYear,
    selectBodyStyle,
    selectFuelType,
    selectMileage,
    selectPrice,
    resetFilters,
    setSortOrder,
    setLoading
} = carsSlice.actions;
export default carsSlice.reducer; 