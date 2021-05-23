import './Filters.css';

const Filters = ({ setQuery, search, setSearch, setRegion }) => {
   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
         setQuery(search);
         setSearch('');
      }
   };

   const updateSearch = (e) => {
      setSearch(e.target.value);
   };

   const handleSelect = () => {
      document.getElementsByClassName('custom-options')[0].classList.toggle('open');

      const options = document.querySelectorAll('.custom-option');

      for (const option of options) {
         option.addEventListener('click', function () {
            if (!this.classList.contains('selected')) {
               this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
               this.classList.add('selected');
               setRegion(this.dataset.value);
               this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
            }
         })
      }
   };

   return (
      <div className="filters">
         <div className="search">
            <i class="fas fa-search"></i>
            <input key="inputkey" className="input" type="text" value={search} onChange={updateSearch} onKeyDown={handleKeyDown} placeholder="Search for a country..." />
         </div>


         <div class="custom-select-wrapper">
            <div class="custom-select" onClick={handleSelect}>
               <div class="custom-select__trigger"><span>Filter By Region </span>
                  <div class="arrow"><i class="fas fa-chevron-down"></i></div>
               </div>

               <div class="custom-options">
                  <span class="custom-option selected" data-value="All">🌐 All</span>
                  <span class="custom-option" data-value="Africa">🌍 Africa</span>
                  <span class="custom-option" data-value="Americas">🌎 Americas</span>
                  <span class="custom-option" data-value="Asia">🌏 Asia</span>
                  <span class="custom-option" data-value="Europe">🌍 Europe</span>
                  <span class="custom-option" data-value="Oceania">🌏 Oceania</span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Filters;