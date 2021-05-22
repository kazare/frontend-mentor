import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import Filters from './Filters';
import Nav from './Nav';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [resultsReady, setResultsReady] = useState(false);
  const [region, setRegion] = useState('');
  const [countryCode, setCountryCode] = useState('USA');
  const [country, setCountry] = useState({});
  const [countryReady, setCountryReady] = useState(false);

  const getCountriesAll = async () => {
    await fetch('https://restcountries.eu/rest/v2/all', {
      method: 'GET'
    })
      .then(data => data.json())
      .then((results) => {
        setCountries(results);
      });
  };

  const getResults = async () => {
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

  const getCountry = async (code) => {
    setCountryCode(code);

    await fetch(`https://restcountries.eu/rest/v2/alpha/${code}`, {
      method: 'GET'
    })
      .then(data => data.json())
      .then((results) => {
        setCountry(results);
        setCountryReady(true);
        console.log(results);
      });

  }

  useEffect(() => {
    getCountriesAll();
    getCountry(countryCode);
  }, []);

  useEffect(() => {
    if (query === "") {
      setResultsReady(false);
      return null;
    }
    getResults();
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


  const Home = () => {
    return (
      <div>
        { resultsReady ? <Results /> : <Countries />}
      </div>
    );
  };

  const Countries = () => {
    return (
      <div className="countryWrapping">

        {countries.map((country, index) => {
          return (
            <Link to="/details">
              <div className="country" key={index} data-code={country.alpha3Code} onClick={() => getCountry(country.alpha3Code)}>
                <img className="flag" src={country.flag} alt={`Flag of ${country.name}`} />
                <div className="info">
                  <h2 className="name">{country.name}</h2>
                  <div><span className="label">Population: </span> {numWithCommas(country.population)}</div>
                  <div><span className="label">Region: </span>{country.region}</div>
                  <div><span className="label">Capital: </span>{country.capital}</div>
                </div>
              </div>
            </Link>
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
            <Link to="/details">
              <div className="country" key={index} data-code={country.alpha3Code} onClick={() => getCountry(country.alpha3Code)}>
                <img className="flag" src={country.flag} alt={`Flag of ${country.name}`} />
                <div className="info">
                  <h2 className="name">{country.name}</h2>
                  <div><span className="label">Population: </span> {numWithCommas(country.population)}</div>
                  <div><span className="label">Region: </span>{country.region}</div>
                  <div><span className="label">Capital: </span>{country.capital}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };

  const Country = () => {
    let langauges = [];
    let currencies = [];

    country.languages.forEach((lang) => {
      langauges.push(lang.name);
    })

    country.currencies.forEach((money) => {
      currencies.push(money.name);
    })

    return (
      <div className="details-wrapper">
        <Link to="/"><button className="back-button">Back</button></Link>

        <div className="country-details">
          <div className="flag-container"><img className="flag" src={country.flag} alt={`Flag of ${country.name}`} /></div>

          <div className='details'>
            <h2>{country.name}</h2>
            <ul className="details-info">
              <li><span className="label">Native Name: </span>{country.nativeName}</li>
              <li><span className="label">Population: </span>{numWithCommas(country.population)}</li>
              <li><span className="label">Region: </span>{country.region}</li>
              <li><span className="label">Sub Region: </span>{country.subregion}</li>
              <li><span className="label">Capital: </span>{country.capital}</li>
              <li><span className="label">Top Level Domain: </span>{country.topLevelDomain}</li>
              <li><span className="label">Currencies: </span>{currencies.join(", ")}</li>
              <li><span className="label">Languages: </span>{langauges.join(", ")}</li>
            </ul>

            <div className="border-wrapper">
              <span className="label">Border Countries: </span>
              <div className="borders"></div>
              {country.borders.map((border, index) => {
                return <div className="border" value={index}>{border}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Error = () => {
    return <h1>Oops! Page not found!</h1>;
  };

  return (
    <Router>
      <div className="App">
        <Nav />

        <main>
          <Switch>
            <Route path='/details' component={Country} />
            <Route path='/' exact>
              <Filters
                search={search}
                updateSearch={updateSearch}
                handleKeyDown={handleKeyDown}
                handleSelect={handleSelect}
              />
              <Home />
            </Route>

            <Route component={Error} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
