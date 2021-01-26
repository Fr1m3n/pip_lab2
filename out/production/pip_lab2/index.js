import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import axios from "axios";
import createLoginAction from "./store/action_creators/action_login_creator";
import styles from './style.css'

window.React = React

if (localStorage.getItem("token") != null) {
    store.dispatch(createLoginAction(localStorage.getItem("token")))
}

let root = document.createElement("div")
document.body.appendChild(root)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    root
)


