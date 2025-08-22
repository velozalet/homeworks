import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import type {Car} from '../types/car'; 

/* (!) We moved this to separate file --> `src/types/car.ts`
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
  images: string[]; //array of image URLs for multiple images
}
*/

//I) Define the shape of this slice State
interface CarsState {
  allCars: Car[];                //every car fetched/stored
  filteredCars: Car[];          //result after filters (Make/Model/Color/Price, etc..)
  selectedMake: string | null;  //current selected `Make-filter`
  selectedModel: string | null; //current selected `Model-filter`
  availableModels: string[];   // 👈 add this
}
//II) Initial default State
const initialState: CarsState = {
  allCars: [],  //will be fetched or imported --> will be filled by reducer `setCars()`
  filteredCars: [], //initially empty array
  selectedMake: null, //??
  selectedModel: null, //??
  availableModels: []          // 👈 start empty
};

//III) `createSlice` — generates reducers + actions for us
const carsSlice = createSlice({  //Creates a slice(piece of state) of your`Redux store` with reducers's functions to update that State
  name: 'cars', //slice name. Redux uses it to generate action: `cars/setCars`,`cars/selectMake`,`cars/selectModel`, etc..
  initialState,  //defines the starting State of this slice
  reducers:{ //Obj that defines how the State should change when actions are dispatched. Each key of Obj is a function-reducer:
    //III.a) replace `allCars` and `filteredCar`s` with provided array
    setCars(state, action: PayloadAction<Car[]>) {
      state.allCars = action.payload; //<- action.payload is typed as Car[] (it's array of cars you gave when dispatching)
      state.filteredCars = action.payload; //<- action.payload is typed as Car[] - keep filtered same as all when loading fresh data
    },
    //III.b) set which `Make` is selected and recompute `filteredCars`
    selectMake(state, action: PayloadAction<string | null>) {
      state.selectedMake = action.payload; //`action.payload` is string | null (is the Make)
      state.selectedModel = null; //(is the Model) reset `Model filter` when `Make` changes
      //--Filter by Make
      state.filteredCars = state.allCars.filter( (car) => { //Otherwise include only cars where `car.make === action.payload`
        if( !action.payload ){ return true; } //if`action.payload` is null(empty) so `!action.payload` is TRUE --> return all cars.
        else{ return car.make === action.payload; } //otherwise return only cars where `car.make === action.payload` (return only matching cars)
      }); //OR: state.filteredCars = state.allCars.filter(car => !action.payload || car.make === action.payload );

      //--Fill up `Models` for chosen `Make` ==> Whenever user picks a `Make`, fill up the available `Models` list.
      if( action.payload ){
        state.availableModels = Array.from(
          new Set(
            state.allCars
              .filter(car => car.make === action.payload)
              .map(car => car.model)
          )
        );
      } else {
        state.availableModels = [];
      }
    },
    //III.c) set `selectedModel` and recompute `filteredCars` from `selectedMake`
    selectModel(state, action: PayloadAction<string | null>) {
      state.selectedModel = action.payload;
      state.filteredCars = state.allCars.filter( (car) => {
        if (state.selectedMake){ //1: CHECK `Make filter` --> if user selected a`Make`
            if ( car.make !== state.selectedMake ){ return false; } //skip this car if `Make` of car doesn't match
        }
        if (action.payload) { //2: CHECK `Model filter` --> if user selected a `Model`
            if ( car.model !== action.payload ){ return false; } //skip this car if model does not match
        }
        return true; //3: if both filters pass → keep this car
      });/*OR:
            state.filteredCars = state.allCars.filter(car => {
                return( ( !state.selectedMake || car.make === state.selectedMake ) && ( !action.payload || car.model === action.payload ) ); //respects make filte and rrespects model filter
            });
      */
    }
  }
});
/*`createSlice()`returns `carsSlice` with:
  - `carsSlice.reducer` — the actual reducer function for Redux
  - `carsSlice.actions` — an object with auto-created action functions:
  {
      setCars(), selectMake(), selectModel(), etc..
  }
*/
//IV) => Export actions
export const { setCars, selectMake, selectModel } = carsSlice.actions;
export default carsSlice.reducer;
/* 1.the`Redux Store` — using reducer from`carsSlice` with name`cars` in the global`Redux State` 
   2.that’s why we access the State like: useSelector( (state) => state.cars.filteredCars/selectedMake/selectedModel/etc..);
So, `state.cars` --> comes from this `carsSlice.reducer`
    `filteredCars/selectedMake/selectedModel/etc..` -->  comes from `const initialState`
*/
/*===========================================================================================================
Some explanations:
1) Action like a message --> to Redux. t says: 👉 “Hey Redux, please change the State in this way, here is the data you need: 
{ type: "cars/setCars",  payload: [ {make:"GMC", model:"Terrain"} ] } where:
    - type = name of the action 
    - payload = the actual data U're sending with it

2) What is PayloadAction<T>? --> it’s just TS way to say: 📦 “This action will carry a `payload` of type T.”
        `PayloadAction<Car[]>` =  the `payload` must be an array of cars.
        `PayloadAction<string | null>` = the `payload` must be a string or null
 
3) What is action.payload? --> When your reducer function runs, it gets that message. And `action.payload` is simply the data inside the message box:
    setCars(state, action: PayloadAction<Car[]>) {
        state.allCars = action.payload; //action.payload is the array of cars you gave when dispatching
    }

If we did:  dispatch( setCars([{ make: "BMW", model: "X5" }]) ); when inside reducer:
    action.payload === [{ make: "BMW", model: "X5" }]

✅ So:
`PayloadAction<Car[]>` means “this message always carries a list of cars and it's an array.”
`action.payload` is simply “the list of cars inside that message.”
*/