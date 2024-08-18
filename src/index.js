import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UsersProvider } from './Components/UsersContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <UsersProvider> */}
      <App />
    {/* </UsersProvider> */}
  </React.StrictMode>
);
