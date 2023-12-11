import React, { useState } from "react";
import { handleSearchKeyword } from "../../services/NoticeService";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchType, setSearchType] = useState("title");
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
  };
  return (
    <div className="relative mt-10 flex justify-center items-center">
      <div className="flex justify-start w-full max-w-3xl space-x-4">
        <button
          id="dropdownActionButton"
          data-dropdown-toggle="dropdownAction"
          className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          style={{ width: "100px" }}
        >
          <span className="sr-only">Action button</span>
          카테고리
          <svg
            className="w-2.5 h-2.5 ml-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          id="dropdownAction"
          className={`absolute z-15 ${
            isOpen ? "block" : "hidden"
          } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
          style={{ marginTop: "55px" }}
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownActionButton"
          >
            <li
              onClick={() => handleSearchTypeChange("title")}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              전체
            </li>
            <li
              onClick={() => handleSearchTypeChange("title")}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              글 번호
            </li>
            <li
              onClick={() => handleSearchTypeChange("title")}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              제목만
            </li>
            <li
              onClick={() => handleSearchTypeChange("title")}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              작성자
            </li>
            <li
              onClick={() => handleSearchTypeChange("title")}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              작성일
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyPress={(event) => event.key === "Enter" && handleSearchKeyword()}
              id="table-search-users"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="검색어를 입력해주세요."
            />
            {/* <button onClick={handleSearch}>검색</button> */}
            <button
              onClick={() =>
                handleSearchClick(searchType, searchTerm, setResults)
              }
            >
              검색
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
