import React, {useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import fetchProducts from "../../../redux/actions/fetchProducts";
import ProductItems from "./ProductItems";


const Products = () => {
    const inputFieldRef = useRef();
    const data = useSelector(
        (state) => state.productsList.products
    );
    const dispatch = useDispatch();
    const getProductList = () => {
        const keyword = inputFieldRef.current.value;
        if (!keyword) return;

        dispatch(fetchProducts({
            "keyword": keyword,
        }));
    };
    return (
        <>
            <div className="w-full bg-white">
                <div className="container-wrapper pt-8 pb-10 md:pt-16 md:pb-20">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
                        <div className="title mb-4 lg:mb-0">
                            <div className="heading-2 text-secondary">
                                Search from millions
                            </div>
                            <div className="paragraph-body text-secondary opacity-80">
                                Best place to find products you always dreamed online.
                            </div>
                        </div>
                        <div className="text-end">
                            <form className="flex flex-col sm:flex-row w-full max-w-sm sm:space-x-3">
                                <div className="relative mb-2 sm:mb-0">
                                    <input
                                        type="text"
                                        ref={inputFieldRef}
                                        className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="Search item"
                                    />
                                </div>
                                <button className="primary-button" type="button" onClick={getProductList}>
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                    {/*Products*/}
                    <ProductItems data={data}/>
                </div>
            </div>
        </>
    );
};

export default Products;
