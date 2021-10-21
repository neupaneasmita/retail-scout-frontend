import React, {useState} from "react";
import {ReactComponent as SortArrowUp} from "../../../../assets/images/dashboard/sort arrow up.svg";
import {ReactComponent as SortArrowDown} from "../../../../assets/images/dashboard/sort arrow down.svg";

const Header = ({headers, onSorting}) => {
    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");

    const onSortingChange = (field) => {
        const order =
            field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

        setSortingField(field);
        setSortingOrder(order);
        onSorting(field, order);
    };

    return (
        <>
            {/*<thead>*/}
            {/*<tr className="w-full h-16 border-gray-300 dark:border-gray-200 border-b py-8">*/}
            {/*    <th className="pl-8 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">*/}
            {/*        <input type="checkbox"*/}
            {/*               className="cursor-pointer relative w-5 h-5 border rounded border-gray-400 dark:border-gray-200 bg-white dark:bg-gray-800 outline-none"*/}
            {/*               onClick="checkAll(this)"/>*/}
            {/*    </th>*/}
            {/*    <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">*/}
            {/*        <div className="text-gray-600 dark:text-gray-400 opacity-0 cursor-default relative w-10">*/}
            {/*            <div className="absolute top-0 right-0 w-5 h-5 mr-2 -mt-1 rounded-full bg-indigo-700 text-white flex justify-center items-center text-xs">3</div>*/}
            {/*            <svg xmlns="http://www.w3.org/2000/svg"*/}
            {/*                 className="icon icon-tabler icon-tabler-file"*/}
            {/*                 width={28}*/}
            {/*                 height={28}*/}
            {/*                 viewBox="0 0 24 24"*/}
            {/*                 strokeWidth="1.5"*/}
            {/*                 stroke="currentColor"*/}
            {/*                 fill="none"*/}
            {/*                 strokeLinecap="round"*/}
            {/*                 strokeLinejoin="round">*/}
            {/*                <path stroke="none"*/}
            {/*                      d="M0 0h24v24H0z"/>*/}
            {/*                <path d="M14 3v4a1 1 0 0 0 1 1h4"/>*/}
            {/*                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"/>*/}
            {/*            </svg>*/}
            {/*        </div>*/}
            {/*    </th>*/}
            {/*    <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Invoice*/}
            {/*        Number*/}
            {/*    </th>*/}
            {/*    <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Client</th>*/}
            {/*    <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Company*/}
            {/*        Contact*/}
            {/*    </th>*/}
            {/*    <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Amount</th>*/}
            {/*    <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Date</th>*/}
            {/*    <th className="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">*/}
            {/*        <div className="opacity-0 w-2 h-2 rounded-full bg-indigo-400"/>*/}
            {/*    </th>*/}
            {/*    <td className="text-gray-600 dark:text-gray-400 font-normal pr-8 text-left text-sm tracking-normal leading-4">More</td>*/}
            {/*</tr>*/}
            {/*</thead>*/}

            <thead className="">
            <tr className="w-full border-b">
                {headers.map(({name, field, sortable}) => (
                    <td
                        className="pr-6 pl-4 py-4"
                        key={name}
                        onClick={() =>
                            sortable ? onSortingChange(field) : null
                        }
                    >
                        <div className="text-left flex items-center paragraph text-secondary">
                            {name}

                            <div className="pl-1 flex flex-col cursor-pointer">
                                <SortArrowUp/>
                                <SortArrowDown/>
                            </div>

                            {sortingField && sortingField === field && (
                                <div className="pl-1">
                                    {
                                        sortingOrder === "asc"
                                            ? 'A'
                                            : 'D'
                                    }
                                </div>
                            )}
                        </div>
                    </td>
                ))}
            </tr>
            </thead>
        </>
    );
};

export default Header;