import './Nav.css';

const themeSwitcher = (e) => {
   const root = document.documentElement;
   if (root.getAttribute('data-theme') === 'dark') {
      root.setAttribute('data-theme', 'light');
   } else {
      root.setAttribute('data-theme', 'dark');
   }
};

const Nav = () => {
   return (
      <header>
         <h1>Where in the world?</h1>
         <div className="theme-toggle" onClick={themeSwitcher}>🌜 Dark Mode</div>
      </header>
   );
};


export default Nav;