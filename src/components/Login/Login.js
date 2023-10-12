import React, { useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const checkEmailIsValid = (email) => email.includes("@");

const checkPasswordIsValid = (password) => password.trim().length > 5;

const formReducer = (state, action) => {
  if (action.type === "EMAIL_CHANGED") {
    return {
      ...state,
      email: action.value,
      isValid: action.value.isValid && state.password.isValid,
    };
  }

  if (action.type === "PASSWORD_CHANGED") {
    return {
      ...state,
      password: action.value,
      isValid: action.value.isValid && state.email.isValid,
    };
  }

  if (action.type === "EMAIL_BLUR") {
    const { email, password } = state;
    return {
      ...state,
      email: { ...email, isValid: checkEmailIsValid(email.value) },
      isValid: checkEmailIsValid(email.value) && password.isValid,
    };
  }

  if (action.type === "PASSWORD_BLUR") {
    const { email, password } = state;
    return {
      ...state,
      password: { ...password, isValid: checkPasswordIsValid(password.value) },
      isValid: checkPasswordIsValid(password.value) && email.isValid,
    };
  }

  return {
    isValid: null,
    email: { value: "", isValid: null },
    password: { value: "", isValid: null },
  };
};

const Login = (props) => {
  const [formState, dispatchFormState] = useReducer(formReducer, {
    isValid: null,
    email: { value: "", isValid: null },
    password: { value: "", isValid: null },
  });

  const emailChangeHandler = (event) => {
    const enteredEmail = event.target.value;
    dispatchFormState({
      type: "EMAIL_CHANGED",
      value: { value: enteredEmail, isValid: checkEmailIsValid(enteredEmail) },
    });
  };

  const passwordChangeHandler = (event) => {
    const enteredPassword = event.target.value;
    dispatchFormState({
      type: "PASSWORD_CHANGED",
      value: {
        value: enteredPassword,
        isValid: checkPasswordIsValid(enteredPassword),
      },
    });
  };

  const validateEmailHandler = () => {
    dispatchFormState({ type: "EMAIL_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchFormState({ type: "PASSWORD_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(formState.email.value, formState.password.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            formState.email.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={formState.email.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            formState.password.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formState.password.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!formState.isValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
