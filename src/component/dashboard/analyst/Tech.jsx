import React from "react";
import { Link } from "react-router-dom";
const Tech = ({ filteredData }) => {
  return (
    <>
      {filteredData.technologies && (
        <div className="flex-1 relative overflow-x-auto">
          <div className="w-full overflow-auto">
            <table className="relative min-w-full">
            <thead>
              <tr>
                <td className="text-left min-w-50 px-2 py-4 link text-secondary">
                  Name
                </td>
                <td className="text-left min-w-60 px-2 py-4 link text-secondary">
                  Description
                </td>
                <td className="text-left min-w-50 px-4 py-4 link text-secondary">
                  Used by brands
                </td>
              </tr>
            </thead>

            {filteredData.technologies.map((techData, techIndex) => {
              return (
                <tbody className="" key={techIndex}>
                  <tr
                    className={` bg-divider bg-opacity-30 hover:bg-divider hover:bg-opacity-70`}
                  >
                    <td
                      colSpan="3"
                      className={`px-3 py-4 font-semibold text-secondary`}
                    >
                      {techData.type}
                    </td>
                  </tr>
                  {techData.subcategories.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className={`border-l-8 border-primary border-opacity-50`}
                      >
                        <td
                          className={`min-w-50 px-2 ${
                            index > 0 && "border-t border-divider"
                          }`}
                        >
                          <Link
                            to={{ pathname: `${item.website}` }}
                            className="cursor-pointer"
                            target="_blank"
                          >
                            <div className="flex flex-row flex-nowrap items-center py-4">
                              <img
                                src={item.icon}
                                alt=""
                                className="w-10 h-10 rounded-full"
                              />
                              <div className="flex flex-col pl-2">
                                <div className="paragraph text-secondary">
                                  {item.name}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td
                          className={`min-w-60 px-2 ${
                            index > 0 && "border-t border-divider"
                          }`}
                        >
                          <div className="py-4  caption text-secondary ">
                            {item.description}
                          </div>
                        </td>
                        <td
                          className={`min-w-50 px-4 ${
                            index > 0 && "border-t border-divider"
                          }`}
                        >
                          <div className="py-4  caption text-secondary">
                            {Intl.NumberFormat("en-US").format(item.used_by)}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              );
            })}
          </table>
          </div>
        </div>
      )}
      </>
  );
};

export default Tech;
