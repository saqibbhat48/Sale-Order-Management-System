import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="ml-auto bg-gray-800 text-white p-2 rounded"
    >
      {theme === 'light' ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
