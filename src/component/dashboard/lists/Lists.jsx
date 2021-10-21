import React, { useState, useEffect, useMemo } from "react";
import Filter from "../common/Filter";
import Pagination from "../common/Pagination";
import TablePagination from "../common/TablePagination";
import arrowLeft from "../../../assets/images/dashboard/analyst/arrow-left.svg";
import { useHistory } from "react-router-dom";
import ExportData from "./integrated/ExportDatas";
import axiosInstance from "../../api/axiosInstance";
import Toaster from "../../common/Toaster";

import Table from "./integrated/Table";

const Lists = ({ match }) => {
  //Toaster
  const [showToast, setShowToast] = useState(false);
  const [isSuccessMessageType, setIsSuccessMessageType] = useState(true);
  const [message, setMessage] = useState("");

  const [selected, setSelected] = useState([]);
  //Lists and Stores
  const [lists, setLists] = useState({});
  const [stores, setStores] = useState([]);
  //Filter state
  const [filter, setFilter] = useState("");
  //Pagination and Table Pagination State
  const [loading, setLoading] = useState(true);
  const [noOfPages, setNoOfPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  //Setting Items per page
  const [itemsPerPage, setItemsPerPage] = useState(10);
  //Lists per page
  const [listsPerPage, setListPerPage] = useState(null);

  //Go Back
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  //Fetch Lists
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);
  const fetchData = async () => {
    try {
      const id = match.params.id;
      const response = await axiosInstance.get(`/prospectlist/${id}`);
      setLists(response.data);
      setStores(response.data.items);
      setLoading(false);
    } catch (error) {
      console.log(error.res);
      if(error.response){
        if (error.response.data.msg === "Token has expired") {
          localStorage.clear();
          window.location = "/";
        }
      }
    }
  };

  //Remove Store
  const removeStore = async (id) => {
    const listId = match.params.id;
    try {
      const response = await axiosInstance.delete(
        `/removeprospectlistitem/${listId}/${id}`
      );
      //Showing Toaster Message
      setIsSuccessMessageType(true);
      setMessage(response.data.message);
      setShowToast((showToast) => !showToast);
      //Removing from list
      fetchData();
    } catch (error) {
      if (error.response) {
        //Showing Toaster Message
        setMessage(error.response.data.msg);
        setIsSuccessMessageType(false);
        setShowToast((showToast) => !showToast);
      }
    }
  };

  const commentsData = useMemo(() => {
    let computedComments = stores;

    setListPerPage(itemsPerPage);
    // console.log(listsPerPage);

    if (filter) {
      computedComments = computedComments.filter(
        (comment) =>
          comment.name.toLowerCase().includes(filter.toLowerCase())
      );
    }

    setNoOfPages(Math.ceil(computedComments.length / listsPerPage));

    return computedComments;
  }, [filter, listsPerPage, itemsPerPage, stores]);

  if (loading && lists.length === 0) {
    return <div className="">Loading...</div>;
  }

  //Get current lists
  const indexOfLastPost = currentPage * listsPerPage;
  const indexOfFirstPost = indexOfLastPost - listsPerPage;
  // console.log(commentsData);
  const currentLists = commentsData.slice(indexOfFirstPost, indexOfLastPost);
  // console.log(currentLists);

  return (
    <>
      {showToast && (
        <Toaster
          isSuccessMessageType={isSuccessMessageType}
          message={message}
          setShowToast={setShowToast}
          showToast={showToast}
        />
      )}

        <div className="dashboard-innerpage-body  relative overflow-x-hidden">
          <div className="overflow-x-auto">
            <div className="flex inside-page-main-wrapper">
                <div className="w-full overflow-auto scrollbar px-6">
                  <div className="pt-6">
                    <Filter
                      filter={filter}
                      setFilter={setFilter}
                      placeholder="Search for stores"
                    />
                  </div>
              {/*Back to prospects*/}
              <div className="w-full justify-start mt-7">
                <img
                  src={arrowLeft}
                  onClick={goBack}
                  className="w-7 h-7 cursor-pointer"
                  alt=""
                />
              </div>
              {/*List name || Count*/}
              <div className="my-6">
                <div className="w-full flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="heading-4 text-secondary">{lists.list_name}</div>
                    <div className="caption text-secondary mt-2">
                      {currentLists.length} stores of {stores.length} stores
                    </div>
                  </div>
                  <div>
                    <ExportData
                      selected={selected}
                      listName={lists.list_name}
                      numSelected={selected.length}
                      listId={match.params.id}
                    />
                  </div>
                </div>
              </div>

              <div className="">
                <Table
                  lists={currentLists}
                  selected={selected}
                  setSelected={setSelected}
                  removeStore={removeStore}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full border-t border-divider px-6 py-3 bg-white">
          <div className="flex flex-col md:flex-row md:justify-between space-y-2">
            <TablePagination
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
            />

            <Pagination filter={filter} pages={noOfPages} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Lists;
