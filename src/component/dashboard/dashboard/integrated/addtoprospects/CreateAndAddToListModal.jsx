import React, { useState } from "react";

const CreateAndAddToListModal = ({ createAndAddList, selected }) => {
  const initialFormState = { name: "", items: [...selected] };

  const [list, setList] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setList({ ...list, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!list.name) {
      return null;
    } else {
      createAndAddList(list);
      setList(initialFormState);
    }
  };

  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex justify-center bg-white"
        >
          <div className="w-full text-gray-800 flex flex-col justify-center">
            <div className="w-full mt-6 mb-4">
              <div className="flex flex-col">
                <label
                  htmlFor="currentPassword"
                  className="caption text-secondary mb-2"
                >
                  List Name
                </label>
                <input
                  required
                  id="name"
                  name="name"
                  placeholder="Write new list name"
                  value={list.name}
                  className="rounded-sm border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                  onChange={handleInputChange}
                  type="text"
                />
              </div>
            </div>

            <div className="">
              <button type="submit" className="primary-button">
                Create and add to List
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default React.memo(CreateAndAddToListModal);
