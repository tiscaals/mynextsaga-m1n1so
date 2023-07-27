import { call, put } from 'redux-saga/effects'
import apimethod from '../../api/apimethod'
import { getAllProductRes, addProductRes, deleteProductRes, updateProductRes, getProductByIdRes } from '../action/actionReducer'


function* handleGetAllProduct():any{
    try {
        const result = yield call(apimethod.findAllProduct)
        // console.log('RESULT',result);
        
        yield put(getAllProductRes(result.data))
    } catch (error) {
        yield put(getAllProductRes({message:error, status:400}))
    }
}

function* handleGetProductById(action:any):any{
    try {
        const result = yield call(apimethod.findProductById, action.payload)
        // console.log('RESULT',result);
        
        yield put(getProductByIdRes(result.data))
    } catch (error) {
        yield put(getProductByIdRes({message:error, status:400}))
    }
}

function* handleAddProduct(action:any):any{
    try {
        const result = yield call(apimethod.createProduct, action.payload)

        yield put(addProductRes(result.data.result))
    } catch (error) {
        yield put(addProductRes({message:error, status:400}))
    }
}

function* handleUpdateProduct(action:any):any{
    try {
        const result = yield call(apimethod.updateProduct, action.payload)

        yield put(updateProductRes(result.data.result))
    } catch (error) {
        yield put(updateProductRes({message:error, status:400}))
    }
}

function* handleDeleteProduct(action:any):any{
    try {
        const result = yield call(apimethod.deleteProduct, action.payload)

        yield put(deleteProductRes(result.data.result))
    } catch (error) {
        yield put(deleteProductRes({message:error, status:400}))
    }
}

export {
    handleGetAllProduct,
    handleGetProductById,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct
}