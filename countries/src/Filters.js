const Filters = ({ search, updateSearch, handleKeyDown, handleSelect }) => {
   return (
      <div className="filters">
         <input key="greenbluehorsemonkeyrandomshit" className="search" type="text" value={search} onChange={updateSearch} onKeyDown={handleKeyDown} placeholder="Search for a country..." />

         <div class="custom-select-wrapper">
            <div class="custom-select" onClick={handleSelect}>
               <div class="custom-select__trigger"><span>Filter By Region </span>
                  <div class="arrow"></div>
               </div>

               <div class="custom-options">
                  <span class="custom-option" data-value="All">Filter By Region</span>
                  <span class="custom-option selected" data-value="All">All</span>
                  <span class="custom-option" data-value="Africa">Africa</span>
                  <span class="custom-option" data-value="Americas">Americas</span>
                  <span class="custom-option" data-value="Asia">Asia</span>
                  <span class="custom-option" data-value="Europe">Europe</span>
                  <span class="custom-option" data-value="Oceania">Oceania</span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Filters;