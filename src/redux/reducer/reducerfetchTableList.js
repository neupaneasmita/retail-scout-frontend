import {
  FETCH_ALL_TABLE_DATA,
  //-------
  SET_PLATFORM_LIST,
  SET_CATEGORY_LIST,
  SET_LANGUAGE_LIST,
  FILTER_PLATFORM_LIST,
  FILTER_CATEGORY_LIST,
  SET_SEARCH,
  SET_COMPANY_SIZE,
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
  //SET CHECKBOX FILTER
  SET_INSTAGRAM_FILTER,
  SET_FACEBOOK_FILTER,
  SET_TWITTER_FILTER,
  SET_YOUTUBE_FILTER,
  SET_PINTEREST_FILTER,
  SET_TIKTOK_FILTER,
  //FILTER CHECKBOX FILTER
  FILTER_INSTAGRAM_FILTER,
  FILTER_FACEBOOK_FILTER,
  FILTER_TWITTER_FILTER,
  FILTER_YOUTUBE_FILTER,
  FILTER_PINTEREST_FILTER,
  FILTER_TIKTOK_FILTER,
  //Company size filter
  SET_COMPANY_SIZE_FILTER,
  FILTER_COMPANY_SIZE_FILTER,
  SET_KEYWORD_SEARCH,
  CLEAR_ALL_FILTER_DATA,
} from "../actions/filterActionType";
const initialState = {
  Lists: [],
  counter: 0,
  platform: [],
  // technologies: "",
  technology_names: [],
  technology_types: [],
  language: "",
  product_categories: [],
  company_size: "",
  // social: [],
  facebook: "",
  instagram: "",
  pintress: "",
  youtube: "",
  tiktok: "",
  twitter: "",
  sort: {},
  search: "",
  search_keyword: "",
  page_number: 1,
  page_size: 25,
  message: "",
  total_number_of_items: "",
  platform_uncheck: "",
  category_uncheck: "",
  uncheck_technology_names: "",
  uncheck_technology_types: "",
  facebook_filter: [],
  instagram_filter: [],
  tiktok_filter: [],
  youtube_filter: [],
  pinterest_filter: [],
  twitter_filter: [],
  facebook_filter_uncheck: "",
  instagram_filter_uncheck: "",
  twitter_filter_uncheck: "",
  tiktok_filter_uncheck: "",
  pinterest_filter_uncheck: "",
  youtube_filter_uncheck: "",
  company_size_filter: [],
  company_size_filter_uncheck: "",
};
const fetchtableList = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ALL_FILTER_DATA:
      return {
        ...state,
        Lists: [],
        counter: 0,
        platform: [],
        // technologies: "",
        technology_names: [],
        technology_types: [],
        language: "",
        product_categories: [],
        company_size: "",
        // social: [],
        facebook: "",
        instagram: "",
        pintress: "",
        youtube: "",
        tiktok: "",
        twitter: "",
        sort: {},
        search: "",
        search_keyword: "",
        page_number: 1,
        page_size: 25,
        message: "",
        total_number_of_items: "",
        platform_uncheck: "",
        category_uncheck: "",
        uncheck_technology_names: "",
        uncheck_technology_types: "",
        facebook_filter: [],
        instagram_filter: [],
        tiktok_filter: [],
        youtube_filter: [],
        pinterest_filter: [],
        twitter_filter: [],
        facebook_filter_uncheck: "",
        instagram_filter_uncheck: "",
        twitter_filter_uncheck: "",
        tiktok_filter_uncheck: "",
        pinterest_filter_uncheck: "",
        youtube_filter_uncheck: "",
        company_size_filter: [],
        company_size_filter_uncheck: "",
      };
    case FETCH_ALL_TABLE_DATA:
      return {
        ...state,
        Lists: [action.payload.Lists],
        current_page: action.payload.current_page,
        item_per_page: action.payload.item_per_page,
        total_pages_for_query: action.payload.total_pages_for_query,
        message: action.payload.message,
        total_number_of_items: action.payload.total_number_of_items,
      };

    case SET_COMPANY_SIZE_FILTER:
      return {
        ...state,
        company_size_filter: [...state.company_size_filter, action.payload],
        counter: state.counter + 1,
      };

    case FILTER_COMPANY_SIZE_FILTER:
      const companySizeFilterResult = state.company_size_filter.filter(
        (data) => data.min !== action.payload.min
      );
      return {
        ...state,
        company_size_filter: companySizeFilterResult,
        counter: state.counter - 1,
        company_size_filter_uncheck: action.payload,
      };

    case SET_FACEBOOK_FILTER:
      return {
        ...state,
        facebook_filter: [...state.facebook_filter, action.payload],
        counter: state.counter + 1,
      };

    case SET_INSTAGRAM_FILTER:
      return {
        ...state,
        instagram_filter: [...state.instagram_filter, action.payload],
        counter: state.counter + 1,
      };

    case SET_TWITTER_FILTER:
      return {
        ...state,
        twitter_filter: [...state.twitter_filter, action.payload],
        counter: state.counter + 1,
      };

    case SET_YOUTUBE_FILTER:
      return {
        ...state,
        youtube_filter: [...state.youtube_filter, action.payload],
        counter: state.counter + 1,
      };
    case SET_PINTEREST_FILTER:
      return {
        ...state,
        pinterest_filter: [...state.pinterest_filter, action.payload],
        counter: state.counter + 1,
      };
    case SET_TIKTOK_FILTER:
      return {
        ...state,
        tiktok_filter: [...state.tiktok_filter, action.payload],
        counter: state.counter + 1,
      };

    case FILTER_FACEBOOK_FILTER:
      const facebookFilterResult = state.facebook_filter.filter(
        (data) => data.min !== action.payload.min
      );
      return {
        ...state,
        facebook_filter: facebookFilterResult,
        counter: state.counter - 1,
        facebook_filter_uncheck: action.payload,
      };

    case FILTER_INSTAGRAM_FILTER:
      const instagramFilterResult = state.instagram_filter.filter(
        (data) => data.min !== action.payload.min
      );
      return {
        ...state,
        instagram_filter: instagramFilterResult,
        counter: state.counter - 1,
        instagram_filter_uncheck: action.payload,
      };

    case FILTER_TWITTER_FILTER:
      const twitterFilterResult = state.twitter_filter.filter(
        (data) => data.min !== action.payload.min
      );
      return {
        ...state,
        twitter_filter: twitterFilterResult,
        counter: state.counter - 1,
        twitter_filter_uncheck: action.payload,
      };

    case FILTER_YOUTUBE_FILTER:
      const youtubeFilterResult = state.youtube_filter.filter(
        (data) => data.min !== action.payload.min
      );
      return {
        ...state,
        youtube_filter: youtubeFilterResult,
        counter: state.counter - 1,
        youtube_filter_uncheck: action.payload,
      };

    case FILTER_PINTEREST_FILTER:
      const pinterestFilterResult = state.pinterest_filter.filter(
        (data) => data.min !== action.payload.min
      );
      return {
        ...state,
        pinterest_filter: pinterestFilterResult,
        counter: state.counter - 1,
        pinterest_filter_uncheck: action.payload,
      };

    case FILTER_TIKTOK_FILTER:
      const tiktokFilterResult = state.tiktok_filter.filter(
        (data) => data.min !== action.payload.min
      );
      return {
        ...state,
        tiktok_filter: tiktokFilterResult,
        counter: state.counter - 1,
        tiktok_filter_uncheck: action.payload,
      };

    case SET_PLATFORM_LIST:
      return {
        ...state,
        platform: [...state.platform, action.payload],
        counter: state.counter + 1,
      };
    case FILTER_PLATFORM_LIST:
      const result = state.platform.filter((data) => data !== action.payload);

      return {
        ...state,
        platform: result,
        counter: state.counter - 1,
        platform_uncheck: action.payload,
      };
    case SET_TECHNOLOGY_NAMES:
      return {
        ...state,
        technology_names: [...state.technology_names, action.payload],
        counter: state.counter + 1,
      };
    case FILTER_TECHNOLOGY_NAMES:
      const Fresult = state.technology_names.filter(
        (data) => data !== action.payload
      );
      return {
        ...state,
        technology_names: Fresult,
        counter: state.counter - 1,
        uncheck_technology_names: action.payload,
      };
    case SET_TECHNOLOGY_TYPES:
      return {
        ...state,
        technology_types: [...state.technology_types, action.payload],
        counter: state.counter + 1,
      };
    case FILTER_TECHNOLOGY_TYPES:
      const fresult = state.technology_types.filter(
        (data) => data !== action.payload
      );
      return {
        ...state,
        technology_types: fresult,
        counter: state.counter - 1,
        uncheck_technology_types: action.payload,
      };
    case SET_LANGUAGE_LIST:
      return {
        ...state,
        language: action.payload,
        counter: state.counter + 1,
      };
    case SET_CATEGORY_LIST:
      return {
        ...state,
        product_categories: [...state.product_categories, action.payload],
        counter: state.counter + 1,
      };
    case FILTER_CATEGORY_LIST:
      const data = state.product_categories.filter(
        (data) => data !== action.payload
      );
      return {
        ...state,
        product_categories: data,
        counter: state.counter - 1,
        category_uncheck: action.payload,
      };
    case SET_COMPANY_SIZE:
      return {
        ...state,
        company_size: action.payload,
        counter: state.counter + 1,
      };
    case SET_PAGE_SIZE:
      return {
        ...state,
        page_size: action.payload,
        counter: state.counter + 1,
      };
    case SET_PAGE_NUMBER:
      return {
        ...state,
        page_number: action.payload,
        counter: state.counter + 1,
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
        counter: state.counter + 1,
      };
    case SET_KEYWORD_SEARCH:
      return {
        ...state,
        search_keyword: action.payload,
        counter: state.counter + 1,
      };
    case SET_INSTAGRAM:
      return {
        ...state,
        instagram: action.payload,
        counter: state.counter + 1,
      };
    case SET_FACEBOOK:
      return {
        ...state,
        facebook: action.payload,
        counter: state.counter + 1,
      };
    case SET_YOUTUBE:
      return {
        ...state,
        youtube: action.payload,
        counter: state.counter + 1,
      };
    case SET_PINTRESS:
      return {
        ...state,
        pintress: action.payload,
        counter: state.counter + 1,
      };
    case SET_TWITTER:
      return {
        ...state,
        twitter: action.payload,
        counter: state.counter + 1,
      };
    case SET_TIKTOK:
      return {
        ...state,
        tiktok: action.payload,
        counter: state.counter + 1,
      };
    case SET_SORT:
      return {
        ...state,
        sort: action.payload,
        counter: state.counter + 1,
      };
    default:
      return state;
  }
};
export default fetchtableList;
