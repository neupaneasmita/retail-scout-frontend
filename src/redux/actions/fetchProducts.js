// import axios from "axios";
import axiosInstance from "../../component/api/axiosInstance";
import * as actions from "../actions/productsAction";

function fetchProducts(values) {
    return (dispatch) => {
        axiosInstance
            .post(`/search-products`, values)
            .then(async (res) => {
                // console.log(res.data);
                if (!res.data.message) {
                    await dispatch(
                        actions.setProductList(
                            res.data
                        )
                    );
                }
            })
            .catch((err) => {
                console.log(err.response);
                // if (err.response.data.items.msg === "Token has expired") {
                //   localStorage.clear();
                //   window.location = "/";
                // }
            });
    };
}

export default fetchProducts;
