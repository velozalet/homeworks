import { collection,doc,getDocs,addDoc,setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import type { Car } from "../types/car";

//Func.to fetch all cars from Firestore
export async function fetchCars(): Promise<Car[]> {
    const carsCol = collection(db, "cars"); //`cars` is your FiresStore collection name
    const carsSnapshot = await getDocs(carsCol);

    //Convert docs to array of Car objects
    const carsList: Car[] = carsSnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as Car[];
    return carsList; 
}

//Create a new car and also store the id field
//Func.to create(save) a new car in Firestore. use Omit<Car,"id"> because ID will comes from Firestore, not from the form.
export async function createCar(car: Omit<Car,"id">): Promise<string> { 
    try {
        const carsCol = collection(db, "cars");
        const newDocRef = doc(carsCol); // create ref with generated ID
        const carWithId: Car = { id: newDocRef.id, ...car }; // add id into the object
        await setDoc(newDocRef, carWithId); // save object with id included
        return newDocRef.id;
    } catch (error){
        console.error("Error adding car:", error);
        throw error;
    }
}
