import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {CookiesProvider} from "react-cookie";
import {Provider} from "react-redux";
import store from "./store/store";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import appendScript from "./appendScript";


const root = ReactDOM.createRoot(document.getElementById('root'));

export let persistor = persistStore(store)

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <CookiesProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </CookiesProvider>
        </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
