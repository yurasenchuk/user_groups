import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from "react-router-dom";
import ErrorBoundry from "./components/general/errorBoundry";
import store from "./store";
import APIService from "./services";
import APIServiceContext from "./servicesContext";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const apiService = new APIService();

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
                <APIServiceContext.Provider value={apiService}>
                    <Router>
                        <App/>
                    </Router>
                </APIServiceContext.Provider>
        </ErrorBoundry>
    </Provider>,
    document.getElementById('app')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
