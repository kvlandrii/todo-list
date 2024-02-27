import { NavLink } from "react-router-dom";
import "../SCSS/Home.scss";

const Home = () => {
  return (
    <main className="home">
      <h2>Hello!</h2>
      <p>Welcome to your TODO List!</p>
      <p>Here you can add, delete and edit your todos</p>
      <NavLink to="/todo" className="start-btn">
        Start!
      </NavLink>
    </main>
  );
};

export default Home;
