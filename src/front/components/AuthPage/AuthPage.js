import React from 'react'
import {useState} from 'react'
import {Input, Button} from "react-toolbox"
import axios from "axios";
import store from '../../store/store'
import createLoginAction from "../../store/action_creators/action_login_creator";
import {connect} from "react-redux";
import styles from './AuthPage.css'

class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login: 'login',
            password: 'password',
            errorVisible: false,
            error: ""
        }
        this.handleLoginChange = this.handleLoginChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSignInClick = this.handleSignInClick.bind(this)
        this.handleSignUpClick = this.handleSignUpClick.bind(this)
    }

    handleLoginChange(event) {
        this.setState({login: event})
    }

    handlePasswordChange(event) {
        this.setState({password: event})
    }

    handleSignInClick(event) {
        axios.post('http://localhost:31430/api/auth/register', {
            login: this.state.login,
            password: this.state.password
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
            switch (error.response.status) {
                case 500:
                    this.showError("User with presented login exist")
                    break
            }
        })
    }

    handleSignUpClick(event) {
        axios.get('http://localhost:31430/api/auth/login', {
            params: {
                login: this.state.login,
                password: this.state.password
            }
        }).then((response) => {
            this.props.setJwt(response.data.jwt)
            this.props.loginListener(true)
            localStorage.setItem("token", response.data.jwt)
        }).catch((error) => {
            console.log(error)
            console.log(error.response.status)
            switch (error.response.status) {
                case 404:
                    this.showError(error.response.data)
                    break
                case 400:
                    this.showError(error.response.data)
                    break
            }
        })
    }

    showError(text) {
        this.setState({
            error: text,
            errorVisible: true
        })
        setTimeout(() => {
            this.setState({
                errorVisible: false
            })
        }, 1000)
    }

    render() {
        return (
            <div className={styles.root}>
                <Input type='text' label='Login' name='Login' value={this.state.login}
                       onChange={this.handleLoginChange}/>
                <Input type='password' label='Password' name='Password' value={this.state.password}
                       onChange={this.handlePasswordChange}/>
                <Button label='Register'
                        onClick={this.handleSignInClick}
                        raised/>
                <Button label='Login'
                        primary
                        raised
                        onClick={this.handleSignUpClick}/>
                <div className={styles.error + ' ' + this.state.errorVisible ? styles.visible : styles.hidden}>{this.state.error}</div>

            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    jwt: state.user.jwt
})

const mapDispatchToProps = (dispatch) => ({
    setJwt: jwt => {
        dispatch(createLoginAction(jwt))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)