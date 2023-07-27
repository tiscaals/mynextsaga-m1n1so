import ActionTypes from "../action/actionType";

const initialState = {
    products: [],
    message: '',
    status: 0,
    refresh: ''
}

function ProductReducers(state = initialState, action: { type: any; payload: any; }) {
    const {type, payload} = action;
    // console.log(payload);
    switch (type){
        case ActionTypes.GET_PRODUCT_RES:
            return {state, products: payload, refresh:true}
        case ActionTypes.GET_PRODUCT_ID_RES:
            return {state, products: payload, refresh:true}
        case ActionTypes.ADD_PRODUCT_RES:
            return {message:payload.message, status: payload.status, refresh:false}
        case ActionTypes.UPDATE_PRODUCT_RES:
            return {message:payload.message, status: payload.status, refresh:false}
        case ActionTypes.DEL_PRODUCT_RES:
            return {message:payload.message, status: payload.status, refresh:false}
        default:
            return state
    }
}

export default ProductReducers