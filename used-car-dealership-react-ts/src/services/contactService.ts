import { collection,doc,getDocs,updateDoc,deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

import type { Contact } from "../types/contact";

//1.Get(fetch) all contacts from Firestore
export async function fetchContacts(): Promise<Contact[]> {
    const contactsCol = collection(db, "contacts"); // "contacts" is your Firestore collection name
    const contactsSnapshot = await getDocs(contactsCol);

    //Convert docs to array of Car objects
    const contactsList: Contact[] = contactsSnapshot.docs.map((docSnap) => ({ 
        //const data = docSnap.data();
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate
        ? docSnap.data().createdAt.toDate().toISOString()
        : null,
        })) as Contact[];
    return contactsList;
}

//2. Update: Update status of contact(`new-message` → `viewed`)
export async function updateContactStatus(id:string, status:string): Promise<void> {
    const contactRef = doc(db, "contacts", id);
    await updateDoc(contactRef, { status });
}

//3. Delete Contact
export async function deleteContact(id:string): Promise<void> {
    const contactRef = doc(db, "contacts", id);
    await deleteDoc(contactRef);
}