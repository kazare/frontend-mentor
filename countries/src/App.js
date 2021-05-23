import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import Error from './Error';
import Nav from './Nav';
import Filters from './Filters';
import Country from './Country';

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
  const [names, setNames] = useState({});
  const [namesReady, setNamesReady] = useState(false);

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
      });
  };

  const getNames = async () => {
    await fetch(`https://restcountries.eu/rest/v2/all?fields=alpha3Code;name;alt`, {
      method: 'GET'
    })
      .then(data => data.json())
      .then((results) => {
        setNames(results);
        setNamesReady(true);
      });
  };

  useEffect(() => {
    getCountriesAll();

    getCountry(countryCode);
    getNames();

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
              <div className="country btn" key={index} data-code={country.alpha3Code} onClick={() => getCountry(country.alpha3Code)}>
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
              <div className="country btn" key={index} data-code={country.alpha3Code} onClick={() => getCountry(country.alpha3Code)}>
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

  return (
    <Router>
      <div className="App">
        <Nav />

        <main>
          <Switch>
            <Route path='/details'>
              {countryReady && namesReady ?
                <Country

                  names={names}
                  country={country}
                  numWithCommas={numWithCommas}
                  getCountry={getCountry}

                /> : <Error />}
            </Route>

            <Route path='/' exact>
              <Filters
                setQuery={setQuery}
                search={search}
                setSearch={setSearch}
                setRegion={setRegion}
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
