import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-gray-900 px-3 py-2 rounded"
                : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded"
            }
          >
            Active Sale Orders
          </NavLink>
          <NavLink
            to="/completed-orders"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-gray-900 px-3 py-2 rounded"
                : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded"
            }
          >
            Completed Sale Orders
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
