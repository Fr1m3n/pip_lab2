import ACTION_SET_Y from "../action_creators/action_set_y";
import ACTION_SET_X from "../action_creators/action_set_x";
import ACTION_SET_R from "../action_creators/action_set_r";

const initialState = {
    x: 1,
    y: 1,
    r: 1
}

const variablesReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case ACTION_SET_Y: return { ...state, y: action.payload };
        case ACTION_SET_X: return { ...state, x: action.payload }
        case ACTION_SET_R: return { ...state, r: action.payload }
        default: return state;
    }
}

export default variablesReducer;