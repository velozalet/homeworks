import { Link } from 'react-router-dom';

function AdminDashboard(){

    return(
    <div className="admindashboard--page">
        <h1 style={{textAlign:'center',color:'green'}}>The `AdminDashboard` Page</h1>
        <p>Lorem ipsum dolor sit amet.... <strong>`AdminDashboard` Page</strong></p>
        <hr /><br />

      {/* <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/admin/create" className="text-blue-600 hover:underline">
            ➕ Create New Car
          </Link>
        </li>
        <li>
          <Link to="/admin/edit" className="text-blue-600 hover:underline">
            ✏️ Edit Existing Car
          </Link>
        </li>
        <li>
          <Link to="/admin/delete" className="text-red-600 hover:underline">
            🗑️ Delete Car
          </Link>
        </li>
      </ul>
    </div> */}
    </div>
    ); 
}
export default AdminDashboard;