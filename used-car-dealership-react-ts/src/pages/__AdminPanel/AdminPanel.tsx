import { Link,Outlet, useNavigate } from 'react-router-dom';

import { signOut } from 'firebase/auth';
import { auth } from "../../firebase/firebase"; //`firebase.ts` config

//Styles:
import './AdminPanel.css';

function AdminPanel(){
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await signOut(auth);
          navigate('/admin'); //back to login form
        } catch (error) {
          console.error('Logout error:', error);
        }
      };

    return(
    <div className="adminpanel--page"> 
        <h1 className="title-of-adminpanel">The Admin Panel</h1> 

            <a className="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
            <i className="fa fa-retweet" style={{fontSize:'24px'}}></i>
            </a>

            <div className="offcanvas offcanvas-start"  id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Admin Menu</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <aside className="text-center w-1/4 p-4 border-r">
                        <nav className="space-y-3">
                            <p><Link to="/admin" className="block text-lg font-medium hover:underline"><b>🏠</b> Dashboard</Link></p>
                            <p><Link to="/admin/create" className="block hover:underline"><b>➕</b> Create</Link></p>
                            <p><Link to="/admin/booking-car" className="block hover:underline"><b>🚙</b> Car Booking</Link></p> {/*🚘 */}
                            <p><Link to="/admin/mail-box" className="block hover:underline"><b>📭</b> Mail Box</Link></p> {/*📭  📥  📧*/}
                            <p><Link to="/admin/settings" className="block hover:underline"><b>⚙️</b> Site Settings</Link></p>
                        </nav>
                    </aside>
                    <button 
                    onClick={handleLogout}  
                    className="btn btn-warning btn-logout mt-6 px-3 py-1 text-black">
                        <i className="fa fa-arrow-circle-left"></i> Log Out 
                    </button> {/*Logout button*/}
                </div>
            </div> {/*offcanvas*/}

            <aside className="text-center w-1/4 pt-2 pb-4 border-r invisible d-none"> 
                <nav className="">
                    <Link to="/admin" className="block text-lg font-medium hover:underline">🏠 Dashboard</Link>
                    <Link to="/admin/create" className="block hover:underline">➕ Create++</Link>
                    <Link to="/admin/edit" className="block hover:underline">✏️ Edit</Link>
                    <Link to="/admin/delete" className="block hover:underline">🗑️ Delete</Link>
                </nav>
            </aside> 
            <div className="text-center pt-4"><img alt="Brand" src="/src/assets/site_logo.png" /></div>

            <div className="admin-a-info text-black"> 
                <i className="fa fa-user pe-1"></i>Admin 
                <p>admin_cardealer@ca.com</p> 
            </div>  

        <div className="flex">
            <main className="flex-1 p-6">
                <Outlet /> {/* sub-pages will render*/}
            </main>
        </div>
    </div> //.adminpanel--page
    ); 
}
export default AdminPanel;