import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import ActiveOrders from './components/ActiveOrders';
import CompletedOrders from './components/CompletedOrders';
import Login from './components/Login';
import { ThemeProvider } from './components/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
    setIsLoading(false);
  }, []);

  const setAuthStatus = (status) => {
    localStorage.setItem('isAuthenticated', status.toString());
    setIsAuthenticated(status);
  };

  const handleLogout = () => {
    setAuthStatus(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider>
      <Router>
        <div className='min-h-[90.3dvh]'>
          <nav className="p-4 bg-gray-900 text-white flex gap-2 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-gray-950 px-3 py-2 rounded"
                : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded"
            }
          >
            Active Orders
          </NavLink>
          <NavLink
            to="/completed"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-gray-950 dark:950 px-3 py-2 rounded"
                : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded"
            }
          >
            Completed Orders
          </NavLink>
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <button onClick={handleLogout} className=" mr-4 hover:bg-gray-700 hover:text-white px-3 py-2 rounded">Logout</button>
              </>
            ) : null}
          </nav>
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setAuthStatus} />} />
            <Route path="/" element={isAuthenticated ? <ActiveOrders /> : <Navigate to="/login" />} />
            <Route path="/completed" element={isAuthenticated ? <CompletedOrders /> : <Navigate to="/login" />} />
          </Routes>
          
        </div>
        <Footer/>
      </Router>
    </ThemeProvider>
  );
};

export default App;