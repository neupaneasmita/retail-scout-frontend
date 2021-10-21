import React, { useEffect, useState, useMemo } from "react";
import TableHeader from "./Header.jsx";
//import Pagination from "./Pagination";
import { NavLink } from "react-router-dom";

const Table = ({
  data,
  setData,
  searchValue,
  shortListNames,
  setShortListNames,
}) => {
  //const [comments, setComments] = useState([]);
  /*const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({field: "", order: ""});*/

  /*console.log(shortListNames);*/
  /*const filteredData = data
        .filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.base_url.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.language.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.timestamp.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.platform.toLowerCase().includes(searchValue.toLowerCase())
            //item.platformRank.toString().includes(searchValue.toLowerCase()) ||
            //item.rank.toString().includes(searchValue.toLowerCase()) ||
            //item.status.toLowerCase().includes(searchValue.toLowerCase())
        )
        .filter((item) =>
            item.platform.includes(shortListNames) ||
            item.status.includes(shortListNames) ||
            item.createdAt.includes(shortListNames)
        );

    const ITEMS_PER_PAGE = 5;

    const headers = [
        {name: "Brand", field: "name", sortable: true},
        {name: "Country", field: "language", sortable: true},
        {name: "Created", field: "timestamp", sortable: true},
        {name: "Platform", field: "platform", sortable: true},
        {name: "Platform Rank", field: "platformRank", sortable: true},
        {name: "Rank", field: "rank", sortable: true},
        {name: "Status", field: "status", sortable: true},
    ];*/

  /*const commentsData = useMemo(() => {
        let computedComments = data;

        if (search) {
            computedComments = computedComments.filter(
                comment =>
                    comment.companyName.toLowerCase().includes(search.toLowerCase()) ||
                    comment.website.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(computedComments.length);

        //Sorting comments
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedComments = computedComments.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }

        //Current Page slice
        return computedComments.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [data, currentPage, search, sorting]);*/

  return (
    <>
      {/*<Header title="Building a data table in react" />*/}

      {/*<ExternalInfo page="datatable" />*/}

      <div className="row w-100">
        <div className="col mb-3 col-12 text-center">
          <div className="row">
            <div className="col-md-6">
              {/*<Pagination*/}
              {/*    total={totalItems}*/}
              {/*    itemsPerPage={ITEMS_PER_PAGE}*/}
              {/*    currentPage={currentPage}*/}
              {/*    onPageChange={page => setCurrentPage(page)}*/}
              {/*/>*/}
            </div>
          </div>

          {/*<table className="table table-striped">*/}
          {/*    <TableHeader*/}
          {/*        headers={headers}*/}
          {/*        onSorting={(field, order) =>*/}
          {/*            setSorting({ field, order })*/}
          {/*        }*/}
          {/*    />*/}
          {/*    <tbody>*/}
          {/*    {commentsData.map(comment => (*/}
          {/*        <tr>*/}
          {/*            <th scope="row" key={comment.id}>*/}
          {/*                {comment.id}*/}
          {/*            </th>*/}
          {/*            <td>{comment.companyName}</td>*/}
          {/*            <td>{comment.website}</td>*/}
          {/*            <td>{comment.country}</td>*/}
          {/*        </tr>*/}
          {/*    ))}*/}
          {/*    </tbody>*/}
          {/*</table>*/}
        </div>
      </div>

      <div className="py-6">
        <div className="mx-auto bg-white">
          {/*<div className="w-full overflow-x-auto">
                        <table className="min-w-full bg-white dark:bg-gray-800">
                            <TableHeader
                                headers={headers}
                                onSorting={(field, order) =>
                                    setSorting({field, order})
                                }
                            />
                            <tbody>

                            {filteredData.map((item, index) => {
                                return (
                                    <tr key={item.id}
                                        className={`+ ${index % 2 === 0 ? '' : 'bg-primarygray'}`}>
                                        <td className="pr-6 pl-4 py-4 text-left whitespace-no-wrap">
                                            <div className="flex flex-row flex-nowrap items-center ">
                                                <img src={item.logo}
                                                     alt=""
                                                     className="w-10 h-10 rounded-full"/>
                                                <div className="flex flex-col pl-2">
                                                    <div className="paragraph text-secondary">
                                                        <NavLink to={`dashboard/analyst/${item.name}`}>
                                                            {item.name}
                                                        </NavLink>
                                                    </div>
                                                    <div className="caption text-text truncate"
                                                         style={{maxWidth: "170px"}}>
                                                        {item.base_url}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="pr-6 pl-4 py-4 text-left whitespace-no-wrap">
                                            <div className="caption text-secondary">
                                                {item.language}
                                            </div>
                                        </td>
                                        <td className="pr-6 pl-4 py-4 text-left whitespace-no-wrap">
                                            <div className="  caption text-secondary">
                                                {item.timestamp}
                                            </div>
                                        </td>
                                        <td className="pr-6 pl-4 py-4 text-left whitespace-no-wrap">
                                            <div className="  caption text-secondary">
                                                {item.platform}
                                            </div>
                                        </td>
                                        <td className="pr-6 pl-4 py-4 text-left whitespace-no-wrap">
                                            <div className="  caption text-secondary">
                                                {item.platformRank}
                                            </div>
                                        </td>
                                        <td className="pr-6 pl-4 py-4 text-left whitespace-no-wrap">
                                            <div className="  caption text-secondary">
                                                {item.rank}
                                            </div>
                                        </td>
                                        <td className="pr-6 pl-4 py-4 text-left whitespace-no-wrap">
                                            <div className="  caption text-secondary">
                                                {item.status}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>*/}
        </div>
      </div>
    </>
  );
};

export default Table;
