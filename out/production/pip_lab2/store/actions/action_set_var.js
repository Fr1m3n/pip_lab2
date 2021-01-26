import ACTION_SET_X from "../action_creators/action_set_x";
import ACTION_SET_R from "../action_creators/action_set_r";
import ACTION_SET_Y from "../action_creators/action_set_y";

const createActionSetVariable = (varName, value) => {
    let name;
    switch (varName) {
        case "r":
            name = ACTION_SET_R;
            break
        case "x":
            name = ACTION_SET_X;
            break
        case "y":
            name = ACTION_SET_Y;
            break
    }
    return {
        type: name,
        payload: value
    }
}

export default createActionSetVariable;
