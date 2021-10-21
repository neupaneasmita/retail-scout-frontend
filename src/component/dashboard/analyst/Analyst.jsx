import React, { useState, useEffect } from "react";
import AnalystProfile from "./AnalystProfile";
import Social from "./Social";
import Contact from "./Contact";
import Tech from "./Tech";
import { storeCollection } from "../home/storeCollection";
import axiosInstance from "../../api/axiosInstance";

const Analyst = ({ match }) => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchStoreData = async () => {
      setLoading(true);
      const id = match.params.id;
      const response = await axiosInstance.get(`dashboard/analytics/${id}`);
      setData(response.data);
      setLoading(false);
    };
    fetchStoreData();
  }, [match.params.id]);

  if (loading) {
    return <div className="">Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:h-screen md:-mt-18">
        <div className="w-full md:min-w-84 md:w-84 flex-none bg-primarygray md:overflow-y-auto scrollbar">
          {/*Analyst profile data*/}
          <AnalystProfile filteredData={data} />
        </div>
        <div className="flex-1 overflow-x-hidden">
          <div className="flex flex-col relative overflow-hidden h-full">
            <div className="bloc-tabs inline-flex px-6 md:mt-18">
              <div
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}
              >
                Social
              </div>
              <div
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(2)}
              >
                Contact
              </div>
              <div
                className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(3)}
              >
                Tech
              </div>
            </div>

            <div className="content-tabs overflow-y-auto">
              <div
                className={
                  toggleState === 1
                    ? "content tech-scroll active-content"
                    : "content"
                }
              >
                <Social />
              </div>

              <div
                className={
                  toggleState === 2
                    ? "content tech-scroll active-content"
                    : "content"
                }
              >
                <Contact filteredData={data} />
              </div>

              <div
                className={
                  toggleState === 3
                    ? "content tech-scroll active-content"
                    : "content"
                }
              >
                <Tech filteredData={data} storeCollection={storeCollection} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Analyst;
