import React from "react";
import { NavLink } from "react-router-dom";
import EnhancedTableHead from "./EnhancedTableHead";
import { useSelector } from "react-redux";
import logo from "../../../../assets/images/home/logo2.svg";
import { ReactComponent as Check } from "../../../../assets/images/dashboard/check.svg";

function EnhancedTable({ selected, setSelected }) {
  const rows = useSelector((state) => state.fetchtableList.Lists);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newItem = rows[0].map((item) => item);
      setSelected(newItem);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const errorImg = (e, currentName) => {
    e.target.style.display='none';
    var newAvatar = document.createElement("div");
    newAvatar.classList.add("w-10", "h-10",  "flex", "justify-center", "items-center", "rounded-full", "capitalize", "bg-secondary", "text-white");
	  var textNode = document.createTextNode(currentName.charAt(0)); 
	  newAvatar.appendChild(textNode);
    e.target.parentNode.prepend(newAvatar);
  };

  return (
    <table className="relative min-w-full">
      <EnhancedTableHead
        numSelected={selected.length}
        rowCount={rows.length === 1 ? rows[0].length : ""}
        onSelectAllClick={handleSelectAllClick}
      />
      {rows.length === 0 && (
        <tbody className="">
          <tr className="">
            <td colSpan="6" className="">
              <img
                src={logo}
                alt=""
                className="mx-auto w-56 animate-bounce mt-5"
              />
            </td>
          </tr>
        </tbody>
      )}

      <tbody className="divide-y">
        {Array.isArray(rows) &&
          rows.map((singleRow) => {
            return singleRow.map((item, index) => {
              const isItemSelected = isSelected(item);
              const currentName = item.name;
              return (
                <tr
                  key={item._id.$oid}
                  className={`${index % 2 === 0 ? "" : "bg-primarygray"}`}
                >
                  <td className="px-6 py-4 text-left whitespace-no-wrap tracking-normal leading-4">
                    <div className="flex items-center">
                      <div className="relative z-10">
                        <input
                          type="checkbox"
                          onChange={(event) => handleClick(event, item)}
                          checked={isItemSelected}
                          className={`absolute cursor-pointer -top-2 left-0 rounded w-4 h-4 z-20 ${isItemSelected ? "opacity-0" : "opacity-100"
                            }`}
                          style={{ border: "1px solid #C9CBCC" }}
                        />
                        <div
                          className={`absolute -top-2 left-0 rounded z-10 w-5 h-5 -m-px bg-primary transform ${isItemSelected ? "opacity-100" : "opacity-0"
                            }`}
                        >
                          {isItemSelected && <Check className="mx-auto mt-1" />}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left whitespace-no-wrap tracking-normal leading-4">
                    <NavLink to={`dashboard/analytics/${item._id.$oid}`}>
                      <div className="flex flex-row flex-nowrap items-center">
                        <img
                            src={item.logo}
                            alt=""
                            onError={(e) => errorImg(e, currentName)}
                            className="w-10 h-10 object-contain rounded-full flex-none"
                          />

                        <div className="flex flex-col pl-2.5">
                          <div
                            className="paragraph text-link truncate"
                            style={{ maxWidth: "170px" }}
                          >
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </td>
                  <td className="px-6 py-4 text-left whitespace-no-wrap tracking-normal leading-4">
                    <div className="caption text-secondary">
                      {item.platform}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left whitespace-no-wrap tracking-normal leading-4">
                    <div className="caption text-secondary">
                      {item.language ? <>{item.language}</> : "Unknown"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left whitespace-no-wrap tracking-normal leading-4">
                    <div className="caption text-secondary">
                      {item.company_size}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left whitespace-no-wrap tracking-normal leading-4">
                    {item.locations && item.locations[0] ? (
                      <>{item.locations[0]}</>
                    ) : <>{item.country}</> }
                  </td>
                </tr>
              );
            });
          })}
      </tbody>
    </table >
  );
}

export default React.memo(EnhancedTable);
