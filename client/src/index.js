import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { ChatContextProvider } from "./context/ChatContext";
import ScrollToTop from "./utils/ScrollToTop";
import { store } from "./redux/store";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

//import './App.css';
import "./assets/scss/style.scss";

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <ChatContextProvider>
      <Router history={history}>
        <ScrollToTop />
        <App />
      </Router>
    </ChatContextProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
