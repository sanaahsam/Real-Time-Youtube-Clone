import React, { createContext, useReducer, useEffect } from "react";

export const UserContext = createContext();

const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { User: action.payload };
    case "LOGOUT":
      return { User: null };
    default:
      return state;
  }
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, {
    User: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("YoutubeUser");
    if (storedUser) {
      dispatch({ type: "LOGIN", payload: JSON.parse(storedUser) });
    }
  }, [dispatch]);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
