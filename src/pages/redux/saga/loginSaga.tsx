import { call, put } from 'redux-saga/effects'
import apimethod from '../../api/apimethod'
import { loginRes } from '../action/actionReducer'


function* handleLogin(action:any):any{
    try {
        const result = yield call(apimethod.login, action.payload)
        console.log("RESULT", result.data);
        if (result.data.status != 400) {
            localStorage.setItem('AuthToken', result.data.result);
            yield put(
                loginRes({
                token: result.data.result,
                message: result.data.message,
                status: result.data.status,
                })
            );
        } else {
            yield put(
                loginRes({
                token: "",
                message: result.data.message,
                status: result.data.status,
                })
            );
        }
        
        
        yield put(loginRes(result.data))
    } catch (error) {
        yield put(loginRes({message:error, status:400}))
    }
}

export {
    handleLogin
}