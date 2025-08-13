import { useState } from 'react';
import AdminPanel from '../pages/__AdminPanel/AdminPanel';


const AdminProtectedRoute = ()=> {
  const [authenticated, setAuthenticated] = useState(false);
  const [input, setInput] = useState('');

  const handleLogin = () => {
    if (input === 'admin123') setAuthenticated(true);
    else alert('Wrong password!');
  };

  if (!authenticated) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Admin Access</h2>
        <input
          type="password"
          placeholder="Enter Admin Password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return <AdminPanel />;
};
export default AdminProtectedRoute;

/*NEW --> use Firebase and Firestore collection admins that contains docs like { uid: true } keyed by uid or { email: true }.
After sign-in, check Firestore admins for user.uid or user.email.
For development this is okay; for production use custom claims with Admin SDK.

Example: create an admin doc
In Firestore Console → Create collection admins.
Add a doc with ID = admin user's UID and field { role: 'admin' } OR use email as id. */
/*
// src/routes/AdminProtectedRoute.tsx
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { watchAuth, signIn } from "../services/authService";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function AdminProtectedRoute() {
  const [user, setUser] = useState<any>(undefined); // undefined = loading
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsub = watchAuth((u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    // Option A: Simple env-based check (dev)
    // if (user.email === import.meta.env.VITE_ADMIN_EMAIL) { setIsAdmin(true); return; }

    // Option B: Check Firestore admins collection by uid
    (async () => {
      const docRef = doc(db, "admins", user.uid);
      const snap = await getDoc(docRef);
      setIsAdmin(snap.exists());
    })();
  }, [user]);

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      // onAuthStateChanged will update user and then isAdmin
    } catch (err) {
      alert("Login failed");
    }
  };

  // Loading
  if (user === undefined) return <div>Loading...</div>;

  // Not authenticated: show simple login form
  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Admin Login</h2>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" />
        <button onClick={handleLogin}>Sign in</button>
      </div>
    );
  }

  // Authenticated but we still decide if admin
  if (isAdmin === null) return <div>Checking admin rights...</div>;
  if (!isAdmin) return <div>Access denied</div>;

  // Authenticated and admin → render nested admin routes
  return <Outlet />;
}
*/
