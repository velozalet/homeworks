import { collection,doc,getDocs,updateDoc,deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

import type { Booking } from "../types/booking";

//1.Get(fetch) all bookings from Firestore
export async function fetchBookings(): Promise<Booking[]> {
    const bookingsCol = collection(db, "bookings"); // "bookings" is your Firestore collection name
    const bookingsSnapshot = await getDocs(bookingsCol);

    //Convert docs to array of Car objects
    const bookingsList: Booking[] = bookingsSnapshot.docs.map((docSnap) => ({ 
        //const data = docSnap.data();
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate
        ? docSnap.data().createdAt.toDate().toISOString()
        : null,
        })) as Booking[];
    return bookingsList;
}

//2. Update: Update status of booking(`pending` → `answered`)
export async function updateBookingStatus(id:string, status:string): Promise<void> {
    const bookingRef = doc(db, "bookings", id);
    await updateDoc(bookingRef, { status });
}

//3. Delete booking
export async function deleteBooking(id:string): Promise<void> {
    const bookingRef = doc(db, "bookings", id);
    await deleteDoc(bookingRef);
}