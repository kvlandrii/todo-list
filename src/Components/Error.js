import { Link } from "react-router-dom";
import "../SCSS/Error.scss"

const Error = () => {
  return (
    <div>
      <h1>Error!</h1>
      <h3>Something went wrong...</h3>
      <Link className="home-button" to="/home">
        Go Home Page
      </Link>
    </div>
  );
};

export default Error;
