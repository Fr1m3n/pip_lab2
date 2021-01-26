import React from 'react';
import Auth from '../AuthPage/AuthPage'
import MainPage from '../MainPage/MainPage'
import store from "../../store/store";
import {connect} from "react-redux";
import createLoginAction from "../../store/action_creators/action_login_creator";
import axios from "axios";
import createSetEntriesAction from "../../store/action_creators/action_set_entries";
import styles from "./App.css";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
        }
    }

    setLogged(isLogged) {
        this.setState({
            isLogged: isLogged
        })
        console.log("set logged " + isLogged);
    }

    render() {
        let page;
        console.log(store.getState());
        if (this.props.jwt != null) {
            console.log("Logged");
            page = <MainPage loginListener={this.setLogged.bind(this)}/>
        } else {
            console.log("Not logged");
            page = <Auth loginListener={this.setLogged.bind(this)}/>
        }

        return (
                <div className={styles.root}>
                    <h1>Девятилов Роман выполнил ЛР4 вариант 31380</h1>
                    {page}

                </div>
        );
    }
}

const mapStateToProps = (state) => ({
    jwt: state.user.jwt
})

const mapDispatchToProps = (dispatch) => ({
    setJwt: (jwt) => dispatch(createLoginAction(jwt)),
    setEntries: (entries) => dispatch(createSetEntriesAction(entries))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);