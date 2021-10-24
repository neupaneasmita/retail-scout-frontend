import * as actions from '../actions/productsActionType';

export const setProductList = (data) => {
    return {
        type: actions.SET_PRODUCT_LIST,
        payload: {
            message: data.message,
            products: data.products,
        }
    }
}