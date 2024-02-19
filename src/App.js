import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { LoginContext } from "./LoginContext.js";

import Loading from "./Loading";

const Layout = lazy(() => import("./Layout"));
const Home = lazy(() => import("./Home"));
const Todo = lazy(() => import("./Todo"));
const Edit = lazy(() => import("./Edit"));
const About = lazy(() => import("./About"));
const Login = lazy(() => import("./Login"));
const Error = lazy(() => import("./Error"));

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [id, setId] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("id")) {
      setId(localStorage.getItem("id"));
    }
    if (localStorage.getItem("login")) {
      setLogin(localStorage.getItem("login"));
    }
    if (localStorage.getItem("password")) {
      setPassword(localStorage.getItem("password"));
    }
    if (localStorage.getItem("isAuthenticated")) {
      setIsAuthenticated(JSON.parse(localStorage.getItem("isAuthenticated")));
    }
  }, [id, login, password, isAuthenticated]);

  return (
    <LoginContext.Provider
      value={{
        id,
        setId,
        login,
        setLogin,
        password,
        setPassword,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />}></Route>
            <Route path="*" element={<Error />}></Route>

            <Route path="about" element={<About />}></Route>
            <Route path="edit" element={<Edit />}></Route>
            <Route path="login" element={<Login />}></Route>

            <Route
              path="todo"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Todo />
                </ProtectedRoute>
              }
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </LoginContext.Provider>
  );
}

export default App;
