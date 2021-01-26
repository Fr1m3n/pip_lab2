import EntryInputGroup from "../EntryInputGroup/EntryInputGroup";
import EntryCanvas from "../EntryCanvas/EntryCanvas";
import React from 'react';
import {Button} from "react-toolbox";
import store from "../../store/store";
import createLogoutAction from "../../store/action_creators/action_logout_creator";
import Table from "../Table/Table";
import axios from "axios";
import createLoginAction from "../../store/action_creators/action_login_creator";
import createSetEntriesAction from "../../store/action_creators/action_set_entries";
import {connect} from "react-redux";


class MainPage extends React.Component {

    constructor(props) {
        super(props);
    }

    handleLogoutClick() {
        store.dispatch(createLogoutAction());
        localStorage.removeItem("token");
        this.props.loginListener(false);
    }

    handleEntriesUpdate() {
        this.forceUpdate()
    }


    render() {

        this.updateEntries()
        return (
            <div>
                <EntryCanvas/>
                <EntryInputGroup onSubmit={this.handleEntriesUpdate.bind(this)}/>
                <Table/>
                <Button onClick={this.handleLogoutClick.bind(this)}
                        label="Logout"/>
            </div>
        )
    }

    updateEntries() {
        axios.get("http://localhost:31430/api/entry", {
            headers: {
                "token": this.props.jwt
            }
        }).then((response) => {
            console.log(response)
            this.props.setEntries(response.data);
        }).catch((error) => {

        })
    }
}

const mapStateToProps = (state) => ({
    jwt: state.user.jwt
})

const mapDispatchToProps = (dispatch) => ({
    setEntries: (entries) => dispatch(createSetEntriesAction(entries))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
