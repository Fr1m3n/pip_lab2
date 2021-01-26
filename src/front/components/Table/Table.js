import React from 'react'
import {connect} from "react-redux";
import styles from "./Table.css"

class Table extends React.Component {

    render() {
        return (
            <div>
                <table className={styles.table}>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Result</th>
                    </tr>
                    {this.props.entries.map((entry, index) => {
                        return (
                            <tr key={index}>
                                <td>{entry.x}</td>
                                <td>{entry.y}</td>
                                <td>{entry.r}</td>
                                <td>{entry.status}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    entries: state.user.entries
})

export default connect(mapStateToProps)(Table)