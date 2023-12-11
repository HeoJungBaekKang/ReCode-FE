import React, { useState } from "react";

function SearchDropdown({ onSearch }) {
  const [searchType, setSearchType] = useState(""); // 기본 검색 타입
  const [searchTerm, setSearchTerm] = useState(""); // 검색어

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchType, searchTerm); // 검색 실행
  };

  return (
    <div className="flex items-center space-x-2">
      
      {/* 카테고리 선택 드롭다운 */}
      <select
        value={searchType}
        onChange={handleSearchTypeChange}
        className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">카테고리</option>
        <option value="title">제목</option>
        <option value="createdBy">작성자</option>
      </select>

      {/* 검색창, 넓이를 w-96 또는 그 이상으로 설정 */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchTermChange}
        id="table-search-users"
        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-100 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="검색어를 입력해주세요."
      />

      {/* 검색 버튼, padding을 px-2로 줄임 */}
      <button
        onClick={handleSearchClick}
        className="px-5 py-2 text-xs text-white bg-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        검색
      </button>
    </div>


  );
}

export default SearchDropdown;
