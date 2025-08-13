import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
//import type { ReactNode } from "react";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase"; //firebase.ts config
import { Navigate } from "react-router-dom";

import { Outlet } from "react-router-dom";
import AdminPanel from "../pages/__AdminPanel/AdminPanel";


const AdminProtectedRoute = ({ children }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
        if (user) {
            const adminRef = doc(db, "admins", user.uid); //Check Firestore for admin record
            const adminSnap = await getDoc(adminRef);
            if (adminSnap.exists() && adminSnap.data().isAdmin) {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          } else {
            setIsAdmin(false);
          }
          setLoading(false);
    });

    return () => unsub();
  }, []);

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            alert("Invalid credentials");
        }
    };
    if (loading) return <div>Checking authentication...</div>;

    if (!isAdmin) {
        return (
          <div style={{ padding: "2rem" }}>
            <h2>Admin Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        );
    }
  //Authenticated as admin → render nested routes
  return <AdminPanel />;
};
export default AdminProtectedRoute;

/* At first - in Firebase Console:
1.Go to Firestore Database → Create database (Start in test mode for now) - It should be done already!
2.Create a collection (Start Collection) -> enter `admins`
3.Add a document with ID = your Firebase user’s uid (not email)
  - If you already have created a Firebase Authentication user for your admin, copy their UID from `Firebase Authentication → Users`
  - Paste that UID into the Document ID field.
  - Do not use "Auto ID" for this case — the document ID must match the admin's UID so we can look it up directly.
4. Add a field:
FIELD:    TYPE:    VALUE:
isAdmin   Boolean  true

5.Save the document.

Document path will look like:
admins > nbS8nvkCpgdyspBOckfsMtddI9F2 >  isAdmin: true  ==> where nbS8nvkCp... is your UID from `Firebase Authentication → Users`
*/
