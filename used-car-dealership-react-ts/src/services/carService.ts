import { collection,doc,getDocs,addDoc,setDoc,updateDoc } from "firebase/firestore";
import { ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { db } from "../firebase/firebase";
import { storage } from "../firebase/firebase"; 
import type { Car } from "../types/car";

//1.Func.to fetch all cars from Firestore
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

//2.Create a new car and also store the id field
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
//2.1 Upload single image to Firebase Storage
export async function uploadCarImage(carId: string, file: File): Promise<string> {
    try {
      const storageRef = ref(storage, `cars/${carId}/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    }catch(error) {
      console.error("Error uploading image:", error);
      throw error;
    }
}

//3. Update an existing car in Firestore. Partial<Car> → means no need to send all fields,only the ones being updated.
export async function updateCar(carId: string, updatedCar: Partial<Car>): Promise<void> {
    try {
        const carRef = doc(db, "cars", carId);
        await updateDoc(carRef, updatedCar);
        console.log(`Car ${carId} updated successfully`);
    }catch(error){
        console.error("Error updating car:", error);
        throw error;
    }
} 