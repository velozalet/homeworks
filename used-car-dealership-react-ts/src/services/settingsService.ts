import { collection,doc,getDocs,updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

import type { Settings } from "../types/settings";

//1.Get(fetch) all settings from Firestore
export async function fetchSettings(): Promise<Settings[]> {
    const settingsCol = collection(db, "settings");
    const settingsSnapshot = await getDocs(settingsCol);
    
    //Convert docs → array of Settings
    const settingsList: Settings[] = settingsSnapshot.docs.map((docSnap) => ({
        id: docSnap.id, //include document ID
        ...docSnap.data(), 
    })) as Settings[];
    return settingsList;
}

//2. Update: Update status of contact(`new-message` → `viewed`)
export async function updateSettings(
    id: string,
    data: Partial<Settings>
  ): Promise<void> {
    const docRef = doc(db, "settings", id);
    await updateDoc(docRef, data);
  }