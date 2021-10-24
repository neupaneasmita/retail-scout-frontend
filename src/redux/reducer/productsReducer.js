import * as actions from '../actions/productsActionType';

const initialState = {
    message: '', products: [
        {
            id: "_1",
            image:
                "https://images.unsplash.com/photo-1519735777090-ec97162dc266?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1630&q=80",
            brand: "Nova",
            product_name: "Naturall Perfumes",
            details:
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at cupiditate debitis dolore ducimus facilis in inventore ipsam mollitia nesciunt, praesentium provident quia ratione repellendus sapiente, sit tempora totam, velit?",
            price: "$122",
            company_name: "Fashion Nova",
            company_website: "www.fashionnova.com",
        },
    ]
}


const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_PRODUCT_LIST:
            return {
                products: action.payload.products,
                message: action.payload.message,
            }
        default:
            return state
    }
}

export default productsReducer;