import React from "react";
import { ReactComponent as Cross } from "../../../../assets/images/dashboard/cross.svg";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/actions/action";
import monitor from "../../../../assets/images/dashboard/analyst/monitor.svg"


//Render Number to put comma and get as 1M, 10M ...
const RenderNumber = ({ number }) => {
  const numFormatter = (num) => {
    // if (num >= 1000 && num < 1000000) {
    //   return (num / 1000).toFixed(0) + "K"; // convert to K for number from > 1000 < 1 million
    // } else
    if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + "M"; // convert to M for number from > 1 million
    } else if (num < 1000000) {
      return Intl.NumberFormat("en-US").format(num); // if value < 1000, nothing to do
    }
  };
  const getNumber = (number) => {
    const str = number.split("-"); //Split of number befor and after '-' sign
    if (str[1] === undefined) {
      return numFormatter(str[0]) + " + ";
    } else {
      return numFormatter(str[0]) + " - " + numFormatter(str[1]);
    }
  };
  return <>{getNumber(number)}</>;
};

const ShortList = ({ selectedCategories, setSelectedCategories }) => {
  const dispatch = useDispatch();
  const sortedData = useSelector((state) => state.fetchtableList);
  //Advanced Filter
  let advancedFacebookValue;
  let advancedInstagramValue;
  let advancedPinterestValue;
  let advancedTwitterValue;
  let advancedYoutubeValue;
  let advancedTiktokValue;
  let advancedCompanySizeValue;
  if(sortedData.facebook){
    advancedFacebookValue = `${sortedData.facebook.facebook.min}${sortedData.facebook.facebook.max ? "-" : ""}${sortedData.facebook.facebook.max ? sortedData.facebook.facebook.max : ""}`;
  }
  if(sortedData.instagram){
    advancedInstagramValue = `${sortedData.instagram.instagram.min}${sortedData.instagram.instagram.max ? "-" : ""}${sortedData.instagram.instagram.max ? sortedData.instagram.instagram.max : ""}`;
  }
  if(sortedData.pintress){
    advancedPinterestValue = `${sortedData.pintress.pintress.min}${sortedData.pintress.pintress.max ? "-" : ""}${sortedData.pintress.pintress.max ? sortedData.pintress.pintress.max : ""}`;
  }
  if(sortedData.twitter){
    advancedTwitterValue = `${sortedData.twitter.twitter.min}${sortedData.twitter.twitter.max ? "-" : ""}${sortedData.twitter.twitter.max ? sortedData.twitter.twitter.max : ""}`;
  }
  if(sortedData.youtube){
    advancedYoutubeValue = `${sortedData.youtube.youtube.min}${sortedData.youtube.youtube.max ? "-" : ""}${sortedData.youtube.youtube.max ? sortedData.youtube.youtube.max : ""}`;
  }
  if(sortedData.tiktok){
    advancedTiktokValue = `${sortedData.tiktok.tiktok.min}${sortedData.tiktok.tiktok.max ? "-" : ""}${sortedData.tiktok.tiktok.max ? sortedData.tiktok.tiktok.max : ""}`;
  }
  if(Object.keys(sortedData.company_size).length !== 0){
    advancedCompanySizeValue = `${sortedData.company_size.min}${sortedData.company_size.max ? "-" : ""}${sortedData.company_size.max ? sortedData.company_size.max : ""}`;
  }
  // console.log(sortedData);
  
  //Platform
  const removeShortListPlatform = (removedItem) => {
    dispatch(actions.filterPlatformList(removedItem));
    // setSelectedCategories({
    //   ...selectedCategories,
    //   platform: selectedCategories.platform.filter(
    //     (item) => item !== removedItem
    //   ),
    // });
  };

  //Technology Type
  const removeShortListTechnologyType = (removedItem) => {
    dispatch(actions.filterTechnologyTypes(removedItem));
    // setSelectedCategories({
    //   ...selectedCategories,
    //   technologyType: selectedCategories.technologyType.filter(
    //     (item) => item !== removedItem
    //   ),
    // });
  };

  //Technology Name
  const removeShortListTechnologyName = (removedItem) => {
    dispatch(actions.filterTechnologyNames(removedItem));
    // setSelectedCategories({
    //   ...selectedCategories,
    //   technologyName: selectedCategories.technologyName.filter(
    //     (item) => item !== removedItem
    //   ),
    // });
  };

  //Product Catrgory
  const removeShortListProductCategory = (removedItem) => {
    dispatch(actions.filterCategoryList(removedItem));
    // setSelectedCategories({
    //   ...selectedCategories,
    //   productCategory: selectedCategories.productCategory.filter(
    //     (item) => item !== removedItem
    //   ),
    // });
  };

  //Product Language
  const removeShortListLanguage = () => {
    dispatch(actions.setLanguageList(""));
    // setSelectedCategories({
    //   ...selectedCategories,
    //   language: selectedCategories.language === "",
    // });
  };

  //Facebook Followers
  const removeShortListFacebookFollowers = (removedItem) => {
    const newRemovedItem = {
      min: removedItem.min,
      max: removedItem.max
    }
    dispatch(actions.filterFacebookFilter(newRemovedItem));
    // setSelectedCategories({
    //   ...selectedCategories,
    //   checkboxFacebookFollowers:
    //     selectedCategories.checkboxFacebookFollowers.filter(
    //       (item) => item !== removedItem
    //     ),
    // });
  };

  //Instagram Followers
  const removeShortListInstagramFollowers = (removedItem) => {
    const newRemovedItem = {
      min: removedItem.min,
      max: removedItem.max
    }
    dispatch(actions.filterInstagramFilter(newRemovedItem));
    // setSelectedCategories({
    //   ...selectedCategories,
    //   checkboxInstagramFollowers:
    //     selectedCategories.checkboxInstagramFollowers.filter(
    //       (item) => item !== removedItem
    //     ),
    // });
  };

  //Instagram Followers
  const removeShortListPinterestFollowers = (removedItem) => {
    const newRemovedItem = {
      min: removedItem.min,
      max: removedItem.max
    }
    dispatch(actions.filterPinterestFilter(newRemovedItem));
    // setSelectedCategories({
    //   ...selectedCategories,
    //   checkboxPinterestFollowers:
    //     selectedCategories.checkboxPinterestFollowers.filter(
    //       (item) => item !== removedItem
    //     ),
    // });
  };

  //Tiktok Followers
  const removeShortListTiktokFollowers = (removedItem) => {
    const newRemovedItem = {
      min: removedItem.min,
      max: removedItem.max
    }
    dispatch(actions.filterTiktokFilter(newRemovedItem));
    // setSelectedCategories({
    //   ...selectedCategories,
    //   checkboxTiktokFollowers:
    //     selectedCategories.checkboxTiktokFollowers.filter(
    //       (item) => item !== removedItem
    //     ),
    // });
  };

  //Twitter Followers
  const removeShortListTwitterFollowers = (removedItem) => {
    const newRemovedItem = {
      min: removedItem.min,
      max: removedItem.max
    }
    dispatch(actions.filterTwitterFilter(newRemovedItem));
    // setSelectedCategories({
    //   ...selectedCategories,
    //   checkboxTwitterFollowers:
    //     selectedCategories.checkboxTwitterFollowers.filter(
    //       (item) => item !== removedItem
    //     ),
    // });
  };

  //Youtube Followers
  const removeShortListYoutubeFollowers = (removedItem) => {
    const newRemovedItem = {
      min: removedItem.min,
      max: removedItem.max
    }
    dispatch(actions.filterYoutubeFilter(newRemovedItem));
    // setSelectedCategories({
    //   ...selectedCategories,
    //   checkboxYoutubeFollowers:
    //     selectedCategories.checkboxYoutubeFollowers.filter(
    //       (item) => item !== removedItem
    //     ),
    // });
  };

  //Company Size
  const removeShortListCompanySize = (removedItem) => {
    const newRemovedItem = {
      min: removedItem.min,
      max: removedItem.max
    }
    dispatch(actions.filterCompanySizeFilter(newRemovedItem));
    // setSelectedCategories({
    //   ...selectedCategories,
    //   checkboxCompanySize: selectedCategories.checkboxCompanySize.filter(
    //     (item) => item !== removedItem
    //   ),
    // });
  };

  // console.log(selectedCategories);

  return (
    <>
      <div className="flex flex-col">
        {/* Platform */}
        <div>
          {sortedData.platform.length > 0 && (
            <>
              <div className="flex flex-row flex-wrap items-center space-x-3">
                {/* <div className="paragraph text-secondary">Platform</div> */}
                {sortedData.platform.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center rounded my-1 border border-primary p-3"
                    >
                      <img src={monitor} className="mr-2" alt="" />

                      <div className="text-sm leading-4 font-semibold text-secondary">{item}</div>
                      <div
                        className="pl-1 cursor-pointer"
                        onClick={() => removeShortListPlatform(item)}
                      >
                        <Cross />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        {/* Technology Type */}
        <div>
          {sortedData.technology_types.length > 0 && (
            <>
              <div className="flex flex-row flex-wrap items-center space-x-3">
                {/* <div className="paragraph text-secondary">Technology Type</div> */}
                {sortedData.technology_types.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center rounded my-1 border border-primary p-3"
                    >
                      <div className="mr-2 fill-current text-secondary">
                        <svg width="16" height="16" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.933,15.055H3.479A3.232,3.232,0,0,1,.25,11.827V3.478A3.232,3.232,0,0,1,3.479.25h8.454a3.232,3.232,0,0,1,3.228,3.228v8.349A3.232,3.232,0,0,1,11.933,15.055ZM3.479,2.75a.73.73,0,0,0-.729.728v8.349a.73.73,0,0,0,.729.728h8.454a.729.729,0,0,0,.728-.728V3.478a.729.729,0,0,0-.728-.728Z"/><path d="M11.974,34.75H3.52A3.233,3.233,0,0,1,.291,31.521V23.173A3.232,3.232,0,0,1,3.52,19.945h8.454A3.232,3.232,0,0,1,15.2,23.173v8.348A3.232,3.232,0,0,1,11.974,34.75ZM3.52,22.445a.73.73,0,0,0-.729.728v8.348a.73.73,0,0,0,.729.729h8.454a.73.73,0,0,0,.728-.729V23.173a.729.729,0,0,0-.728-.728Z"/><path d="M31.522,34.75H23.068a3.233,3.233,0,0,1-3.229-3.229V23.173a3.232,3.232,0,0,1,3.229-3.228h8.454a3.232,3.232,0,0,1,3.228,3.228v8.348A3.232,3.232,0,0,1,31.522,34.75Zm-8.454-12.3a.73.73,0,0,0-.729.728v8.348a.73.73,0,0,0,.729.729h8.454a.73.73,0,0,0,.728-.729V23.173a.729.729,0,0,0-.728-.728Z"/><path d="M27.3,15.055a7.4,7.4,0,1,1,7.455-7.4A7.437,7.437,0,0,1,27.3,15.055Zm0-12.3a4.9,4.9,0,1,0,4.955,4.9A4.935,4.935,0,0,0,27.3,2.75Z"/>
                        </svg>
                      </div>
                      <div className="text-sm leading-4 font-semibold text-secondary">{item}</div>
                      <div
                        className="pl-1 cursor-pointer"
                        onClick={() => removeShortListTechnologyType(item)}
                      >
                        <Cross />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        {/* Technology Name */}
        <div>
          {sortedData.technology_names.length > 0 && (
            <>
              <div className="flex flex-row flex-wrap items-center space-x-3">
                {/* <div className="paragraph text-secondary">Technology Name</div> */}

                {sortedData.technology_names.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center rounded my-1 border border-primary p-3"
                    >
            <img src={monitor} className="mr-2" alt="" />

                      <div className="text-sm leading-4 font-semibold text-secondary">{item}</div>
                      <div
                        className="pl-1 cursor-pointer"
                        onClick={() => removeShortListTechnologyName(item)}
                      >
                        <Cross />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        {/* Product Category */}
        <div>
          {sortedData.product_categories.length > 0 && (
            <>
              <div className="flex flex-row flex-wrap items-center space-x-3">
                {/* <div className="paragraph text-secondary">Product Category</div> */}

                {sortedData.product_categories.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center rounded my-1 border border-primary p-3"
                    >
                      <div className="mr-2 fill-current text-secondary">
                        <svg width="16" height="16" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.933,15.055H3.479A3.232,3.232,0,0,1,.25,11.827V3.478A3.232,3.232,0,0,1,3.479.25h8.454a3.232,3.232,0,0,1,3.228,3.228v8.349A3.232,3.232,0,0,1,11.933,15.055ZM3.479,2.75a.73.73,0,0,0-.729.728v8.349a.73.73,0,0,0,.729.728h8.454a.729.729,0,0,0,.728-.728V3.478a.729.729,0,0,0-.728-.728Z"/><path d="M11.974,34.75H3.52A3.233,3.233,0,0,1,.291,31.521V23.173A3.232,3.232,0,0,1,3.52,19.945h8.454A3.232,3.232,0,0,1,15.2,23.173v8.348A3.232,3.232,0,0,1,11.974,34.75ZM3.52,22.445a.73.73,0,0,0-.729.728v8.348a.73.73,0,0,0,.729.729h8.454a.73.73,0,0,0,.728-.729V23.173a.729.729,0,0,0-.728-.728Z"/><path d="M31.522,34.75H23.068a3.233,3.233,0,0,1-3.229-3.229V23.173a3.232,3.232,0,0,1,3.229-3.228h8.454a3.232,3.232,0,0,1,3.228,3.228v8.348A3.232,3.232,0,0,1,31.522,34.75Zm-8.454-12.3a.73.73,0,0,0-.729.728v8.348a.73.73,0,0,0,.729.729h8.454a.73.73,0,0,0,.728-.729V23.173a.729.729,0,0,0-.728-.728Z"/><path d="M27.3,15.055a7.4,7.4,0,1,1,7.455-7.4A7.437,7.437,0,0,1,27.3,15.055Zm0-12.3a4.9,4.9,0,1,0,4.955,4.9A4.935,4.935,0,0,0,27.3,2.75Z"/>
                        </svg>
                      </div>
                      <div className="text-sm leading-4 font-semibold text-secondary">{item}</div>
                      <div
                        className="pl-1 cursor-pointer"
                        onClick={() => removeShortListProductCategory(item)}
                      >
                        <Cross />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        {/* Language */}
        <div>
          {sortedData.language.length > 0 && (
            <>
              <div className="flex flex-row flex-wrap items-center space-x-3">
                {/* <div className="paragraph text-secondary">Language</div> */}
                <div className="flex items-center rounded my-1 border border-primary p-3">
                <div className="mr-2 fill-current text-secondary">
          <svg  width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g><g><path d="M17,20H2.5C1.122,20,0,18.878,0,17.5v-15C0,1.122,1.122,0,2.5,0h8c0.214,0,0.404,0.136,0.473,0.338l6.5,19    c0.052,0.152,0.027,0.321-0.066,0.452C17.313,19.922,17.162,20,17,20z M2.5,1C1.673,1,1,1.673,1,2.5v15C1,18.327,1.673,19,2.5,19    h13.8L10.143,1H2.5z"/></g><g><path d="M21.5,24h-8c-0.208,0-0.395-0.129-0.468-0.324l-1.5-4c-0.097-0.259,0.034-0.547,0.292-0.644    c0.259-0.096,0.547,0.034,0.644,0.292L13.847,23H21.5c0.827,0,1.5-0.673,1.5-1.5v-15C23,5.673,22.327,5,21.5,5H12    c-0.276,0-0.5-0.224-0.5-0.5S11.724,4,12,4h9.5C22.878,4,24,5.122,24,6.5v15C24,22.878,22.878,24,21.5,24z"/></g><g><path d="M13.5,24c-0.117,0-0.234-0.041-0.329-0.124c-0.208-0.182-0.229-0.498-0.047-0.706l3.5-4    c0.182-0.209,0.498-0.229,0.706-0.047c0.208,0.182,0.229,0.498,0.047,0.706l-3.5,4C13.777,23.942,13.639,24,13.5,24z"/></g><g><path d="M9.5,14c-0.206,0-0.398-0.127-0.471-0.332L7,7.987l-2.029,5.681c-0.093,0.26-0.38,0.396-0.639,0.303    c-0.26-0.093-0.396-0.379-0.303-0.639l2.5-7c0.142-0.398,0.8-0.398,0.941,0l2.5,7c0.093,0.26-0.042,0.546-0.303,0.639    C9.613,13.991,9.556,14,9.5,14z"/></g><g><path d="M8,11H6c-0.276,0-0.5-0.224-0.5-0.5S5.724,10,6,10h2c0.276,0,0.5,0.224,0.5,0.5S8.276,11,8,11z"/></g><g><path d="M21.5,11h-7c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h7c0.276,0,0.5,0.224,0.5,0.5S21.776,11,21.5,11z"/></g><g><path d="M17.5,11c-0.276,0-0.5-0.224-0.5-0.5v-1C17,9.224,17.224,9,17.5,9S18,9.224,18,9.5v1C18,10.776,17.776,11,17.5,11z"/></g><g><path d="M16,17c-0.157,0-0.311-0.073-0.408-0.21c-0.16-0.225-0.107-0.537,0.118-0.697c2.189-1.555,3.79-4.727,3.79-5.592    c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5c0,1.318-1.927,4.785-4.21,6.408C16.202,16.97,16.101,17,16,17z"/></g><g><path d="M20,18c-0.121,0-0.242-0.043-0.337-0.131c-0.363-0.332-3.558-3.283-4.126-4.681c-0.104-0.256,0.02-0.547,0.275-0.651    c0.253-0.103,0.547,0.019,0.651,0.275c0.409,1.007,2.936,3.459,3.875,4.319c0.204,0.187,0.217,0.502,0.031,0.707    C20.27,17.945,20.135,18,20,18z"/></g></g><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/>
          </svg>
        </div>
                  <div className="text-sm leading-4 font-semibold text-secondary">
                    {sortedData.language}
                  </div>
                  <div
                    className="pl-1 cursor-pointer"
                    onClick={removeShortListLanguage}
                  >
                    <Cross />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {/* Facebook Followers */}
        <div>
            <>
              <div className="flex flex-row flex-wrap items-center space-x-3">
                {sortedData.facebook_filter.map(
                  (item, index) => {
                    const value = `${item.min}${item.max ? "-" : ""}${item.max ? item.max : ""}`
                    return (
                      <div
                        key={index}
                        className="flex items-center rounded my-1 border border-primary p-3"
                      >
                        <div className="mr-2 fill-current text-secondary">
              <svg width="16" height="16" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 35.9789 8.77641 45.908 20.25 47.7084V30.9375H14.1562V24H20.25V18.7125C20.25 12.6975 23.8331 9.375 29.3152 9.375C31.9402 9.375 34.6875 9.84375 34.6875 9.84375V15.75H31.6613C28.68 15.75 27.75 17.6002 27.75 19.5V24H34.4062L33.3422 30.9375H27.75V47.7084C39.2236 45.908 48 35.9789 48 24Z" fill="currentColor" />
              </svg>
            </div>
                        <div className="text-sm leading-4 font-semibold text-secondary">
                          <RenderNumber number={value} />
                        </div>
                        <div
                          className="pl-1 cursor-pointer"
                          onClick={() => removeShortListFacebookFollowers(item)}
                        >
                          <Cross />
                        </div>
                      </div>
                    );
                  }
                )}
                {sortedData.facebook && <div
                  className="flex items-center rounded my-1 border border-primary p-3"
                      >
                        <div className="mr-2 fill-current text-secondary">
              <svg width="16" height="16" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 35.9789 8.77641 45.908 20.25 47.7084V30.9375H14.1562V24H20.25V18.7125C20.25 12.6975 23.8331 9.375 29.3152 9.375C31.9402 9.375 34.6875 9.84375 34.6875 9.84375V15.75H31.6613C28.68 15.75 27.75 17.6002 27.75 19.5V24H34.4062L33.3422 30.9375H27.75V47.7084C39.2236 45.908 48 35.9789 48 24Z" fill="currentColor" />
              </svg>
            </div>
                        <div className="text-sm leading-4 font-semibold text-secondary">
                          <RenderNumber number={advancedFacebookValue} />
                        </div>
                        <div
                          className="pl-1 cursor-pointer"
                          onClick={() => dispatch(actions.setFacebook(""))}
                        >
                          <Cross />
                        </div>
                      </div>
                }
                   
              </div>
            </>
        </div>

        {/* Instagram Followers */}
        <div>
            <>
              <div className="flex flex-row flex-wrap items-center space-x-3">
                {/* <div className="paragraph text-secondary">
                  Instagram Followers
                </div> */}
                {sortedData.instagram_filter.map(
                  (item, index) => {
                    const value = `${item.min}${item.max ? "-" : ""}${item.max ? item.max : ""}`
                    return (
                      <div
                        key={index}
                        className="flex items-center rounded my-1 border border-primary p-3"
                      >
                        <div className="mr-2 fill-current text-secondary">
              <svg width="16" height="16" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4.32187C30.4125 4.32187 31.1719 4.35 33.6938 4.4625C36.0375 4.56562 37.3031 4.95938 38.1469 5.2875C39.2625 5.71875 40.0688 6.24375 40.9031 7.07812C41.7469 7.92188 42.2625 8.71875 42.6938 9.83438C43.0219 10.6781 43.4156 11.9531 43.5188 14.2875C43.6313 16.8187 43.6594 17.5781 43.6594 23.9813C43.6594 30.3938 43.6313 31.1531 43.5188 33.675C43.4156 36.0188 43.0219 37.2844 42.6938 38.1281C42.2625 39.2438 41.7375 40.05 40.9031 40.8844C40.0594 41.7281 39.2625 42.2438 38.1469 42.675C37.3031 43.0031 36.0281 43.3969 33.6938 43.5C31.1625 43.6125 30.4031 43.6406 24 43.6406C17.5875 43.6406 16.8281 43.6125 14.3063 43.5C11.9625 43.3969 10.6969 43.0031 9.85313 42.675C8.7375 42.2438 7.93125 41.7188 7.09688 40.8844C6.25313 40.0406 5.7375 39.2438 5.30625 38.1281C4.97813 37.2844 4.58438 36.0094 4.48125 33.675C4.36875 31.1438 4.34063 30.3844 4.34063 23.9813C4.34063 17.5688 4.36875 16.8094 4.48125 14.2875C4.58438 11.9437 4.97813 10.6781 5.30625 9.83438C5.7375 8.71875 6.2625 7.9125 7.09688 7.07812C7.94063 6.23438 8.7375 5.71875 9.85313 5.2875C10.6969 4.95938 11.9719 4.56562 14.3063 4.4625C16.8281 4.35 17.5875 4.32187 24 4.32187ZM24 0C17.4844 0 16.6688 0.028125 14.1094 0.140625C11.5594 0.253125 9.80625 0.665625 8.2875 1.25625C6.70312 1.875 5.3625 2.69062 4.03125 4.03125C2.69063 5.3625 1.875 6.70313 1.25625 8.27813C0.665625 9.80625 0.253125 11.55 0.140625 14.1C0.028125 16.6687 0 17.4844 0 24C0 30.5156 0.028125 31.3312 0.140625 33.8906C0.253125 36.4406 0.665625 38.1938 1.25625 39.7125C1.875 41.2969 2.69063 42.6375 4.03125 43.9688C5.3625 45.3 6.70313 46.125 8.27813 46.7344C9.80625 47.325 11.55 47.7375 14.1 47.85C16.6594 47.9625 17.475 47.9906 23.9906 47.9906C30.5063 47.9906 31.3219 47.9625 33.8813 47.85C36.4313 47.7375 38.1844 47.325 39.7031 46.7344C41.2781 46.125 42.6188 45.3 43.95 43.9688C45.2812 42.6375 46.1063 41.2969 46.7156 39.7219C47.3063 38.1938 47.7188 36.45 47.8313 33.9C47.9438 31.3406 47.9719 30.525 47.9719 24.0094C47.9719 17.4938 47.9438 16.6781 47.8313 14.1188C47.7188 11.5688 47.3063 9.81563 46.7156 8.29688C46.125 6.70312 45.3094 5.3625 43.9688 4.03125C42.6375 2.7 41.2969 1.875 39.7219 1.26562C38.1938 0.675 36.45 0.2625 33.9 0.15C31.3313 0.028125 30.5156 0 24 0Z" fill="currentColor" />
                <path d="M24 11.6719C17.1938 11.6719 11.6719 17.1938 11.6719 24C11.6719 30.8062 17.1938 36.3281 24 36.3281C30.8062 36.3281 36.3281 30.8062 36.3281 24C36.3281 17.1938 30.8062 11.6719 24 11.6719ZM24 31.9969C19.5844 31.9969 16.0031 28.4156 16.0031 24C16.0031 19.5844 19.5844 16.0031 24 16.0031C28.4156 16.0031 31.9969 19.5844 31.9969 24C31.9969 28.4156 28.4156 31.9969 24 31.9969Z" fill="currentColor" />
                <path d="M39.6937 11.1843C39.6937 12.778 38.4 14.0624 36.8156 14.0624C35.2219 14.0624 33.9375 12.7687 33.9375 11.1843C33.9375 9.59053 35.2313 8.30615 36.8156 8.30615C38.4 8.30615 39.6937 9.5999 39.6937 11.1843Z" fill="currentColor" />
              </svg>
            </div>
                        <div className="text-sm leading-4 font-semibold text-secondary">
                          <RenderNumber number={value} />
                        </div>
                        <div
                          className="pl-1 cursor-pointer"
                          onClick={() =>
                            removeShortListInstagramFollowers(item)
                          }
                        >
                          <Cross />
                        </div>
                      </div>
                    );
                  }
                )}

                {sortedData.instagram && <div
                  className="flex items-center rounded my-1 border border-primary p-3"
                      >
                        <div className="mr-2 fill-current text-secondary">
              <svg width="16" height="16" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4.32187C30.4125 4.32187 31.1719 4.35 33.6938 4.4625C36.0375 4.56562 37.3031 4.95938 38.1469 5.2875C39.2625 5.71875 40.0688 6.24375 40.9031 7.07812C41.7469 7.92188 42.2625 8.71875 42.6938 9.83438C43.0219 10.6781 43.4156 11.9531 43.5188 14.2875C43.6313 16.8187 43.6594 17.5781 43.6594 23.9813C43.6594 30.3938 43.6313 31.1531 43.5188 33.675C43.4156 36.0188 43.0219 37.2844 42.6938 38.1281C42.2625 39.2438 41.7375 40.05 40.9031 40.8844C40.0594 41.7281 39.2625 42.2438 38.1469 42.675C37.3031 43.0031 36.0281 43.3969 33.6938 43.5C31.1625 43.6125 30.4031 43.6406 24 43.6406C17.5875 43.6406 16.8281 43.6125 14.3063 43.5C11.9625 43.3969 10.6969 43.0031 9.85313 42.675C8.7375 42.2438 7.93125 41.7188 7.09688 40.8844C6.25313 40.0406 5.7375 39.2438 5.30625 38.1281C4.97813 37.2844 4.58438 36.0094 4.48125 33.675C4.36875 31.1438 4.34063 30.3844 4.34063 23.9813C4.34063 17.5688 4.36875 16.8094 4.48125 14.2875C4.58438 11.9437 4.97813 10.6781 5.30625 9.83438C5.7375 8.71875 6.2625 7.9125 7.09688 7.07812C7.94063 6.23438 8.7375 5.71875 9.85313 5.2875C10.6969 4.95938 11.9719 4.56562 14.3063 4.4625C16.8281 4.35 17.5875 4.32187 24 4.32187ZM24 0C17.4844 0 16.6688 0.028125 14.1094 0.140625C11.5594 0.253125 9.80625 0.665625 8.2875 1.25625C6.70312 1.875 5.3625 2.69062 4.03125 4.03125C2.69063 5.3625 1.875 6.70313 1.25625 8.27813C0.665625 9.80625 0.253125 11.55 0.140625 14.1C0.028125 16.6687 0 17.4844 0 24C0 30.5156 0.028125 31.3312 0.140625 33.8906C0.253125 36.4406 0.665625 38.1938 1.25625 39.7125C1.875 41.2969 2.69063 42.6375 4.03125 43.9688C5.3625 45.3 6.70313 46.125 8.27813 46.7344C9.80625 47.325 11.55 47.7375 14.1 47.85C16.6594 47.9625 17.475 47.9906 23.9906 47.9906C30.5063 47.9906 31.3219 47.9625 33.8813 47.85C36.4313 47.7375 38.1844 47.325 39.7031 46.7344C41.2781 46.125 42.6188 45.3 43.95 43.9688C45.2812 42.6375 46.1063 41.2969 46.7156 39.7219C47.3063 38.1938 47.7188 36.45 47.8313 33.9C47.9438 31.3406 47.9719 30.525 47.9719 24.0094C47.9719 17.4938 47.9438 16.6781 47.8313 14.1188C47.7188 11.5688 47.3063 9.81563 46.7156 8.29688C46.125 6.70312 45.3094 5.3625 43.9688 4.03125C42.6375 2.7 41.2969 1.875 39.7219 1.26562C38.1938 0.675 36.45 0.2625 33.9 0.15C31.3313 0.028125 30.5156 0 24 0Z" fill="currentColor" />
                <path d="M24 11.6719C17.1938 11.6719 11.6719 17.1938 11.6719 24C11.6719 30.8062 17.1938 36.3281 24 36.3281C30.8062 36.3281 36.3281 30.8062 36.3281 24C36.3281 17.1938 30.8062 11.6719 24 11.6719ZM24 31.9969C19.5844 31.9969 16.0031 28.4156 16.0031 24C16.0031 19.5844 19.5844 16.0031 24 16.0031C28.4156 16.0031 31.9969 19.5844 31.9969 24C31.9969 28.4156 28.4156 31.9969 24 31.9969Z" fill="currentColor" />
                <path d="M39.6937 11.1843C39.6937 12.778 38.4 14.0624 36.8156 14.0624C35.2219 14.0624 33.9375 12.7687 33.9375 11.1843C33.9375 9.59053 35.2313 8.30615 36.8156 8.30615C38.4 8.30615 39.6937 9.5999 39.6937 11.1843Z" fill="currentColor" />
              </svg>
            </div>
                        <div className="text-sm leading-4 font-semibold text-secondary">
                          <RenderNumber number={advancedInstagramValue} />
                        </div>
                        <div
                          className="pl-1 cursor-pointer"
                          onClick={() => dispatch(actions.setInstagram(""))}
                        >
                          <Cross />
                        </div>
                      </div>
                }
              </div>
            </>
        </div>
        {/* Pinterest Followers */}
        <div>      
            <>
              <div className="flex flex-row flex-wrap items-center space-x-3">
                {/* <div className="paragraph text-secondary">
                  Pinterest Followers
                </div> */}
                <div className="flex flex-row space-x-3">
                  {sortedData.pinterest_filter.map(
                    (item, index) => {
                    const value = `${item.min}${item.max ? "-" : ""}${item.max ? item.max : ""}`
                      return (
                        <div
                          key={index}
                          className="flex items-center rounded my-1 border border-primary p-3"
                        >
                          <div className="mr-2 fill-current text-secondary">
              <svg width="16" height="16" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 0C10.7438 0 0 10.7438 0 24C0 34.1719 6.32812 42.8531 15.2531 46.35C15.0469 44.4469 14.85 41.5406 15.3375 39.4688C15.7781 37.5938 18.15 27.5437 18.15 27.5437C18.15 27.5437 17.4281 26.1094 17.4281 23.9813C17.4281 20.6438 19.3594 18.15 21.7687 18.15C23.8125 18.15 24.8063 19.6875 24.8063 21.5344C24.8063 23.5969 23.4937 26.6719 22.8187 29.5219C22.2562 31.9125 24.0187 33.8625 26.3719 33.8625C30.6375 33.8625 33.9187 29.3625 33.9187 22.875C33.9187 17.1281 29.7937 13.1063 23.8969 13.1063C17.0719 13.1063 13.0594 18.225 13.0594 23.5219C13.0594 25.5844 13.8562 27.7969 14.85 28.9969C15.0469 29.2312 15.075 29.4469 15.0187 29.6813C14.8406 30.4406 14.4281 32.0719 14.3531 32.4C14.25 32.8406 14.0063 32.9344 13.5469 32.7188C10.5469 31.3219 8.67188 26.9438 8.67188 23.4188C8.67188 15.8438 14.175 8.89688 24.525 8.89688C32.85 8.89688 39.3187 14.8313 39.3187 22.7625C39.3187 31.0312 34.1063 37.6875 26.8688 37.6875C24.4406 37.6875 22.1531 36.4219 21.3656 34.9313C21.3656 34.9313 20.1656 39.5156 19.875 40.6406C19.3312 42.7219 17.8687 45.3375 16.8937 46.9313C19.1437 47.625 21.525 48 24 48C37.2562 48 48 37.2562 48 24C48 10.7438 37.2562 0 24 0Z" fill="currentColor" />
              </svg>
            </div>
                          <div className="text-sm leading-4 font-semibold text-secondary">
                            <RenderNumber number={value} />
                          </div>
                          <div
                            className="pl-1 cursor-pointer"
                            onClick={() =>
                              removeShortListPinterestFollowers(item)
                            }
                          >
                            <Cross />
                          </div>
                        </div>
                      );
                    }
                  )}
                  {sortedData.pintress && <div
                  className="flex items-center rounded my-1 border border-primary p-3"
                      >
                        <div className="mr-2 fill-current text-secondary">
              <svg width="16" height="16" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 0C10.7438 0 0 10.7438 0 24C0 34.1719 6.32812 42.8531 15.2531 46.35C15.0469 44.4469 14.85 41.5406 15.3375 39.4688C15.7781 37.5938 18.15 27.5437 18.15 27.5437C18.15 27.5437 17.4281 26.1094 17.4281 23.9813C17.4281 20.6438 19.3594 18.15 21.7687 18.15C23.8125 18.15 24.8063 19.6875 24.8063 21.5344C24.8063 23.5969 23.4937 26.6719 22.8187 29.5219C22.2562 31.9125 24.0187 33.8625 26.3719 33.8625C30.6375 33.8625 33.9187 29.3625 33.9187 22.875C33.9187 17.1281 29.7937 13.1063 23.8969 13.1063C17.0719 13.1063 13.0594 18.225 13.0594 23.5219C13.0594 25.5844 13.8562 27.7969 14.85 28.9969C15.0469 29.2312 15.075 29.4469 15.0187 29.6813C14.8406 30.4406 14.4281 32.0719 14.3531 32.4C14.25 32.8406 14.0063 32.9344 13.5469 32.7188C10.5469 31.3219 8.67188 26.9438 8.67188 23.4188C8.67188 15.8438 14.175 8.89688 24.525 8.89688C32.85 8.89688 39.3187 14.8313 39.3187 22.7625C39.3187 31.0312 34.1063 37.6875 26.8688 37.6875C24.4406 37.6875 22.1531 36.4219 21.3656 34.9313C21.3656 34.9313 20.1656 39.5156 19.875 40.6406C19.3312 42.7219 17.8687 45.3375 16.8937 46.9313C19.1437 47.625 21.525 48 24 48C37.2562 48 48 37.2562 48 24C48 10.7438 37.2562 0 24 0Z" fill="currentColor" />
              </svg>
            </div>
                        <div className="text-sm leading-4 font-semibold text-secondary">
                          <RenderNumber number={advancedPinterestValue} />
                        </div>
                        <div
                          className="pl-1 cursor-pointer"
                          onClick={() => dispatch(actions.setPintress(""))}
                        >
                          <Cross />
                        </div>
                      </div>
                }
                </div>
              </div>
            </>
          
        </div>
        {/* Tiktok Followers */}
        <div>      
            <>
              <div className="flex flex-row flex-wrap items-center space-x-3">
                {/* <div className="paragraph text-secondary">Tiktok Followers</div> */}
                {sortedData.tiktok_filter.map(
                  (item, index) => {
                    const value = `${item.min}${item.max ? "-" : ""}${item.max ? item.max : ""}`

                    return (
                      <div
                        key={index}
                        className="flex items-center rounded my-1 border border-primary p-3"
                      >
                        <div className="mr-2 fill-current text-secondary">
              <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M34.1451 0H26.0556V32.6956C26.0556 36.5913 22.9444 39.7913 19.0725 39.7913C15.2007 39.7913 12.0894 36.5913 12.0894 32.6956C12.0894 28.8696 15.1315 25.7391 18.8651 25.6V17.3913C10.6374 17.5304 4 24.2783 4 32.6956C4 41.1827 10.7757 48 19.1417 48C27.5075 48 34.2833 41.1131 34.2833 32.6956V15.9304C37.3255 18.1565 41.059 19.4783 45 19.5479V11.3391C38.9157 11.1304 34.1451 6.12173 34.1451 0Z" fill="currentColor" />
              </svg>
            </div>
                        <div className="text-sm leading-4 font-semibold text-secondary">
                          <RenderNumber number={value} />
                        </div>
                        <div
                          className="pl-1 cursor-pointer"
                          onClick={() => removeShortListTiktokFollowers(item)}
                        >
                          <Cross />
                        </div>
                      </div>
                    );
                  }
                )}
                {sortedData.tiktok && <div
                  className="flex items-center rounded my-1 border border-primary p-3"
                      >
                        <div className="mr-2 fill-current text-secondary">
              <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M34.1451 0H26.0556V32.6956C26.0556 36.5913 22.9444 39.7913 19.0725 39.7913C15.2007 39.7913 12.0894 36.5913 12.0894 32.6956C12.0894 28.8696 15.1315 25.7391 18.8651 25.6V17.3913C10.6374 17.5304 4 24.2783 4 32.6956C4 41.1827 10.7757 48 19.1417 48C27.5075 48 34.2833 41.1131 34.2833 32.6956V15.9304C37.3255 18.1565 41.059 19.4783 45 19.5479V11.3391C38.9157 11.1304 34.1451 6.12173 34.1451 0Z" fill="currentColor" />
              </svg>
            </div>
                        <div className="text-sm leading-4 font-semibold text-secondary">
                          <RenderNumber number={advancedTiktokValue} />
                        </div>
                        <div
                          className="pl-1 cursor-pointer"
                          onClick={() => dispatch(actions.setTiktok(""))}
                        >
                          <Cross />
                        </div>
                      </div>
                }
              </div>
            </>
          
        </div>
        {/* Twitter Followers */}
        <div>
            <>
              <div className="flex flex-row flex-wrap items-center space-x-3">
                {/* <div className="paragraph text-secondary">
                  Twitter Followers
                </div> */}
                {sortedData.twitter_filter.map(
                  (item, index) => {
                    const value = `${item.min}${item.max ? "-" : ""}${item.max ? item.max : ""}`
                    return (
                      <div
                        key={index}
                        className="flex items-center rounded my-1 border border-primary p-3"
                      >
                        <div className="mr-2 fill-current text-secondary">
              <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                  <path d="M15.1003 43.5C33.2091 43.5 43.1166 28.4935 43.1166 15.4838C43.1166 15.0619 43.1072 14.6307 43.0884 14.2088C45.0158 12.815 46.679 11.0886 48 9.11066C46.205 9.90926 44.2993 10.4308 42.3478 10.6575C44.4026 9.42588 45.9411 7.491 46.6781 5.21159C44.7451 6.35718 42.6312 7.16528 40.4269 7.60128C38.9417 6.02318 36.978 4.97829 34.8394 4.62816C32.7008 4.27803 30.5064 4.64216 28.5955 5.66425C26.6846 6.68635 25.1636 8.30947 24.2677 10.2827C23.3718 12.2559 23.1509 14.4693 23.6391 16.5807C19.725 16.3842 15.8959 15.3675 12.4 13.5963C8.90405 11.825 5.81939 9.33893 3.34594 6.29909C2.0888 8.46655 1.70411 11.0314 2.27006 13.4722C2.83601 15.9131 4.31013 18.047 6.39281 19.44C4.82926 19.3904 3.29995 18.9694 1.93125 18.2119V18.3338C1.92985 20.6084 2.7162 22.8132 4.15662 24.5736C5.59704 26.334 7.60265 27.5412 9.8325 27.99C8.38411 28.3863 6.86396 28.4441 5.38969 28.1588C6.01891 30.1149 7.24315 31.8258 8.89154 33.0527C10.5399 34.2796 12.5302 34.9613 14.5847 35.0025C11.0968 37.7423 6.78835 39.2283 2.35313 39.2213C1.56657 39.2201 0.780798 39.1719 0 39.0769C4.50571 41.9676 9.74706 43.5028 15.1003 43.5Z" fill="currentColor" />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="48" height="48" fill="currentColor" />
                  </clipPath>
                </defs>
              </svg>
            </div>
                        <div className="text-sm leading-4 font-semibold text-secondary">
                          <RenderNumber number={value} />
                        </div>
                        <div
                          className="pl-1 cursor-pointer"
                          onClick={() => removeShortListTwitterFollowers(item)}
                        >
                          <Cross />
                        </div>
                      </div>
                    );
                  }
                )}
                {sortedData.twitter && <div
                  className="flex items-center rounded my-1 border border-primary p-3"
                      >
                        <div className="mr-2 fill-current text-secondary">
              <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                  <path d="M15.1003 43.5C33.2091 43.5 43.1166 28.4935 43.1166 15.4838C43.1166 15.0619 43.1072 14.6307 43.0884 14.2088C45.0158 12.815 46.679 11.0886 48 9.11066C46.205 9.90926 44.2993 10.4308 42.3478 10.6575C44.4026 9.42588 45.9411 7.491 46.6781 5.21159C44.7451 6.35718 42.6312 7.16528 40.4269 7.60128C38.9417 6.02318 36.978 4.97829 34.8394 4.62816C32.7008 4.27803 30.5064 4.64216 28.5955 5.66425C26.6846 6.68635 25.1636 8.30947 24.2677 10.2827C23.3718 12.2559 23.1509 14.4693 23.6391 16.5807C19.725 16.3842 15.8959 15.3675 12.4 13.5963C8.90405 11.825 5.81939 9.33893 3.34594 6.29909C2.0888 8.46655 1.70411 11.0314 2.27006 13.4722C2.83601 15.9131 4.31013 18.047 6.39281 19.44C4.82926 19.3904 3.29995 18.9694 1.93125 18.2119V18.3338C1.92985 20.6084 2.7162 22.8132 4.15662 24.5736C5.59704 26.334 7.60265 27.5412 9.8325 27.99C8.38411 28.3863 6.86396 28.4441 5.38969 28.1588C6.01891 30.1149 7.24315 31.8258 8.89154 33.0527C10.5399 34.2796 12.5302 34.9613 14.5847 35.0025C11.0968 37.7423 6.78835 39.2283 2.35313 39.2213C1.56657 39.2201 0.780798 39.1719 0 39.0769C4.50571 41.9676 9.74706 43.5028 15.1003 43.5Z" fill="currentColor" />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="48" height="48" fill="currentColor" />
                  </clipPath>
                </defs>
              </svg>
            </div>
                        <div className="text-sm leading-4 font-semibold text-secondary">
                          <RenderNumber number={advancedTwitterValue} />
                        </div>
                        <div
                          className="pl-1 cursor-pointer"
                          onClick={() => dispatch(actions.setTwitter(""))}
                        >
                          <Cross />
                        </div>
                      </div>
                }
              </div>
            </>
        </div>
        {/* Youtube Followers */}
        <div>
            <>
              <div className="flex flex-row flex-wrap items-center space-x-3">
                {/* <div className="paragraph text-secondary">
                  Youtube Followers
                </div> */}
                {sortedData.youtube_filter.map(
                  (item, index) => {
                    const value = `${item.min}${item.max ? "-" : ""}${item.max ? item.max : ""}`
                    return (
                      <div
                        key={index}
                        className="flex items-center rounded my-1 border border-primary p-3"
                      >
                        <div className="mr-2 fill-current text-secondary">
              <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M47.5219 14.4001C47.5219 14.4001 47.0531 11.0907 45.6094 9.6376C43.7812 7.7251 41.7375 7.71572 40.8 7.60322C34.0875 7.11572 24.0094 7.11572 24.0094 7.11572H23.9906C23.9906 7.11572 13.9125 7.11572 7.2 7.60322C6.2625 7.71572 4.21875 7.7251 2.39062 9.6376C0.946875 11.0907 0.4875 14.4001 0.4875 14.4001C0.4875 14.4001 0 18.2907 0 22.172V25.8095C0 29.6907 0.478125 33.5813 0.478125 33.5813C0.478125 33.5813 0.946875 36.8907 2.38125 38.3438C4.20937 40.2563 6.60938 40.1907 7.67813 40.397C11.5219 40.7626 24 40.8751 24 40.8751C24 40.8751 34.0875 40.8563 40.8 40.3782C41.7375 40.2657 43.7812 40.2563 45.6094 38.3438C47.0531 36.8907 47.5219 33.5813 47.5219 33.5813C47.5219 33.5813 48 29.7001 48 25.8095V22.172C48 18.2907 47.5219 14.4001 47.5219 14.4001ZM19.0406 30.2251V16.7345L32.0062 23.5032L19.0406 30.2251Z" fill="currentColor" />
              </svg>
            </div>
                        <div className="text-sm leading-4 font-semibold text-secondary">
                          <RenderNumber number={value} />
                        </div>
                        <div
                          className="pl-1 cursor-pointer"
                          onClick={() => removeShortListYoutubeFollowers(item)}
                        >
                          <Cross />
                        </div>
                      </div>
                    );
                  }
                )}
                {sortedData.youtube && <div
                  className="flex items-center rounded my-1 border border-primary p-3"
                      >
                        <div className="mr-2 fill-current text-secondary">
              <svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M47.5219 14.4001C47.5219 14.4001 47.0531 11.0907 45.6094 9.6376C43.7812 7.7251 41.7375 7.71572 40.8 7.60322C34.0875 7.11572 24.0094 7.11572 24.0094 7.11572H23.9906C23.9906 7.11572 13.9125 7.11572 7.2 7.60322C6.2625 7.71572 4.21875 7.7251 2.39062 9.6376C0.946875 11.0907 0.4875 14.4001 0.4875 14.4001C0.4875 14.4001 0 18.2907 0 22.172V25.8095C0 29.6907 0.478125 33.5813 0.478125 33.5813C0.478125 33.5813 0.946875 36.8907 2.38125 38.3438C4.20937 40.2563 6.60938 40.1907 7.67813 40.397C11.5219 40.7626 24 40.8751 24 40.8751C24 40.8751 34.0875 40.8563 40.8 40.3782C41.7375 40.2657 43.7812 40.2563 45.6094 38.3438C47.0531 36.8907 47.5219 33.5813 47.5219 33.5813C47.5219 33.5813 48 29.7001 48 25.8095V22.172C48 18.2907 47.5219 14.4001 47.5219 14.4001ZM19.0406 30.2251V16.7345L32.0062 23.5032L19.0406 30.2251Z" fill="currentColor" />
              </svg>
            </div>
                        <div className="text-sm leading-4 font-semibold text-secondary">
                          <RenderNumber number={advancedYoutubeValue} />
                        </div>
                        <div
                          className="pl-1 cursor-pointer"
                          onClick={() => dispatch(actions.setYoutube(""))}
                        >
                          <Cross />
                        </div>
                      </div>
                }
              </div>
            </>
        </div>
        {/* Company Size */}
        <div>
            <>
              <div className="flex flex-row flex-wrap items-center space-x-3">
                {/* <div className="paragraph text-secondary">Company Size</div> */}
                {sortedData.company_size_filter.map((item, index) => {
                    const value = `${item.min}${item.max ? "-" : ""}${item.max ? item.max : ""}`;
                  return (
                    <div
                      key={index}
                      className="flex items-center rounded my-1 border border-primary p-3"
                    >
                      <div className="mr-2 fill-current text-secondary">
              <svg width="16" height="16" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                <g data-name="Layer 5" id="Layer_5"><rect className="cls-1" height="84.24" width="46.85" x="40.58" y="24.88" /><rect className="cls-1" height="55.34" transform="translate(60.72 162.89) rotate(180)" width="20.43" x="20.14" y="53.78" /><rect className="cls-1" height="55.34" transform="translate(195.28 162.89) rotate(180)" width="20.43" x="87.42" y="53.78" /><rect className="cls-2" height="27.67" transform="translate(128 190.56) rotate(180)" width="19.21" x="54.39" y="81.45" /></g>
              </svg>
            </div>
                      <div className="text-sm leading-4 font-semibold text-secondary">
                        <RenderNumber number={value} />
                      </div>
                      <div
                        className="pl-1 cursor-pointer"
                        onClick={() => removeShortListCompanySize(item)}
                      >
                        <Cross />
                      </div>
                    </div>
                  );
                })}
                {Object.keys(sortedData.company_size).length !== 0 && <div
                  className="flex items-center rounded my-1 border border-primary p-3"
                      >
                        <div className="mr-2 fill-current text-secondary">
              <svg width="16" height="16" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                <g data-name="Layer 5" id="Layer_5"><rect className="cls-1" height="84.24" width="46.85" x="40.58" y="24.88" /><rect className="cls-1" height="55.34" transform="translate(60.72 162.89) rotate(180)" width="20.43" x="20.14" y="53.78" /><rect className="cls-1" height="55.34" transform="translate(195.28 162.89) rotate(180)" width="20.43" x="87.42" y="53.78" /><rect className="cls-2" height="27.67" transform="translate(128 190.56) rotate(180)" width="19.21" x="54.39" y="81.45" /></g>
              </svg>
            </div>
                        <div className="text-sm leading-4 font-semibold text-secondary">
                          <RenderNumber number={advancedCompanySizeValue} />
                        </div>
                        <div
                          className="pl-1 cursor-pointer"
                          onClick={() => dispatch(actions.setCompanyList(""))}
                        >
                          <Cross />
                        </div>
                      </div>
                }
              </div>
            </>
        </div>
      </div>
    </>
  );
};

export default React.memo(ShortList);
