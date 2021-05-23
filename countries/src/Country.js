import { Link } from 'react-router-dom'
import './Country.css';

const Country = ({ names, country, numWithCommas, getCountry, }) => {

   let langauges = [];
   let currencies = [];
   let borders = [];
   let alphaCodeToName = [];

   country.borders.map((border, index) => {
      return borders.push(border);
   })

   alphaCodeToName = names.filter(name => borders.includes(name.alpha3Code));

   country.languages.forEach((lang) => {
      langauges.push(lang.name);
   })

   country.currencies.forEach((money) => {
      currencies.push(`${money.name}`);
   })

   return (
      <div key='countrykey' className="details-wrapper">
         <Link to="/"><button className="back-button btn"><i class="fas fa-long-arrow-alt-left"></i> Back</button></Link>

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
                  {alphaCodeToName.map((border, index) => {
                     return <div className="border btn" value={index} data-code={border.alpha3Code} onClick={() => getCountry(border.alpha3Code)}>{border.name}</div>;
                  })}
               </div>
            </div>
         </div>
      </div>
   );
};

export default Country;