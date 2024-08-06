import '../styles/navbar.css';
import React, { useState } from 'react';
import {BrowserRouter as  Router,Routes, Route, Link} from 'react-router-dom';
import SignUp from './signup';
import H from './home';
import LogIn from './login';
import About from './about';
import AdminDashboard from './dashboards/AdminDashboard/AdminDashboard';
import EmployeeDashboard from './dashboards/EmployeeDashboard/EmployeeDashboard';
import HRDashboard from './dashboards/HRDashboard/HRDashboard';
import TeamLeaderDashboard from './dashboards/TeamLeadDashboard/TeamLeadDashboard';
import ProductManagerDashboard from './dashboards/ProductManagerDashboard/ProductManagerDashboard';
import SidePanel from './dashboards/SidePanel';
import Contact from './contact';
function Home(params)
{
    return(
        <H/>
    )
}
function Ab(params)
{
    return(
        <About/>
    )
}
function Login(params)
{
    return(
        <LogIn/>
    )
}
function Signup(params)
{
    return(
        <SignUp/>
    )
}
function Navbar(params)
{
    const [user, setUser] = useState(null);

  const handleLogin = (userInfo) => {
    setUser(userInfo);
  };

  const handleLogout = () => {
    setUser(null);
  };

    return(
        <Router>
            <nav>
                <ul className='ul'>
                    <div className='li1'>
                        <Link to="/" className='nav-title'>WorkCrew</Link>
                    </div>
                    <li className='li'>
                        <Link to = "/" className='link'>Home</Link>
                    </li>
                    <li className='li'>
                        <Link to = "/about" className='link'>About Us</Link>
                    </li>
                    <li className='li'>
                        <Link to = "/contact" className='link'>Contact</Link>
                    </li>
                    <li className='li'>
                        <Link to = "/signup" className='link'>Signup</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
                <Route path="/home" element={<Home user={user} onLogout={handleLogout} />} />
                <Route exact path = '/about' element = {<Ab/>}/>
                <Route exact path = '/contact' element = {<Contact/>}/>
                <Route path="/login" element={<Login onLogin={handleLogin}/>} />
                <Route exact path = '/signup' element = {<Signup/>}/>
                <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
                <Route path="/employee-dashboard/*" element={<EmployeeDashboard />} />
                <Route path="/hr-dashboard/*" element={<HRDashboard />} />
                <Route path="/team-lead-dashboard/*" element={<TeamLeaderDashboard />} />
                <Route path="/product-manager-dashboard/*" element={<ProductManagerDashboard />} />
                <Route path="/dashboards/sidepanel" element={<SidePanel />} />
            </Routes>
        </Router>
    )
}
export default Navbar;