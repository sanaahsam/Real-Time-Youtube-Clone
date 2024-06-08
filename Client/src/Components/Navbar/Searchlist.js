import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchList({ TitleArray, setSearchQuery }) {
  return (
    <>
      <div className="searchList">
        {TitleArray.map((m) => {
          return (
            <p key={m} onClick={(e) => setSearchQuery(m)} className="item">
              <FaSearch className="s-icon" size={15} />
              {m}
            </p>
          );
        })}
      </div>
    </>
  );
}

export default SearchList;
