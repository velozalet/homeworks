/*src/
├── routes/
│   └── AdminProtectedRoute.tsx
├── pages/
│   └──__AdminPanel/
│          ├── AdminPanel.tsx & AdminPanel.css
│          ├── subpages/
|             ├── AdminDashboard.tsx
|             ├── CreateCar.tsx 
|             ├── EditCar.tsx
|             └── DeleteCar.tsx
---------------------------------------------------------------------------------------------------*/
import { BrowserRouter,Routes,Route,Link,Outlet, useNavigate } from 'react-router-dom';

import { signOut } from 'firebase/auth';
import { auth } from "../../firebase/firebase"; //`firebase.ts` config

function AdminPanel(){
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await signOut(auth);
          navigate('/admin'); // back to your login form
        } catch (error) {
          console.error('Logout error:', error);
        }
      };

    return(
    <div className="adminpanel--page">
        <h1 style={{textAlign:'center',color:'green'}}>Welcome to the `Admin Panel` Page</h1>
        <p>Lorem ipsum dolor sit amet.... <strong>`Admin Panel` Page</strong></p>

        <div className="flex">
            <aside className="w-1/4 p-4 border-r">
                <nav className="space-y-3">
                    <Link to="/admin" className="block text-lg font-medium hover:underline">🏠 Dashboard</Link>
                    <Link to="/admin/create" className="block hover:underline">➕ Create</Link>
                    <Link to="/admin/edit" className="block hover:underline">✏️ Edit</Link>
                    <Link to="/admin/delete" className="block hover:underline">🗑️ Delete</Link>
                </nav>
                <button onClick={handleLogout} className="mt-6 px-3 py-1 text-black">🔄 Log Out </button> {/*Logout button*/}
            </aside>
            <main className="flex-1 p-6">
                <Outlet /> {/* <-- Here your sub-pages will render */}
            </main>
        </div>
    </div>
    ); 
}
export default AdminPanel;