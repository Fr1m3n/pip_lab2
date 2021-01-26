import React from 'react';
import { Input } from "react-toolbox";
import {connect} from "react-redux";

class EntryInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 1
        }
    }

    handleInput(value) {
        this.props.onChange(value);
        this.setState({
            value: value
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        return (
            <div>
                <Input
                    onChange={this.handleInput.bind(this)}
                    type='text'
                    value={this.props.y}
                    label={this.props.label}/>
            </div>
        );
    }


}

const mapStateToProps = (state) => ({
    y: state.variables.y
})

export default connect(mapStateToProps)(EntryInput);