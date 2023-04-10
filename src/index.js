import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <Provider store={store}>
    <Router>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
      
    </Router>
    </Provider>
  </React.StrictMode>
);
