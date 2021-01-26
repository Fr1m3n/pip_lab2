import ACTION_LOGIN from "../actions/action_login";

const createLoginAction = (jwt) => ({
    type: ACTION_LOGIN,
    jwt: jwt
})

export default createLoginAction;