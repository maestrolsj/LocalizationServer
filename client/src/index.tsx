import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import ReactDOM from "react-dom";
import client from "./apollo";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
require("dotenv").config();

console.log(process.env.REACT_APP_ACCESS_TOKEN_SECRET);
console.log(process.env.REACT_APP_API_BASE_URL);
console.log(process.env.NODE_ENV);

ReactDOM.render(
  <ApolloProvider client={client}>
    <UserProvider>
      <App />
    </UserProvider>
  </ApolloProvider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
