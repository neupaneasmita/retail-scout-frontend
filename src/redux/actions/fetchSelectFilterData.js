// import axios from "axios";
import axiosInstance from "../../component/api/axiosInstance";
import * as actions from "../actions/action";
// let users = [];
function fetchSelectFilterData(values) {
  return (dispatch) => {
    axiosInstance
      .post(`/filter-data`, values)
      .then(async (res) => {
        // console.log(res.data);
        if (!res.data.items.message) {
          await dispatch(
            actions.fetchAllTableList(
              res.data.items,
              res.data.current_page,
              res.data.item_per_page,
              res.data.total_pages_for_query,
              res.data.message,
              res.data.total_number_of_items
            )
          );
        }
      })
      .catch((err) => {
        if (err.response.data.items.msg === "Token has expired") {
          localStorage.clear();
          window.location = "/";
        }
      });
  };
}

export default fetchSelectFilterData;
