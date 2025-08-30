import { collection,getDocs,addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import type { Car } from "../types/car";

//Func.to fetch all cars from Firestore
export async function fetchCars(): Promise<Car[]> {
    const carsCol = collection(db, "cars"); //`cars` is your FiresStore collection name
    const carsSnapshot = await getDocs(carsCol);

    //Convert docs to array of Car objects
    const carsList: Car[] = carsSnapshot.docs.map(doc => ({
    id: doc.id, // Firestore doc ID
    ...doc.data()
    })) as Car[];
    return carsList;
}

//Func.to create(save) a new car in Firestore. use Omit<Car,"id"> because ID will comes from Firestore, not from the form.
export async function createCar(car: Omit<Car,"id">): Promise<string> {
    try {
        const carsCol = collection(db, "cars");
        const docRef = await addDoc(carsCol, car);
        return docRef.id; // returns Firestore-generated ID
    }catch(error){
        console.error("Error adding car:", error);
        throw error;
    }
}
