import React, { useState } from "react";
import "../Navbar/NavbarStyle/searchbar.css";
import { FaMicrophone, FaSearch } from "react-icons/fa";
import SearchList from "../Navbar/Searchlist";
import useFetchSearchArray from "../../Hooks/searchArray";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchList, setSearchList] = useState(false);
  const navigate = useNavigate();
  const { searchArray } = useFetchSearchArray(); // Rename SearchArray to searchArray

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
      // Reset search state after navigation
      setSearchList(false);
      setSearchQuery("");
    }
  };

  const TitleArray = searchArray.filter((title) =>
    title.toLowerCase().includes(searchQuery.toLowerCase())
  ); // Filter searchArray directly based on searchQuery

  return (
    <>
      <div className="SearchBar_Container">
        <div className="search_div">
          <input
            type="text"
            className="iBox_SearchBar"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            onClick={() => setSearchList(true)}
          />

          {searchQuery && searchList && (
            <SearchList
              setSearchQuery={setSearchQuery}
              TitleArray={TitleArray}
            />
          )}
        </div>
        <div className="search-icon" onClick={handleSearch}>
          <FaSearch size={20} className="searchIcon_SearchBar" />
        </div>

        <div className="icon">
          <FaMicrophone size={20} />
        </div>
      </div>
    </>
  );
}

export default SearchBar;
