import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  registerUser,
  setLogin,
  setPassword,
} from "../store/slices/userSlise.js";
import "../SCSS/Login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const passInputRef = useRef();
  const { login, password, status } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const loginChangeHandler = (e) => {
    dispatch(setLogin(e.target.value));
    localStorage.setItem("login", e.target.value);
  };

  const passwordChangeHandler = (e) => {
    dispatch(setPassword(e.target.value));
    localStorage.setItem("password", e.target.value);
  };

  const signInHandler = () => {
    setMessage("");

    if (
      login.length > 3 &&
      password.length > 3 &&
      login.length < 15 &&
      password.length < 15
    ) {
      dispatch(loginUser({ login: login, password: password }))
        .then((action) => {
          if (action.payload === "User not found") {
            setMessage("Wrong login or password");
          } else {
            navigate("/todo");
          }
        })
        .catch((error) => {
          setMessage(error);
        });
    } else {
      setMessage("Wrong length of login or password");
    }
  };

  const signUpHandler = () => {
    setMessage("");
    if (
      login.length > 3 &&
      password.length > 3 &&
      login.length < 15 &&
      password.length < 15
    ) {
      dispatch(registerUser({ login: login, password: password }))
        .then((action) => {
          if (action.payload === "User already exist") {
            setMessage(action.payload);
          } else {
            setMessage("Register Successful");
          }
        })
        .catch((error) => {
          setMessage(error);
        });
    } else {
      setMessage("Wrong length of login or password");
    }
  };

  const showPasswordHandler = () => {
    passInputRef.current.type = isShowPassword ? "password" : "text";
    setIsShowPassword(!isShowPassword);
  };

  return (
    <>
      {status === "loading" && <p>{status}...</p>}
      {message && <p>{message}</p>}

      <div className="login">
        <div className="form">
          <input
            type="text"
            placeholder="Login"
            onChange={loginChangeHandler}
            value={login}
          />
          <input
            type="password"
            ref={passInputRef}
            placeholder="Password"
            onChange={passwordChangeHandler}
            value={password}
          />
          <div className="form__checkbox-container">
            <input
              type="checkbox"
              checked={isShowPassword}
              onChange={showPasswordHandler}
            />
            <span>Show password</span>
          </div>
          <div className="form__button-container">
            <button onClick={signInHandler} className="form__button">
              Login
            </button>
            <button onClick={signUpHandler} className="form__button">
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
