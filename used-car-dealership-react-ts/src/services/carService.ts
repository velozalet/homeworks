import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase/firebase";
import type { Car } from "../types/car";

// Function to fetch all cars from Firestore
export async function fetchCars(): Promise<Car[]> {
  const carsCol = collection(db, "cars"); // "cars" is your Firestore collection name
  const carsSnapshot = await getDocs(carsCol);

  //Convert docs to array of Car objects
  const carsList: Car[] = carsSnapshot.docs.map(doc => ({
    id: doc.id, // Firestore doc ID
    ...doc.data()
  })) as Car[];

  return carsList;
}
