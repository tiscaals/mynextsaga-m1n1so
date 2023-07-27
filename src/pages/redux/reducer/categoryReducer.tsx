import ActionTypes from "../action/actionType";

const initialState = {
    categories: [],
    message: '',
    status: 0,
    refresh: ''
}

function CategoryReducers(state = initialState, action: { type: any; payload: any; }) {
    const {type, payload} = action;
    // console.log(payload);
    switch (type){
        case ActionTypes.GET_CATEGORY_RES:
            return {state, categories: payload, refresh:true}
        // case ActionTypes.ADD_PRODUCT:
        //     return {message:payload.message, refresh:false}
        // case ActionTypes.UPDATE_PRODUCT:
        //     return {message:payload.message, refresh:false}
        // case ActionTypes.DEL_PRODUCT:
        //     return {message:payload.message, refresh:false}
        default:
            return state
    }
}

export default CategoryReducers