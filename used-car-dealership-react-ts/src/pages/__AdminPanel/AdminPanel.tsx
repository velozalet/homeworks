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

            <a className="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
            Admin Menu
            </a>

            <div className="offcanvas offcanvas-start"  id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div>Some text as placeholder. In ..</div>
                    <div className="dropdown mt-3">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
                            Dropdown button
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                    <aside className="text-center w-1/4 p-4 border-r">
                        <nav className="space-y-3">
                            <p><Link to="/admin" className="block text-lg font-medium hover:underline">🏠 Dashboard</Link></p>
                            <p><Link to="/admin/create" className="block hover:underline">➕ Create++</Link></p>
                            <p><Link to="/admin/edit" className="block hover:underline">✏️ Edit</Link></p>
                            <p><Link to="/admin/delete" className="block hover:underline">🗑️ Delete</Link></p>
                        </nav>
                    </aside>
                </div>
            </div> {/*offcanvas*/}


            <aside className="text-center w-1/4 p-4 border-r">
                <nav className="space-y-3">
                    <Link to="/admin" className="block text-lg font-medium hover:underline">🏠 Dashboard</Link>
                    <Link to="/admin/create" className="block hover:underline">➕ Create++</Link>
                    <Link to="/admin/edit" className="block hover:underline">✏️ Edit</Link>
                    <Link to="/admin/delete" className="block hover:underline">🗑️ Delete</Link>
                </nav>
            </aside>

            <button 
            onClick={handleLogout} 
            className="mt-6 px-3 py-1 text-black"
            style={{position:'absolute',right:'15px',top:'80px'}} 
            >🔄 Log Out </button> {/*Logout button*/}

        <div className="flex">
            <main className="flex-1 p-6">
                <Outlet /> {/* <-- Here your sub-pages will render */}
            </main>
        </div>
    </div> //.adminpanel--page
    ); 
}
export default AdminPanel;