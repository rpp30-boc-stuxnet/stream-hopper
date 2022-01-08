import React, { useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from './ThemeContext.jsx';

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div classname="toggle">
      {theme === 'dark' ? (
        <FaSun
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className='themeBtn'
        />
        ) : (
          <FaMoon
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className='themeBtn'
          />
      )}
    </div>
  )
};

export default ThemeToggle;
