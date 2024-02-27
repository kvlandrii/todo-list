import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setId,
  setLogin,
  setPassword,
  setIsAuthenticated,
} from "../store/slices/userSlise.js";
import Loading from "./Loading.js";

const Layout = lazy(() => import("./Layout.js"));
const Home = lazy(() => import("./Home.js"));
const Todo = lazy(() => import("./TodoPage.js"));
const Edit = lazy(() => import("./Edit.js"));
const About = lazy(() => import("./About.js"));
const Login = lazy(() => import("./Login.js"));
const Error = lazy(() => import("./Error.js"));

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (localStorage.getItem("id")) {
      dispatch(setId(localStorage.getItem("id")));
    }
    if (localStorage.getItem("login")) {
      dispatch(setLogin(localStorage.getItem("login")));
    }
    if (localStorage.getItem("password")) {
      dispatch(setPassword(localStorage.getItem("password")));
    }
    if (localStorage.getItem("isAuthenticated")) {
      dispatch(
        setIsAuthenticated(JSON.parse(localStorage.getItem("isAuthenticated")))
      );
    }
  }, [dispatch]);

  return (
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
  );
}

export default App;
