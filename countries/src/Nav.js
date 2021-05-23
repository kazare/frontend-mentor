import { useState } from 'react';
import './Nav.css';

const Nav = () => {
   const [theme, setTheme] = useState('light');

   const themeSwitcher = (e) => {
      const root = document.documentElement;
      if (root.getAttribute('data-theme') === 'dark') {
         root.setAttribute('data-theme', 'light');
         setTheme('light');

      } else {
         root.setAttribute('data-theme', 'dark');
         setTheme('dark');
      }
   };

   return (
      <header>
         <h1>Where in the world?</h1>
         {theme === 'light' ?
            <div className="theme-toggle btn" onClick={themeSwitcher}><i class="fas fa-moon"></i> <span className="theme-label">Dark Mode</span></div> :
            <div className="theme-toggle btn" onClick={themeSwitcher}><i class="fas fa-sun"></i> <span className="theme-label">Light Mode</span>
            </div>}
      </header>
   );
};


export default Nav;