import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
//import type { ReactNode } from "react";
//import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase"; //firebase.ts config
//import { Navigate } from "react-router-dom";

//import { Outlet } from "react-router-dom";
import AdminPanel from "../pages/__AdminPanel/AdminPanel";
import Preloader from '../components/Preloader/Preloader'; 


const AdminProtectedRoute = ({ children }: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);  //true = checking auth
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const adminRef = doc(db, "admins", user.uid); //Check Firestore for admin record
                const adminSnap = await getDoc(adminRef);
                if (adminSnap.exists() && adminSnap.data().isAdmin) { setIsAdmin(true); }
                else{ setIsAdmin(false); }
            }else{ setIsAdmin(false); }
            setLoading(false);  //finished checking
        });
        return () => unsub();
    }, []);

    const handleLogin = async () => {
        setLoading(true); //start spinner while trying login
        try{ await signInWithEmailAndPassword(auth, email, password); }  //`onAuthStateChanged` will handle success → setLoading(false) there
        catch(err) { 
            alert("Invalid credentials"); 
            setLoading(false); //stop spinner if login fails
        }
    };


    if (loading) {
        return(
            <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
                <div className="spinner-border text-warning mb-3" role="status" style={{width:'3rem', height:'3rem'}}></div>
                <div className="text-black fs-5">Checking authentication...</div>
            </div>
        )
    }
    if (!isAdmin) {
        return (  
            <div className="admin-login-form d-flex justify-content-center align-items-center vh-100" style={{backgroundColor:'cadetblue'}}> {/*blanchedalmond|aliceblue*/}
                <div className="container-lg"> 
                    <div className="row d-flex justify-content-center align-items-center"> 
                        <h2 className="text-black text-center mt-3 mb-4 display-6">Admin Login</h2>
                        <div className="text-center mb-3">
                             <img alt="Brand" src="/src/assets/site_logo.png" style={{height:'auto',width:'200px',margin:'0 auto'}} /> 
                        </div>
                         <div className="text-center col-xl-5 col-lg-4 col-md-7 col-sm-9"> 
                            <div className="col-md-12 form-group mb-3"> 
                                <input className="form-control form-control-lg"
                                    type="email"
                                    placeholder="Email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} 
                                /> 
                            </div>
                            <div className="col-md-12 form-group mb-3">  
                                <input className="form-control form-control-lg"
                                type="password"
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-12 text-center mt-xl-2 mt-lg-2 mt-sm-2 mt-2">  
                            <button className="btn btn-warning btn-lg" onClick={handleLogin}>Login</button> 
                        </div>
                    </div> {/*.row*/}
                </div> {/*.container*/}
            </div> //.admin-login-form
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
