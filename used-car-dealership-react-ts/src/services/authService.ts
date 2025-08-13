//src/services/authService.ts
import {auth} from "../firebase/firebase";
import {signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged} from "firebase/auth";
import type {User} from "firebase/auth";

export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const signOut = () => firebaseSignOut(auth);

export const watchAuth = (cb: (user: User | null) => void) =>
  onAuthStateChanged(auth, cb);
/*(!) signIn will persist the session by default (local persistence), so reloads keep you signed in — fixes your reload problem*/
