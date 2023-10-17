import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log("use effect");

    const isUserLoggedIn = localStorage.getItem("isLoggedIn");
    if (isUserLoggedIn === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const onLogin = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const onLogout = () => {
    localStorage.setItem("isLoggedIn", "0");
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, onLogin, onLogout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
