import ActionTypes from "../action/actionType";

const initialState = {
    login: [],
    message: '',
    status: 0,
    refresh: ''
}

function LoginReducers(state = initialState, action: { type: any; payload: any; }) {
    const {type, payload} = action;
    console.log("PAYLOAD",payload);
    switch (type){
        case ActionTypes.RES_LOGIN:
            return {state, token: payload.result, status:payload.status, message:payload.message}
        default:
            return state
    }
}

export default LoginReducers