import React from "react";
// import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import {} from "./Style.css";
import { Provider } from "react-redux";
import store, { persistor } from "./Redux/Store/Store";
import { AuthProvider } from "./API/AuthContextApi";

import { PersistGate } from "redux-persist/integration/react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
