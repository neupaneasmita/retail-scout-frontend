import React from "react";

const ProductItems = ({ data }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {data.map((item, index) => {
        if (data.length > 0) {
          return (
            <div
              key={item.id}
              className="overflow-hidden shadow-lg rounded-lg h-90 max-w-xs m-auto"
            >
              <div className="w-full block h-full">
              <a href={"http://" + item.store_id + '/products/' + item.product_handle}>
                <img
                  alt=""
                  src={item.product_image_url}
                  className="max-h-44 w-full object-cover"
                />
                </a>
                <div className="bg-white w-full p-4">
                  <div className="text-secondary heading-5 mb-2">
                    {item.product_title}
                  </div>
                  <div className="caption text-text line-clamp-3">
                    {item.product_description}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col justify-between text-sm">
                      <div className="text-secondary">{item.store_id}</div>
                    </div>
                    <div className="block relative">
                      <div className="text-secondary heading-4">
                        {'$'+item.product_price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )};
        })}
      </div>

      <div className="flex justify-center pt-6 md:pt-10">
        <button className="primary-button" type="button">
          Load More
        </button>
      </div>
    </>
  );
};

export default ProductItems;
