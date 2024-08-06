// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     navigate('/');
//   };

//   return (
//     <div className="admin-dashboard-container">
//       <header className="admin-header">
//         <h1>Admin Dashboard</h1>
//         <button onClick={handleLogout} className="logout-button"><b>Logout</b></button>
//       </header>
//       <main className="admin-content">
//         <h2>Welcome, Admin!</h2>
//         <div className="admin-actions">
//           <button onClick={() => navigate('/admin-dashboard/users')}><b>Manage Users</b></button>
//           <button onClick={() => navigate('/admin-dashboard/reports')}><b>View Reports</b></button>
//           <button onClick={() => navigate('/admin-dashboard/settings')}><b>Settings</b></button>
//         </div>
//         <section className="admin-section">
//           <h3>Users List</h3>
//           <ul>
//             <li>User 1</li>
//             <li>User 2</li>
//             <li>User 3</li>
//           </ul>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

// import React from 'react';
// import './AdminDashboard.css';

// const AdminDashboard = () => {
//   // Static employee data
//   const employees = [
//     { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Employee', department: 'Engineering', joiningDate: '2020-01-15', status: 'Active' },
//     { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'HR', department: 'Human Resources', joiningDate: '2019-03-22', status: 'Active' },
//     { id: 3, name: 'Michael Brown', email: 'michael.brown@example.com', role: 'Admin', department: 'Administration', joiningDate: '2018-07-30', status: 'Inactive' },
//     { id: 4, name: 'Emily Johnson', email: 'emily.johnson@example.com', role: 'Team Lead', department: 'Product Development', joiningDate: '2021-05-12', status: 'Active' },
//   ];

//   const handleEdit = (id) => {
//     // Handle edit logic
//     alert(`Edit employee with ID: ${id}`);
//   };

//   const handleDelete = (id) => {
//     // Handle delete logic
//     alert(`Delete employee with ID: ${id}`);
//   };

//   return (
//     <div className="admin-dashboard">
//       <header className="header">
//         <h1>Admin Dashboard</h1>
//       </header>
//       <main>
//         <table className="employee-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Department</th>
//               <th>Joining Date</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((employee) => (
//               <tr key={employee.id}>
//                 <td>{employee.id}</td>
//                 <td>{employee.name}</td>
//                 <td>{employee.email}</td>
//                 <td>{employee.role}</td>
//                 <td>{employee.department}</td>
//                 <td>{employee.joiningDate}</td>
//                 <td>{employee.status}</td>
//                 <td>
//                   <button onClick={() => handleEdit(employee.id)}>Edit</button>
//                   <button onClick={() => handleDelete(employee.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

// src/components/dashboards/AdminDashboard/AdminDashboard.js
// src/components/dashboards/AdminDashboard/AdminDashboard.js
import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidePanel from './AdminSidePanel';
import AdminHome from './AdminHome';
import Category from './component/Category';
import Profile from './component/Profile';
import Message from './component/Message';
import DashBoard from './component/DashBoard';
import ManageUsers from './component/ManageUsers';

const AdminDashboard = ({ user }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AdminSidePanel user={user} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '',
          p: 3,
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="home" element={<AdminHome user={user} />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="manage-user" element={<ManageUsers />} />
          <Route path="category" element={<Category />} />
          <Route path="message" element={<Message />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
