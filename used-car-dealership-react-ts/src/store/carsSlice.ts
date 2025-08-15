import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface Car {
  id: string;
  make:  'GMC'|'Chevrolet'|'Buick'|string;
  model: string;
  year: number;
  bodyStyle: 'Hatch'|'SUV'|'Sedan'|string;
  color: string;
  mileage: number;
  transmission: 'Auto'|'Manual'|string;
  fuelType: 'Gas'|'Diesel'|string;
  price: number; 
  image: string;
}

interface CarsState {
  allCars: Car[];
  filteredCars: Car[];
  selectedMake: string | null;
  selectedModel: string | null;
}

const initialState: CarsState = {
  allCars: [],       // will be fetched or imported
  filteredCars: [],
  selectedMake: null,
  selectedModel: null
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setCars(state, action: PayloadAction<Car[]>) {
      state.allCars = action.payload;
      state.filteredCars = action.payload;
    },
    selectMake(state, action: PayloadAction<string | null>) {
      state.selectedMake = action.payload;
      state.selectedModel = null;
      state.filteredCars = state.allCars.filter(
        car => !action.payload || car.make === action.payload
      );
    },
    selectModel(state, action: PayloadAction<string | null>) {
      state.selectedModel = action.payload;
      state.filteredCars = state.allCars.filter(car => {
        return (
          (!state.selectedMake || car.make === state.selectedMake) &&
          (!action.payload || car.model === action.payload)
        );
      });
    }
  }
});
export const { setCars, selectMake, selectModel } = carsSlice.actions;
export default carsSlice.reducer;
