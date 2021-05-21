import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [resultsReady, setResultsReady] = useState(false);
  const [region, setRegion] = useState('');

  const getCountriesAll = async () => {
    await fetch('https://restcountries.eu/rest/v2/all', {
      method: 'GET'
    })
      .then(data => data.json())
      .then((results) => {
        setCountries(results);
      });
  };

  const getCountry = async () => {
    await fetch(`https://restcountries.eu/rest/v2/name/${query}`, {
      method: 'GET'
    })
      .then(data => {
        if (!data.ok) {
          throw new Error('Something went wrong');
        } else {
          return data.json();
        }
      })
      .then((results) => {
        setResultsReady(true);
        setResults(results);

      })
      .catch((err) => {
        console.log(err);
      })
  };

  const getRegion = async () => {
    await fetch(`https://restcountries.eu/rest/v2/region/${region}`, {
      method: 'GET'
    })
      .then(data => data.json())
      .then((results) => {
        setResults(results);
      });
  };

  useEffect(() => {
    getCountriesAll();
  }, []);

  useEffect(() => {
    if (query === "") {
      setResultsReady(false);
      return null;
    }
    getCountry();
    setQuery('');
    setResultsReady(false);
  }, [query]);

  useEffect(() => {
    if (search === "") {
      setResultsReady(false);
      return null;
    }
  }, [search]);

  useEffect(() => {
    if (region === "All" || region === "") {
      setResultsReady(false);
      getCountriesAll();
      return null;
    }
    setResultsReady(true);
    getRegion();
  }, [region])

  const numWithCommas = (num) => {
    return num.toLocaleString();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setQuery(search);
    }
  };

  const updateSearch = ({ target }) => {
    setSearch(target.value);
  };

  const Countries = () => {
    return (
      <div className="countryWrapping">
        {countries.map((country, index) => {
          return (
            <div className="country" key={index}>
              <img className="flag" src={country.flag} alt={`Flag of ${country.name}`} />
              <div className="info">
                <h2 className="name">{country.name}</h2>
                <div><span className="label">Population: </span> {numWithCommas(country.population)}</div>
                <div><span className="label">Region: </span>{country.region}</div>
                <div><span className="label">Capital: </span>{country.capital}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const Results = () => {
    return (
      <div className="countryWrapping">
        {results.map((country, index) => {
          return (
            <div className="country" key={index}>
              <img className="flag" src={country.flag} alt={`Flag of ${country.name}`} />
              <div className="info">
                <h2 className="name">{country.name}</h2>
                <div><span className="label">Population: </span> {numWithCommas(country.population)}</div>
                <div><span className="label">Region: </span>{country.region}</div>
                <div><span className="label">Capital: </span>{country.capital}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
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
    <div className="App">
      <header>
        <h1>Where in the world?</h1>
        <div>Dark Mode</div>
      </header>
      <main>
        <div className="filters">
          <input className="search" type="text" value={search} onChange={updateSearch} onKeyDown={handleKeyDown} placeholder="Search for a country..." />

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


        {resultsReady ? <Results /> : <Countries />}

      </main>
    </div>
  );
}

export default App;
