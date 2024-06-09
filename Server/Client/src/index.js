import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import DrawerContextProvider from "./context/DrawerContext";
import UserContextProvider from "./context/UserContext";
import AllRoutes from "./AllRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="75479669828-23qi9lqanpkeitb21uih75gcvctfk5sq.apps.googleusercontent.com">
      <BrowserRouter>
        <UserContextProvider>
          <DrawerContextProvider>
            <AllRoutes />
          </DrawerContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
