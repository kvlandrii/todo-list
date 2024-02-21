import React, { useContext, useState, useRef } from "react";
import { LoginContext } from "./LoginContext.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.scss";

const Login = () => {
  const [isWrongLenght, setIsWrongLenght] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const passInputRef = useRef();
  const navigate = useNavigate();
  const url = `https://kvlandriitodos.onrender.com/users`;

  const { setId, login, setLogin, password, setPassword, setIsAuthenticated } =
    useContext(LoginContext);

  const loginChangeHandler = (e) => {
    setLogin(e.target.value);
    localStorage.setItem("login", e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    localStorage.setItem("password", e.target.value);
  };

  const signInHandler = () => {
    setIsWrongLenght(false);
    setIsWrong(false);
    setIsExist(false);
    setIsSignUpSuccessful(false);

    if (
      login.length > 3 &&
      password.length > 3 &&
      login.length < 15 &&
      password.length < 15
    ) {
      axios
        .get(url, {
          params: {
            login: login,
            password: password,
          },
        })
        .then((response) => {
          if (response.data.length) {
            setId(response.data[0].id);
            localStorage.setItem("id", response.data[0].id);
            setIsAuthenticated(true);
            localStorage.setItem("isAuthenticated", true);
            navigate("/todo");
          } else {
            setIsWrongLenght(false);
            setIsWrong(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setIsWrongLenght(true);
      setIsWrong(false);
    }
  };

  const signUpHandler = () => {
    setIsWrongLenght(false);
    setIsWrong(false);
    setIsExist(false);
    setIsSignUpSuccessful(false);

    if (
      login.length > 3 &&
      password.length > 3 &&
      login.length < 15 &&
      password.length < 15
    ) {
      axios
        .get(url, {
          params: {
            login: login,
          },
        })
        .then((response) => {
          if (response.data.length) {
            setIsExist(true);
            return;
          } else {
            axios
              .post(url, {
                id: Math.random().toString(36).substr(2, 9),
                login: login,
                password: password,
                todos: [],
              })
              .then(() => {
                setIsSignUpSuccessful(true);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setIsWrongLenght(true);
    }
  };

  const showPasswordHandler = () => {
    if (isShowPassword) {
      passInputRef.current.type = "password";
    } else {
      passInputRef.current.type = "text";
    }

    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="login">
      {isWrongLenght && <p>Wrong length of login or password</p>}
      {isWrong && <p>Wrong login or password</p>}
      {isSignUpSuccessful && <p>Sign Up Successful</p>}
      {isExist && (
        <>
          <p>User with this login already exists</p>
          <p>Try to Sign In</p>
        </>
      )}

      <div className="form">
        <input
          type="text"
          placeholder="Login"
          onChange={loginChangeHandler}
          value={login}
          className="form__input"
        />
        <input
          type="password"
          ref={passInputRef}
          placeholder="Password"
          onChange={passwordChangeHandler}
          value={password}
          className="form__input"
        />
        <div className="form__checkbox-container">
          <input
            type="checkbox"
            checked={isShowPassword}
            onChange={showPasswordHandler}
            className="form__input"
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
  );
};

export default Login;
