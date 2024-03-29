import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "../store/slices/userSlise.js";
import "../SCSS/Layout.scss";

const Layout = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const isActiveLink = ({ isActive }) => {
    return { color: isActive ? "#70bb6d" : "#d5d9eb" };
  };

  const signOutHandler = () => {
    dispatch(setIsAuthenticated(false));
    localStorage.setItem("isAuthenticated", false);
  };

  return (
    <div className="layout">
      <header className="header">
        <NavLink to="/home" className="header__item" style={isActiveLink}>
          Home
        </NavLink>
        <NavLink to="/todo" className="header__item" style={isActiveLink}>
          Todo
        </NavLink>
        <NavLink to="/about" className="header__item" style={isActiveLink}>
          About
        </NavLink>
        {!isAuthenticated ? (
          <NavLink to="/login" className="header__item" style={isActiveLink}>
            Login
          </NavLink>
        ) : (
          <NavLink onClick={signOutHandler} className="header__item">
            Exit
          </NavLink>
        )}
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <div style={{ textAlign: "center" }}>Your TODO List!</div>
      </footer>
    </div>
  );
};

export default Layout;
