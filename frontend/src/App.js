import React from 'react';
import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';

const App = () => {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
