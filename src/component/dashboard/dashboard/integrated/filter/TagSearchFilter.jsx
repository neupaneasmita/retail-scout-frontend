import React, { useState, useRef, useEffect } from "react";
import search from "../../../../../assets/images/dashboard/search.svg";
import * as actions from "../../../../../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
const TagSearchFIlter = () => {
    const tagSearchData = useSelector((state) => state.fetchtableList.search_keyword);
    //Filter state
    const [filter, setFilter] = useState(tagSearchData);
    const searchInputRef = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        searchInputRef.current.focus();
        //----
        setFilter(tagSearchData);
    }, [tagSearchData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actions.setKeywordSearch(filter));
    };
    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="dashboard-input-box border-b border-divider rounded-b-none mb-4"
            >
                <span className="prefix">
                    <img src={search} alt="" className="" />
                </span>
                <input
                    className="dashboard-search-input-box"
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search by keywords"
                    onChange={(e) => setFilter(e.target.value)}
                    value={filter || ""}
                />
            </form>
        </>
    );
};

export default React.memo(TagSearchFIlter);
