import React from 'react';
import EntryCheckbox from "../EntryCheckbox/EntryCheckbox";
import EntryInput from "../EntryInput/EntryInput";
import {Button} from "react-toolbox";
import {connect} from "react-redux";
import createActionSetVariable from "../../store/actions/action_set_var";
import axios from "axios";
import createSetEntriesAction from "../../store/action_creators/action_set_entries";

const CHECKBOX_ITEMS = ['-4', '-3', '-2', '-1', '0', '1', '2', '3', '4'];

class EntryInputGroup extends React.Component {

    handleButtonClick(e) {
        if (this.isValid(this.props.y)) {
            axios.post("http://localhost:31430/api/entry", {
                x: this.props.x,
                y: this.props.y,
                r: this.props.r
            }, {
                headers: {
                    token: this.props.jwt
                }
            }).then((response) => {
                this.props.onSubmit()
            }).catch((error) => {

            })
        } else {
            
        }
    }

    render() {
        return <div>
            <EntryCheckbox onChange={this.props.setX} items={CHECKBOX_ITEMS} label="X"/>
            <EntryInput onChange={this.props.setY} label="Y"/>
            <EntryCheckbox onChange={this.props.setR} items={CHECKBOX_ITEMS} label="R"/>
            <Button label="Send entry"
                    onClick={this.handleButtonClick.bind(this)}/>
        </div>
    }

    isValid(value) {
        return this.isNumber(value) && value > -5 && value < 3;
    }

    isNumber(value) {
        return Number(value) === value;
    }

}

const mapDispatchToProps = (dispatch) => ({
    setX: x => dispatch(createActionSetVariable('x', x)),
    setY: y => dispatch(createActionSetVariable('y', y)),
    setR: r => dispatch(createActionSetVariable('r', r)),
    setEntries: (entries) => dispatch(createSetEntriesAction(entries))
})

const mapStateToProps = (state) => ({
    x: state.variables.x,
    y: state.variables.y,
    r: state.variables.r,
    jwt: state.user.jwt
})

export default connect(mapStateToProps, mapDispatchToProps)(EntryInputGroup);
export { CHECKBOX_ITEMS }