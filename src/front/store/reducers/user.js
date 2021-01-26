import ACTION_LOGIN from "../actions/action_login";
import ACTION_LOGOUT from "../actions/action_logout";
import ACTION_SET_ENTRIES from "../actions/action_set_entries";

const initialState = {
    jwt: null,
    entries: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_LOGIN: return { ...state, jwt: action.jwt };
        case ACTION_LOGOUT: return { ...state, jwt: null };
        case ACTION_SET_ENTRIES: return { ...state, entries: action.payload }
        default: return state;
    }
}

export default userReducer;