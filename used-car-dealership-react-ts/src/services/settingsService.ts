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
        ...docSnap.data(), //spread all fields
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
/*
    export async function fetchSettings(): Promise<Settings> {
        const settingsCol = collection(db, "settings");
        const snapshot = await getDocs(settingsCol);
    
        // merge all docs into one object (assuming "settings" collection has key-value docs)
        const settings: Settings = {};
        snapshot.forEach((doc) => {
        settings[doc.id] = doc.data();
        });
    
        return settings;
    }
*/
/*
    export async function fetchSettings(): Promise<Settings> {
    
        const settingsDocRef = doc(db, "settings", "main"); //replace "main" with your actual doc ID if different
        const snapshot = await getDoc(settingsDocRef);

        if (!snapshot.exists()) { throw new Error("Settings document not found"); }
        return snapshot.data() as Settings;
    }
*/