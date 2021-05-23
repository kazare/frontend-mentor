import { Link } from 'react-router-dom'

const Error = () => {
   return (
      <div>
         <Link to="/"><button className="back-button btn"><i class="fas fa-long-arrow-alt-left"></i> Back</button></Link>
         <h1>Oops! Page not found!</h1>
      </div>
   );
};

export default Error;