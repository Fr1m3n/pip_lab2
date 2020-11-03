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
const COLOR_BACKGROUND = document.body.style.backgroundColor;
const COLOR_FUNCTION = "rgb(36,66,173)";
const COLOR_AXES = "rgb(0,0,0)";
const COLOR_ENTRY_SUCCESS = "rgb(0,255,0)";
const COLOR_ENTRY_FAIL = "rgb(255,0,0)";
const COLOR_CURRENT_ENTRY = "rgb(189,17,255)";

// function $(id) {
//     return document.getElementById(id);
// }


document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.getElementById("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    let c2d = canvas.getContext("2d");
    canvas.addEventListener("click", function (e) {
        let click = getCursorPosition(canvas, e);
        let rFromInput = getRField().value;
        click.x = (click.x - CENTER.x) * rFromInput / R;

        console.log(click);
        getYField().value = (CENTER.y - click.y) * rFromInput / R;
        let xOptions = getXField().options;
        let flag = true;
        for (let i = 0; i < xOptions.length; i++) {
            if (click.x <= xOptions[i].value) {
                if (i > 0 && xOptions[i].value - click.x > click.x - xOptions[i - 1].value) {
                    xOptions[i - 1].selected = true;
                } else {
                    xOptions[i].selected = true;
                }
                flag = false;
                break;
            }
        }
        if (flag) {
            xOptions[xOptions.length - 1].selected = true;
        }

        draw(c2d);
    });
    let drawEvent = function (e) {
        draw(c2d);
    };
    getXField().addEventListener('input', drawEvent)
    getYField().addEventListener('input', drawEvent)
    document.getElementById("form:checkButton").addEventListener('click', drawEvent)
    getRField().addEventListener('click', drawEvent);

    draw(c2d);
})

function draw(c2d) {
    console.log("Drawing");
    clear(c2d);
    drawFunction(c2d);
    drawAxes(c2d);
    drawEntries(c2d);
}

function clear(c2d) {
    c2d.fillStyle = COLOR_BACKGROUND;
    c2d.fillRect(0, 0, c2d.canvas.width, c2d.canvas.height);
}

function drawFunction(c2d) {
    c2d.fillStyle = COLOR_FUNCTION;
    drawCircle(c2d, CENTER.x, CENTER.y, R);

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

function drawAxes(c2d) {
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

function drawEntries(c2d) {
    let entries = getEntries();
    if (entries === null) {
        entries = [];
    }
    // if (checkXInput() && checkYInput()) {
    let drawEntry = function (entry) {
        if (entry.result === "INCLUDED") {
            c2d.fillStyle = COLOR_ENTRY_SUCCESS;
        } else if (entry.result === "EXCLUDED") {
            c2d.fillStyle = COLOR_ENTRY_FAIL;
        } else {
            c2d.fillStyle = COLOR_CURRENT_ENTRY;
        }
        let x = CENTER.x + (entry.x * R) / entry.r;
        let y = CENTER.y - (entry.y * R) / entry.r;
        drawCircle(c2d, x, y, ENTRY_RADIUS);
    };
    drawEntry({
        x: getXValue(),
        // x: $('x-input').value,
        y: getYValue(),
        r: getRValue(),
        // r: getRValue(),
        result: null
    });
    // }
    entries.forEach(drawEntry);
}

function getEntries() {
    let res = [];
    let entriesNodes = document.getElementById("entries_table_data").childNodes;
    for (let i = 0; i < entriesNodes.length; i++) {
        let values = entriesNodes[i].childNodes;
        if (values.length === 1) {
            continue;
        }
        res.push({
            x: values[1].innerText,
            y: values[2].innerText,
            r: values[3].innerText,
            result: values[4].innerText
        })
    }
    return res;
}

function drawCircle(c2d, x, y, r) {
    c2d.beginPath();
    c2d.arc(x, y, r, 0, 2 * Math.PI, false);
    c2d.fill();
    c2d.lineWidth = 1;
    // c2d.stroke();
    c2d.closePath();
}

function getCursorPosition(canv, event) {
    const rect = canv.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}