import React, {useState, useEffect} from "react";
import downloadsvg from "../../../../assets/images/dashboard/prospects/download.svg";
import axiosInstance from "../../../api/axiosInstance";
// import exportFromJSON from 'export-from-json'
import { CSVLink } from "react-csv";

const ExportData = (props) => {
  const { numSelected, selected, listName, listId } = props;
  const jsonData = selected;

  const [data, setData] = useState("")

  // const exportData = () => {
  //   if (numSelected.length === 0) {
  //     alert("Please select data's to export");
  //   } else {
  //     alert("Good to go");
  //   }
  // };

  // const datas = selected.map(item => ({
  //   store_id: item.store_id,
  //   name: item.name,
  //   base_url: item.base_url,
  //   platform: item.platform,
  //   logo: item.logo,
  //   title: item.title,
  //   description: item.description,
  //   language: item.language,
  //   emails: item.emails.map(email => email).join('\r\n'),
  //   phone_numbers: item.phone_numbers.map(phone => phone).join('\r\n'),
  //   technology_names: item.technology_names.map(name => name).join('\r\n'),
  // }))

  useEffect(() => {
    if(selected.length >= 1) {
      const extractData = async () => {
        let store_ids = []
        for(let i = 0; i < selected.length; i++){
          store_ids.push(selected[i]._id.$oid);
        }
        const selectedRowData = {
          list_id: listId,
          stores: store_ids
        }
        try{
          const response = await axiosInstance.post(`/export-csv`, selectedRowData);
          setData(response.data);
        } catch(error){
          console.log(error);
        }
      }
      extractData();
    }
  }, [selected, listId]);
  
  // const exportCSV = async () => {
  //   let store_ids = []
  //   for(let i = 0; i < selected.length; i++){
  //     store_ids.push(selected[i]._id.$oid);
  //   }
  //   const data = {
  //     list_id: listId,
  //     stores: store_ids
  //   }
  //   console.log(data);
  //   try{
  //      const response = await axiosInstance.post(`/export-csv`, data);
  //      console.log(response.data);
  //   } catch(error){
  //     console.log(error);
  //   }
  // }

    const csvReport = {
      data: data,
      filename:`${listName} - ${numSelected} stores.csv`,
    };

  return (
    <>
      <div className="flex flex-wrap space-x-4">
        <CSVLink {...csvReport}>
          <div className="primary-button min-w-min">
            <div className="flex">
              <img src={downloadsvg} alt="" className="pr-1.5" />
              Export to CSV
            </div>
          </div>
        </CSVLink>
        {/* <div className="primary-button min-w-min">
          <div className="flex">
            <img src={downloadsvg} alt="" className="pr-1.5" />
            Export to CSV
          </div> 
        </div> */}
        <a
          href={
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(jsonData))
          }
          download={`${listName} - ${numSelected} stores.json`}
        >
          <div className="primary-button min-w-min">
            <div className="flex">
              <img src={downloadsvg} alt="" className="pr-1.5" />
              Export to JSON
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default ExportData;
