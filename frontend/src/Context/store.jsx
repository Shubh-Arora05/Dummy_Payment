import { useState, createContext, useEffect, useRef } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  let name = useRef(localStorage.getItem("name"));

  const [token, settoken] = useState(localStorage.getItem("token"));

  const storeTokenInLS = (severToken) => {
    if (!severToken) {
      settoken("");
    } else {
      settoken(severToken);
      localStorage.setItem("token", severToken);
      console.log(token);
      // window.location.reload() ;
      // setauth(`Bearer ${token}`);
      userAuthentication();
    }
  };

  const storename = (severname) => {
    name.current = severname;
    localStorage.setItem("name", severname);

    // console.log(name) ;
    // window.location.reload();
  };

  // const [authorizationToken, setauth] = useState(`Bearer ${token}`);
  const userAuthentication = async () => {
    if (token === "") {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/account/balance",
        {
          method: "GET",
          headers: {
            // "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        // window.location.reload();
        console.log(" data  : ", data);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // token , storeTokenInLS
  useState(() => {
    userAuthentication();
  }, []);

  return (
    <UserContext.Provider value={{ token, storeTokenInLS, storename, name }}>
      {children}
    </UserContext.Provider>
  );
};
