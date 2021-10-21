import React, { useState, useEffect, useMemo } from "react";

import Filter from "../common/Filter";
import CreateNewListModal from "./integrated/CreateNewListModal";
import RenameListModal from "./integrated/RenameListModal";
import Table from "./integrated/Table";
import TablePagination from "../common/TablePagination";
import Pagination from "../common/Pagination";
import axiosInstance from "../../api/axiosInstance";

import Toaster from "../../common/Toaster";

const Prospects = () => {
  //Toaster
  const [showToast, setShowToast] = useState(false);
  const [isSuccessMessageType, setIsSuccessMessageType] = useState(true);
  const [message, setMessage] = useState("");

  //List state
  const [lists, setLists] = useState([]);
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
  //Modal States
  const [openNewListModal, setOpenNewListModal] = useState(false);
  const [openRenameListModal, setOpenRenameListModal] = useState(false);

  const [currentList, setCurrentList] = useState({
    _id: "",
    name: "",
    items: [],
  });

  //Fetch Lists
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async() => {
    try {
      const response = await axiosInstance.get("/prospectlist");
      setLists(response.data);
      setLoading(false);
    } catch (error) {
      if(error.response){
        if (error.response.data.msg === "Token has expired") {
          localStorage.clear();
          window.location = "/";
        }
      }
    }
  };
  //Create and add new list
  const addList = async (list) => {
    try {
      const response = await axiosInstance.post("/prospectlist", list);
      setOpenNewListModal(false);
      //Showing Toaster Message
      setIsSuccessMessageType(true);
      setMessage(response.data.message);
      setShowToast((showToast) => !showToast);
      //Set lists instantly
      fetchData();
    } catch (error) {
      if (error.response) {
        //Showing Toaster Message
        setIsSuccessMessageType(false);
        setMessage(error.response.data.msg);
        setShowToast((showToast) => !showToast);
      }
    }
  };

  const editList = (list) => {
    setCurrentList({
      _id: list._id,
      name: list.name,
      items: list.items,
    });
    onOpenRenameListModal();
  };

  //Handle update
  const updateList = async (id, updateList) => {
    try {
      const response = await axiosInstance.put("/prospectlist", updateList);
      //Showing Toaster Message
      setIsSuccessMessageType(true);
      setMessage(response.data.message);
      setShowToast((showToast) => !showToast);
      // Update lists instantly
      fetchData();
      setOpenRenameListModal(false);
    } catch (error) {
      if (error.response && error.response.data.msg !== "Token has expired") {
        //Showing Toaster Message
        setIsSuccessMessageType(false);
        setMessage(error.response.data.msg);
        setShowToast((showToast) => !showToast);
      } else if (error.response.data.msg === "Token has expired") {
        localStorage.clear();
        window.location = "/";
      }
    }
  };

  //Remove Store
  const deleteList = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/removeprospectlist/${id}`
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

  //Open and Close Modal
  //Add Modal
  const onOpenNewListModal = () => {
    setOpenNewListModal(true);
  };
  const onCloseNewListModal = () => {
    setOpenNewListModal(false);
  };
  //Rename Modal
  const onOpenRenameListModal = () => {
    setOpenRenameListModal(true);
  };
  const onCloseRenameListModal = () => {
    setOpenRenameListModal(false);
  };

  const commentsData = useMemo(() => {
    let computedComments = lists;

    setListPerPage(itemsPerPage);
    /*console.log(listsPerPage);*/

    if (filter) {
      computedComments = computedComments.filter(
        (comment) => {
          const created_at = new Date(comment.timestamp).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });
          return (
            comment.name.toLowerCase().includes(filter.toLowerCase()) ||
            comment.items.length.toString().includes(filter.toString()) ||
            created_at.toLowerCase().includes(filter.toString())
          )
        }
      );
    }

    setNoOfPages(Math.ceil(computedComments.length / listsPerPage));

    return computedComments;
  }, [filter, lists, listsPerPage, itemsPerPage]);

  if (loading && lists.length === 0) {
    return null;
  }
  //Get current lists
  const indexOfLastPost = currentPage * listsPerPage;
  const indexOfFirstPost = indexOfLastPost - listsPerPage;
  const currentLists = commentsData.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      {/*Toaster Message*/}
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
                <Filter filter={filter} setFilter={setFilter} />
              </div>
              {/*Create New List Modal*/}
              <div>
                <div className="w-full flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className="heading-4 text-secondary">Prospects</div>
                    <div className="caption text-secondary mt-2">
                      {currentLists.length} of {lists.length} Lists
                    </div>
                  </div>
                  <div>
                    <div
                      className="primary-button min-w-min"
                      onClick={onOpenNewListModal}
                    >
                      Create New List
                    </div>
                  </div>
                </div>

                <CreateNewListModal
                  open={openNewListModal}
                  closeModal={onCloseNewListModal}
                  addList={addList}
                />
              </div>


              <div className="">
                  <Table
                    lists={currentLists}
                    editList={editList}
                    deleteList={deleteList}
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

      <RenameListModal
        open={openRenameListModal}
        closeModal={onCloseRenameListModal}
        updateList={updateList}
        currentList={currentList}
      />
    </>
  );
};

export default Prospects;
