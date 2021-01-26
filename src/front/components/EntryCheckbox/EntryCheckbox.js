import createActionSetVariable from "../../store/actions/action_set_var";
import React from 'react';
import {Checkbox} from "react-toolbox";
import {connect} from "react-redux";
import styles from "./EntryCheckbox.css"

const initialValues = {
    '-4': false,
    '-3': false,
    '-2': false,
    '-1': false,
    '0': false,
    '1': false,
    '2': false,
    '3': false,
    '4': false,
}

class EntryCheckbox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            values: {},
            pervChoice: this.getValueFromProps()
        };
        for (let i = -4; i < 5; i++) {
            let key = i.toString();
            this.state.values[key] = false;
        }
    }

    handleChange = (field, value) => {
        if (value === true) {
            // if (this.state.pervChoice != null) {
            //     this.state.values[this.state.pervChoice] = false;
            // }
            // this.state.pervChoice = field;
            console.log(field)
            this.props.onChange(field)
        }
        // else {
        //     this.state.pervChoice = null;
        // }
        this.setState({
            values: {
                ...initialValues,
                [field]: value
            }
        })
    };

    getValueFromProps() {
        let temp;
        if (this.props.label.toLowerCase() === "x") {
            temp = this.props.x
        } else if (this.props.label.toLowerCase() === "r") {
            temp = this.props.r
        } else {
            temp = -100
        }
        return temp
    }

    updateValues() {
        for (let i = -4; i < 5; i++) {
            let key = i.toString();
            this.state.values[key] = key.toString().toLowerCase() === this.getValueFromProps().toString().toLowerCase();
        }
    }

    render() {
        this.updateValues()
        return (
            <div className={styles.root}>
                <span>{this.props.label}</span>
                {this.props.items.map((x, i) => {
                    return <Checkbox className={styles.text}
                                     label={x}
                                     checked={this.state.values[x.toString()]}
                                     onChange={this.handleChange.bind(this, x.toString())}/>
                })}
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    x: state.variables.x,
    r: state.variables.r
})

// const mapDispatchToProps = (dispatch) => ({
//     setX: (x) => dispatch(createActionSetVariable('x', x)),
//     setR: (r) => dispatch(createActionSetVariable('r', r))
// })

export default connect(mapStateToProps)(EntryCheckbox);