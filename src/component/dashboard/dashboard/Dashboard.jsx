import React, {  Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Filter from "./integrated/filter/Filter";
import TagSearchFilter from "./integrated/filter/TagSearchFilter";
import Pagination from "./integrated/Pagination";
import CategoriesList from "./integrated/CategoriesList";
import ShortList from "./integrated/ShortList";
import AddToProspects from "./integrated/addtoprospects/AddToProspects";
import { useSelector, useDispatch } from "react-redux";
import EnhancedTable from "./integrated/EnhancedTable";
import fetchSelectFilterData from "../../../redux/actions/fetchSelectFilterData";
import Switch from "./integrated/Switch";
import {NavLink} from "react-router-dom";
import * as actions from "../../../redux/actions/action";
const DashboardTest = () => {
  const [open, setOpen] = useState(false);
  // const [trialLimitExceed, setTrialLimitExceed] = useState(false);
  const cancelButtonRef = useRef();
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const handleClose = () => {
    closeModal();
  };
  const message = useSelector(
    (state) => state.fetchtableList.message
  );

  const [selectedCategories, setSelectedCategories] = useState({
    platform: [],
    productCategory: [],
    technologyType: [],
    technologyName: [],
    technology: "",
    language: "",
    instagramFollowers: [],
    twitterFollowers: [],
    facebookFollowers: [],
    youtubeFollowers: [],
    pinterestFollowers: [],
    tiktokFollowers: [],
    companySize: [],
    //Checkboxes Filter for Followers
    checkboxFacebookFollowers: [],
    checkboxInstagramFollowers: [],
    checkboxPinterestFollowers: [],
    checkboxTiktokFollowers: [],
    checkboxTwitterFollowers: [],
    checkboxYoutubeFollowers: [],
    checkboxCompanySize: [],
  });
  
  const dispatch = useDispatch();
  const cat = useSelector((state) => state.fetchtableList);
  useEffect(() => {
    const values = {
      filter: {
        platform: cat.platform ? cat.platform : [],
        technology_names: cat.technology_names,
        technology_types: cat.technology_types,
        language: cat.language,
        product_categories: cat.product_categories
          ? cat.product_categories
          : [],
        advance_company_size: cat.company_size,
        advance_social_filter: [
          cat.instagram ? cat.instagram : {},
          cat.facebook ? cat.facebook : {},
          cat.youtube ? cat.youtube : {},
          cat.pintress ? cat.pintress : {},
          cat.twitter ? cat.twitter : {},
          cat.tiktok ? cat.tiktok : {},
        ],
        social_filter: {
            facebook: cat.facebook_filter ? cat.facebook_filter : [],
            instagram: cat.instagram_filter ? cat.instagram_filter : [],
            tiktok: cat.tiktok_filter ? cat.tiktok_filter : [],
            pinterest: cat.pinterest_filter ? cat.pinterest_filter : [],
            youtube: cat.youtube_filter ? cat.youtube_filter : [],
            twitter: cat.twitter_filter ? cat.twitter_filter : [],
        },
        company_size: cat.company_size_filter ? cat.company_size_filter : []
      },
      sort: cat.sort,
      search_store: cat.search,
      search_keyword: cat.search_keyword,
      page_number: cat.page_number,
      page_size: cat.page_size,
    };
    //console.log(values);
    dispatch(fetchSelectFilterData(values));
    // eslint-disable-next-line

    //openModal
    if(message === "Trial limit exceeded."){
      openModal(true);
    }
       // eslint-disable-next-line
  }, [cat.counter, message]);

  const tagSearchData = useSelector((state) => state.fetchtableList.search_keyword);
  const storeSearchData = useSelector((state) => state.fetchtableList.search);


  //ProspectsData////
  const [selected, setSelected] = useState([]);
  const [showFilter, setShowFilter] = useState(true);

  useState(() => {
    if (tagSearchData && storeSearchData) {
      setShowFilter(true);
    } else if(tagSearchData && !storeSearchData) {
      setShowFilter(false);
    }  else {
      setShowFilter(false);
    }
  }, [tagSearchData, storeSearchData])

  return (
    <>
      <div className="flex flex-col lg:flex-row dashboard-body overflow-x-hidden">
        <div className="w-full lg:min-w-84 lg:w-84 flex-none bg-primarygray lg:overflow-auto aside-filter text">
          <div className="p-6 aside-filter-section">
            {/*Filters Heading*/}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <div className="link text-secondary pl-1">Filters</div>
              </div>
              <div className="link cursor-pointer"
              onClick={()=>{
                dispatch(actions.clearAllFilterData())
              }}
              >Clear All</div>
            </div>
            {/* Filter Categories */}
            <CategoriesList
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
        </div>

        <div className="flex-1 relative overflow-x-auto">
          <div className="flex" style={{ maxHeight: "calc(100vh - 138px)" }}>
            <div className="w-full overflow-auto scrollbar px-6">
              <div className="mt-4">
                <div className="flex flex-col md:flex-row justify-between w-full md:items-center items-start gap-4">
                  <div className="w-full">
                    {showFilter ? <Filter /> : <TagSearchFilter />}
                  </div>
                  <div className="">
                    <Switch
                      isToggled={showFilter}
                      onToggled={() => setShowFilter(!showFilter)}
                    />
                    {/* <div className="text-primary px-4 py-2 rounded bg-primarygray hover:bg-gray-200 hover:bg-opacity-75 transition-all link cursor-pointer min-w-max" onClick={() => setShowFilter(!showFilter)}>
                      {showFilter ? 'Filter with tags' : 'Filter for stores'}
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                {/* ShortList */}
                <ShortList
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                />
                {/* Add to prospects */}
                <AddToProspects
                  numSelected={selected.length}
                  selected={selected}
                />
              </div>
              <div>
                <EnhancedTable selected={selected} setSelected={setSelected} />
              </div>
            </div>
          </div>
          <div className="lg:absolute lg:bottom-0 w-full bg-white z-20">
            <Pagination />
          </div>
        </div>
      </div>

      {/* On Open Modal */}
      
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 overflow-y-auto"
          initialFocus={cancelButtonRef}
          static
          open={open}
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full  max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <div className="flex items-center">
                    <div>
                      Maximum searches exceeded
                    </div>
                  </div>
                </Dialog.Title>

                <div className="py-6">  
                  <div className="caption-2 text-secondary">
                    You've exceeded the maximum number of searches for your trial account.
                    Upgrade your account to continue
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <NavLink to="/dashboard/profile">
                    <button
                      type="button"
                      className="primary-button text-secondary"
                    >
                      Upgrade
                    </button>
                  </NavLink>
                  <button
                    type="button"
                    ref={cancelButtonRef}
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-secondary bg-blue-100 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleClose}
                  >
                    Close
                  </button> 
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

    </>
  );
};

export default DashboardTest;
