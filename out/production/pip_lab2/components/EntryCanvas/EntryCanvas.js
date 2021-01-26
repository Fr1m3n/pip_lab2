import React, { useRef } from 'react';
import store from "../../store/store";
import createActionSetVariable from "../../store/actions/action_set_var";
import connect from "react-redux/lib/connect/connect";
import {CHECKBOX_ITEMS} from "../EntryInputGroup/EntryInputGroup";

const CANVAS_WIDTH = document.documentElement.clientWidth;
const CANVAS_HEIGHT = 400;
const CENTER = {
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2
};
const R = Math.min(CANVAS_HEIGHT, CANVAS_WIDTH) / 2.5;
const AXES_MARGIN = R / 10;
const AXES_WIDTH = 2;
const ENTRY_RADIUS = 3;

// colors
const COLOR_BACKGROUND = "rgb(255,255,255)";
const COLOR_FUNCTION = "rgb(36,66,173)";
const COLOR_AXES = "rgb(0,0,0)";
const COLOR_ENTRY_SUCCESS = "rgb(0,255,0)";
const COLOR_ENTRY_FAIL = "rgb(255,0,0)";
const COLOR_CURRENT_ENTRY = "rgb(189,17,255)";

// function $(id) {
//     return document.getElementById(id);
// }



class EntryCanvas extends React.Component {
    constructor(props) {
        super(props);
        // this.canvasRef = useRef(null);
    }

    render() {
        this.canv = <canvas id="canvas" onClick={this.handleCanvasClick.bind(this)}/>
        return this.canv;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let canvas = document.getElementById("canvas");
        let c2d = canvas.getContext('2d');
        this.drawAll(c2d)
    }

    componentDidMount() {
        this.canvas();
    }

    getRValue() {
        return this.props.r;
    }

    getXValue() {
        return this.props.x;
    }

    getYValue() {
        return this.props.y;
    }

    handleCanvasClick(e) {

        let click = this.getCursorPosition(canvas, e);
        let rFromInput = this.getRValue();
        click.x = (click.x - CENTER.x) * rFromInput / R;

        console.log(click);
        this.props.setY((CENTER.y - click.y) * rFromInput / R);
        let xOptions = CHECKBOX_ITEMS;
        let flag = true;
        let temp = this.props.x;
        for (let i = 0; i < xOptions.length; i++) {
            if (click.x <= xOptions[i]) {
                if (i > 0 && xOptions[i] - click.x > click.x - xOptions[i - 1]) {
                    temp = xOptions[i - 1]
                } else {
                    temp = xOptions[i]
                }
                flag = false;
                break;
            }
        }
        if (flag) {
            temp = xOptions[xOptions.length - 1]
        }
        this.props.setX(temp)
        // this.drawAll(c2d);
    }

    canvas() {
        let canvas = document.getElementById("canvas");
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        let c2d = canvas.getContext("2d");
        canvas.addEventListener("click", function (e) {

        }.bind(this));
        let drawEvent = (e) => {
            this.drawAll(c2d);
        };

        // getXField().addEventListener('input', drawEvent)
        // getYField().addEventListener('input', drawEvent)
        // document.getElementById("form:checkButton").addEventListener('click', drawEvent)
        // getRField().addEventListener('click', drawEvent);

        this.drawAll(c2d);
    }

    drawAll(c2d) {
        console.log("Drawing");
        this.clear(c2d);
        this.drawFunction(c2d);
        this.drawAxes(c2d);
        this.drawEntries(c2d);
    }

    clear(c2d) {
        c2d.fillStyle = COLOR_BACKGROUND;
        c2d.fillRect(0, 0, c2d.canvas.width, c2d.canvas.height);
    }

    drawFunction(c2d) {
        c2d.fillStyle = COLOR_FUNCTION;
        this. drawCircle(c2d, CENTER.x, CENTER.y, R);

        c2d.fillStyle = COLOR_BACKGROUND;
        c2d.fillRect(CENTER.x - R, CENTER.y - R, R, 2 * R);
        c2d.fillRect(CENTER.x - R, CENTER.y, 2 * R, R);

        c2d.fillStyle = COLOR_FUNCTION;
        c2d.fillRect(CENTER.x, CENTER.y, R / 2, R);

        c2d.beginPath();
        c2d.moveTo(CENTER.x - R / 2, CENTER.y);
        c2d.lineTo(CENTER.x, CENTER.y + R / 2);
        c2d.lineTo(CENTER.x, CENTER.y);
        c2d.closePath();
        c2d.fill();
    }

    drawAxes(c2d) {
        c2d.strokeStyle = COLOR_AXES;
        c2d.lineWidth = AXES_WIDTH;

        c2d.beginPath();
        c2d.moveTo(CENTER.x, c2d.canvas.height - AXES_MARGIN);
        c2d.lineTo(CENTER.x, AXES_MARGIN);
        c2d.stroke();
        c2d.closePath();

        c2d.beginPath();
        c2d.moveTo(AXES_MARGIN, CENTER.y);
        c2d.lineTo(c2d.canvas.width - AXES_MARGIN, CENTER.y);
        c2d.stroke();
        c2d.closePath();

    }

    drawEntries(c2d) {
        let entries = this.getEntries();
        if (entries === null) {
            entries = [];
        }
        // if (checkXInput() && checkYInput()) {
        let drawEntry = function (entry) {
            if (entry.status === "INCLUDED") {
                c2d.fillStyle = COLOR_ENTRY_SUCCESS;
            } else if (entry.status === "EXCLUDED") {
                c2d.fillStyle = COLOR_ENTRY_FAIL;
            } else {
                c2d.fillStyle = COLOR_CURRENT_ENTRY;
            }
            let x = CENTER.x + (entry.x * R) / entry.r;
            let y = CENTER.y - (entry.y * R) / entry.r;
            this.drawCircle(c2d, x, y, ENTRY_RADIUS);
        };
        drawEntry.bind(this)({
            x: this.getXValue(),
            y: this.getYValue(),
            r: this.getRValue(),
            result: null
        });
        entries.forEach(drawEntry.bind(this));
    }

    getEntries() {
        return this.props.entries;
    }

    drawCircle(c2d, x, y, r) {
        c2d.beginPath();
        c2d.arc(x, y, r, 0, 2 * Math.PI, false);
        c2d.fill();
        c2d.lineWidth = 1;
        // c2d.stroke();
        c2d.closePath();
    }

    getCursorPosition(canv, event) {
        const rect = canv.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }


}

const mapDispatchToProps = (dispatch) => {
    return {
        setX: x => dispatch(createActionSetVariable('x', x)),
        setY: y => dispatch(createActionSetVariable('y', y)),
    }
}

const mapStateToProps = (state) => {
    return {
        x: state.variables.x,
        y: state.variables.y,
        r: state.variables.r,
        entries: state.user.entries
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryCanvas);