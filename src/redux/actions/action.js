import {
  FETCH_ALL_TABLE_DATA,
  //---------
  SET_PLATFORM_LIST,
  SET_CATEGORY_LIST,
  // SET_TECHNOLOGY_LIST,
  SET_LANGUAGE_LIST,
  // SET_SOCIAL_LIST,
  SET_COMPANY_SIZE,
  FILTER_PLATFORM_LIST,
  FILTER_CATEGORY_LIST,
  SET_PAGE_SIZE,
  SET_PAGE_NUMBER,
  SET_INSTAGRAM,
  SET_FACEBOOK,
  SET_TWITTER,
  SET_YOUTUBE,
  SET_PINTRESS,
  SET_TIKTOK,
  SET_SORT,
  SET_TECHNOLOGY_NAMES,
  SET_TECHNOLOGY_TYPES,
  FILTER_TECHNOLOGY_NAMES,
  FILTER_TECHNOLOGY_TYPES,
  SET_SEARCH,
  SET_KEYWORD_SEARCH,
  //Set Checkbox Filter
  SET_INSTAGRAM_FILTER,
  SET_FACEBOOK_FILTER,
  SET_TWITTER_FILTER,
  SET_YOUTUBE_FILTER,
  SET_PINTEREST_FILTER,
  SET_TIKTOK_FILTER,
  //Filter Checkbox Filter
  FILTER_INSTAGRAM_FILTER,
  FILTER_FACEBOOK_FILTER,
  FILTER_TWITTER_FILTER,
  FILTER_YOUTUBE_FILTER,
  FILTER_PINTEREST_FILTER,
  FILTER_TIKTOK_FILTER,
  //Company size filter
  SET_COMPANY_SIZE_FILTER,
  FILTER_COMPANY_SIZE_FILTER,
  CLEAR_ALL_FILTER_DATA,
} from "./filterActionType";

//clear all filter data
export const clearAllFilterData = () => {
  return {
    type: CLEAR_ALL_FILTER_DATA,
  };
};
// getSearch - Store Search
export const setSearch = (data) => {
  return {
    type: SET_SEARCH,
    payload: data,
  };
};
// getSearch - Keyboard Search
export const setKeywordSearch = (data) => {
  return {
    type: SET_KEYWORD_SEARCH,
    payload: data,
  };
};
//Set Company Size
export const setCompanySizeFilter = (data) => {
  return {
    type: SET_COMPANY_SIZE_FILTER,
    payload: data,
  };
};
//Filter Company Size
export const filterCompanySizeFilter = (data) => {
  return {
    type: FILTER_COMPANY_SIZE_FILTER,
    payload: data,
  };
};

//Set Checkbox Social filters
export const setFacebookFilter = (data) => {
  return {
    type: SET_FACEBOOK_FILTER,
    payload: data,
  };
};
export const setInstagramFilter = (data) => {
  return {
    type: SET_INSTAGRAM_FILTER,
    payload: data,
  };
};
export const setTwitterFilter = (data) => {
  return {
    type: SET_TWITTER_FILTER,
    payload: data,
  };
};
export const setTiktokFilter = (data) => {
  return {
    type: SET_TIKTOK_FILTER,
    payload: data,
  };
};
export const setPinterestFilter = (data) => {
  return {
    type: SET_PINTEREST_FILTER,
    payload: data,
  };
};
export const setYoutubeFilter = (data) => {
  return {
    type: SET_YOUTUBE_FILTER,
    payload: data,
  };
};
//Filter Checkbox Social filters
export const filterFacebookFilter = (data) => {
  return {
    type: FILTER_FACEBOOK_FILTER,
    payload: data,
  };
};
export const filterInstagramFilter = (data) => {
  return {
    type: FILTER_INSTAGRAM_FILTER,
    payload: data,
  };
};
export const filterTwitterFilter = (data) => {
  return {
    type: FILTER_TWITTER_FILTER,
    payload: data,
  };
};
export const filterTiktokFilter = (data) => {
  return {
    type: FILTER_TIKTOK_FILTER,
    payload: data,
  };
};
export const filterPinterestFilter = (data) => {
  return {
    type: FILTER_PINTEREST_FILTER,
    payload: data,
  };
};
export const filterYoutubeFilter = (data) => {
  return {
    type: FILTER_YOUTUBE_FILTER,
    payload: data,
  };
};

//get technology names
export const setTechnologyNames = (data) => {
  return {
    type: SET_TECHNOLOGY_NAMES,
    payload: data,
  };
};
//get technology types
export const setTechnologyTypes = (data) => {
  return {
    type: SET_TECHNOLOGY_TYPES,
    payload: data,
  };
};
//filter technology names
export const filterTechnologyNames = (data) => {
  return {
    type: FILTER_TECHNOLOGY_NAMES,
    payload: data,
  };
};
//filter technology types
export const filterTechnologyTypes = (data) => {
  return {
    type: FILTER_TECHNOLOGY_TYPES,
    payload: data,
  };
};
// get all data
export const fetchAllTableList = (
  data,
  current_page,
  item_per_page,
  total_pages_for_query,
  message,
  total_number_of_items
) => {
  return {
    type: FETCH_ALL_TABLE_DATA,
    payload: {
      Lists: data,
      current_page: current_page,
      item_per_page: item_per_page,
      total_pages_for_query: total_pages_for_query,
      message: message,
      total_number_of_items: total_number_of_items,
    },
  };
};
// set list for platform
export const setPlatformList = (data) => {
  return {
    type: SET_PLATFORM_LIST,
    payload: data,
  };
};
// filter list for platform
export const filterPlatformList = (data) => {
  return {
    type: FILTER_PLATFORM_LIST,
    payload: data,
  };
};
// export const setTechnologyList = (data) => {
//   return {
//     type: SET_TECHNOLOGY_LIST,
//     payload: data,
//   };
// };
export const setLanguageList = (data) => {
  return {
    type: SET_LANGUAGE_LIST,
    payload: data,
  };
};
// set category
export const setCategoryList = (data) => {
  return {
    type: SET_CATEGORY_LIST,
    payload: data,
  };
};
// filter category
export const filterCategoryList = (data) => {
  return {
    type: FILTER_CATEGORY_LIST,
    payload: data,
  };
};
// set soclial
// export const setSocialList = (data) => {
//   return {
//     type: SET_SOCIAL_LIST,
//     payload: data,
//   };
// };
// filter social
// export const filterSocialList = (data) => {
//   return {
//     type: FILTER_SOCIAL_LIST,
//     payload: data,
//   };
// };
// set company size
export const setCompanyList = (data) => {
  return {
    type: SET_COMPANY_SIZE,
    payload: data,
  };
};
// set page size
export const setPageSize = (data) => {
  return {
    type: SET_PAGE_SIZE,
    payload: data,
  };
};
// set page number
export const setPageNumber = (data) => {
  return {
    type: SET_PAGE_NUMBER,
    payload: data,
  };
};
// set instagram
export const setInstagram = (data) => {
  return {
    type: SET_INSTAGRAM,
    payload: data,
  };
};
// set instagram
export const setFacebook = (data) => {
  return {
    type: SET_FACEBOOK,
    payload: data,
  };
};
// set instagram
export const setYoutube = (data) => {
  return {
    type: SET_YOUTUBE,
    payload: data,
  };
};
// set instagram
export const setTwitter = (data) => {
  return {
    type: SET_TWITTER,
    payload: data,
  };
};
// set instagram
export const setPintress = (data) => {
  return {
    type: SET_PINTRESS,
    payload: data,
  };
};
// set instagram
export const setTiktok = (data) => {
  return {
    type: SET_TIKTOK,
    payload: data,
  };
};
// set sort
export const setSort = (data) => {
  return {
    type: SET_SORT,
    payload: data,
  };
};
