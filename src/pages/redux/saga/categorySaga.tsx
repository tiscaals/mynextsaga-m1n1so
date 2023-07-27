import { call, put } from 'redux-saga/effects'
import apimethod from '../../api/apimethod'
import { getAllCategoryRes } from '../action/actionReducer'


function* handleGetAllCategories():any{
    try {
        const result = yield call(apimethod.findAllCategory)
        // console.log("RESULT", result);
        
        yield put(getAllCategoryRes(result.data))
    } catch (error) {
        yield put(getAllCategoryRes({message:error, status:400}))
    }
}

export {
    handleGetAllCategories
}