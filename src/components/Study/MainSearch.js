import React, { useState } from "react";
import { TERipple } from 'tw-elements-react';
import { handleSearchKeyword } from "../../services/FilterService";

function SearchMain({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState(""); // 검색어
    const [results, setResults] = useState([]) // 검색 결과

    const handleSearch = async () => {
        try {
            const results = await handleSearchKeyword(searchTerm);
            setResults(results.data);
        } catch (error) {
            console.error("검색 중 오류 발생", error);
        }
    };

    const handleSearchButtonClick = () => {
        onSearch(searchTerm); // Main 컴포넌트의 handleSearch 함수를 호출
    };

    return (
        <div className="flex items-center space-x-2">

            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                id="table-search-users"
                className="relative m-0 -mr-0.5 block w-30 min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-gray-200 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                placeholder="검색어를 입력해주세요."
                aria-label="Search"
                aria-describedby="button-addon1"
            />

            <TERipple color="light">
                <button
                    onClick={handleSearchButtonClick}
                    className="px-5 py-2 text-xs text-white bg-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    id="button-addon1"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </TERipple>
        </div >


    );
}

export default SearchMain;
