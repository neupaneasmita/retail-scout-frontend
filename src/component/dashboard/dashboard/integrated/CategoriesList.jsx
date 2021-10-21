import React, { useState } from "react";

import PlatformFilter from "./filter/PlatformFilter";
import CategoryFilter from "./filter/CategoryFilter";
// import TechnologyFilter from "./filter/TechnologyFilter";
import TechnologyNameFilter from "./filter/TechnologyNameFilter";
import TechnologyTypeFilter from "./filter/TechnologyTypeFilter";
import LanguageFilter from "./filter/LanguageFilter";
import InstagramFollowersFilter from "./filter/InstagramFollowersFilter";
import FacebookFollowersFilter from "./filter/FacebookFollowersFilter";
import YoutubeFollowersFilter from "./filter/YoutubeFollowersFilter";
import TiktokFollowersFilter from "./filter/TiktokFollowersFilter";
import TwitterFollowersFilter from "./filter/TwitterFollowersFilter";
import PinterestFollowersFilter from "./filter/PinterestFollowersFilter";
import CompanySizeFilter from "./filter/CompanySizeFilter";

//Checkboxes for Followers Counts
import FacebookFollowersCheckboxFilter from "./filter/FacebookFollowersCheckboxFilter";
import InstagramFollowersCheckboxFilter from "./filter/InstagramFollowersCheckboxFilter";
import PinterestFollowersCheckboxFilter from "./filter/PinterestFollowersCheckboxFilter";
import TiktokFollowersCheckboxFilter from "./filter/TiktokFollowersCheckboxFilter";
import TwitterFollowersCheckboxFilter from "./filter/TwitterFollowersCheckboxFilter";
import YoutubeFollowersCheckboxFilter from "./filter/YoutubeFollowersCheckboxFilter";
import CompanySizeCheckboxFilter from "./filter/CompanySizeCheckboxFilter";

const CategoriesList = ({ selectedCategories, setSelectedCategories }) => {

  const [showFacebookAdvancedFilter, setShowFacebookAdvancedFilter] = useState(false);
  const [showInstagramAdvancedFilter, setShowInstagramAdvancedFilter] = useState(false);
  const [showPinterestAdvancedFilter, setShowPinterestAdvancedFilter] = useState(false);
  const [showTwitterAdvancedFilter, setShowTwitterAdvancedFilter] = useState(false);
  const [showYoutubeAdvancedFilter, setShowYoutubeAdvancedFilter] = useState(false);
  const [showTiktokAdvancedFilter, setShowTiktokAdvancedFilter] = useState(false);
  const [showCompanySizeAdvancedFilter, setShowCompanySizeAdvancedFilter] = useState(false);

  return (
    <div>

      <PlatformFilter
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      <TechnologyTypeFilter
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      <TechnologyNameFilter
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      {/* <TechnologyFilter
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      /> */}
      <LanguageFilter
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      <CategoryFilter
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      {/* Newly Added ================== */}
      {/* Facebok */}
      <div className="mb-8">
        <FacebookFollowersCheckboxFilter
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
        <div className="bg-gray-200 bg-opacity-80 transition-all hover:bg-gray-300 hover:bg-opacity-70 py-2 text-center rounded cursor-pointer mt-1">
          <div
            className="link text-secondary cursor-pointer"
            onClick={() => setShowFacebookAdvancedFilter(!showFacebookAdvancedFilter)}
          >
            {showFacebookAdvancedFilter ? 'Hide' : 'Show'} Advanced Filter
          </div>
        </div>
        {/* Advanced Filter */}
        <div className={`max-h-0 overflow-hidden ${showFacebookAdvancedFilter ? 'max-h-100' : ''}`}>
          <FacebookFollowersFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
      </div>


      {/* Instagram */}
      <div className="mb-8">
        <InstagramFollowersCheckboxFilter
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
        <div className="bg-gray-200 bg-opacity-80 transition-all hover:bg-gray-300 hover:bg-opacity-70 py-2 text-center rounded cursor-pointer mt-1">
          <div
            className="link text-secondary cursor-pointer"
            onClick={() => setShowInstagramAdvancedFilter(!showInstagramAdvancedFilter)}
          >
            {showInstagramAdvancedFilter ? 'Hide' : 'Show'} Advanced Filter
          </div>
        </div>
        {/* Advanced Filter */}
        <div className={`max-h-0 overflow-hidden ${showInstagramAdvancedFilter ? 'max-h-100' : ''}`}>
          <InstagramFollowersFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
      </div>

      {/* Pinterest */}
      <div className="mb-8">
        <PinterestFollowersCheckboxFilter
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
        <div className="bg-gray-200 bg-opacity-80 transition-all hover:bg-gray-300 hover:bg-opacity-70 py-2 text-center rounded cursor-pointer mt-1">
          <div
            className="link text-secondary cursor-pointer"
            onClick={() => setShowPinterestAdvancedFilter(!showPinterestAdvancedFilter)}
          >
            {showPinterestAdvancedFilter ? 'Hide' : 'Show'} Advanced Filter
          </div>
        </div>
        {/* Advanced Filter */}
        <div className={`max-h-0 overflow-hidden ${showPinterestAdvancedFilter ? 'max-h-100' : ''}`}>
          <PinterestFollowersFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
      </div>

      {/* Twitter */}
      <div className="mb-8">
        <TwitterFollowersCheckboxFilter
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
        <div className="bg-gray-200 bg-opacity-80 transition-all hover:bg-gray-300 hover:bg-opacity-70 py-2 text-center rounded cursor-pointer mt-1">
          <div
            className="link text-secondary cursor-pointer"
            onClick={() => setShowTwitterAdvancedFilter(!showTwitterAdvancedFilter)}
          >
            {showTwitterAdvancedFilter ? 'Hide' : 'Show'} Advanced Filter
          </div>
        </div>
        {/* Advanced Filter */}
        <div className={`max-h-0 overflow-hidden ${showTwitterAdvancedFilter ? 'max-h-100' : ''}`}>
          <TwitterFollowersFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
      </div>


      {/* Youtube */}
      <div className="mb-8">
        <YoutubeFollowersCheckboxFilter
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
        <div className="bg-gray-200 bg-opacity-80 transition-all hover:bg-gray-300 hover:bg-opacity-70 py-2 text-center rounded cursor-pointer mt-1">
          <div
            className="link text-secondary cursor-pointer"
            onClick={() => setShowYoutubeAdvancedFilter(!showYoutubeAdvancedFilter)}
          >
            {showYoutubeAdvancedFilter ? 'Hide' : 'Show'} Advanced Filter
          </div>
        </div>
        {/* Advanced Filter */}
        <div className={`max-h-0 overflow-hidden ${showYoutubeAdvancedFilter ? 'max-h-100' : ''}`}>
          <YoutubeFollowersFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
      </div>


      {/* Tikok */}
      <div className="mb-8">
        <TiktokFollowersCheckboxFilter
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
        <div className="bg-gray-200 bg-opacity-80 transition-all hover:bg-gray-300 hover:bg-opacity-70 py-2 text-center rounded cursor-pointer mt-1">
          <div
            className="link text-secondary cursor-pointer"
            onClick={() => setShowTiktokAdvancedFilter(!showTiktokAdvancedFilter)}
          >
            {showTiktokAdvancedFilter ? 'Hide' : 'Show'} Advanced Filter
          </div>
        </div>
        {/* Advanced Filter */}
        <div className={`max-h-0 overflow-hidden ${showTiktokAdvancedFilter ? 'max-h-100' : ''}`}>
          <TiktokFollowersFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
      </div>

      {/* Company Size */}
      <div className="mb-8">
        <CompanySizeCheckboxFilter
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
        <div className="bg-gray-200 bg-opacity-80 transition-all hover:bg-gray-300 hover:bg-opacity-70 py-2 text-center rounded cursor-pointer mt-1">
          <div
            className="link text-secondary cursor-pointer"
            onClick={() => setShowCompanySizeAdvancedFilter(!showCompanySizeAdvancedFilter)}
          >
            {showCompanySizeAdvancedFilter ? 'Hide' : 'Show'} Advanced Filter
          </div>
        </div>
        {/* Advanced Filter */}
        <div className={`max-h-0 overflow-hidden ${showCompanySizeAdvancedFilter ? 'max-h-100' : ''}`}>
          <CompanySizeFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
      </div>

      {/* ================= */}
    </div>
  );
};

export default React.memo(CategoriesList);
