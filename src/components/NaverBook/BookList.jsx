import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NaverBook() {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    return (
        <>
            <div className="m-10">
                <SearchBox query={query} setQuery={setQuery} setResults={setResults} />
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-16 py-3">
                                    <span class="sr-only">Image</span>
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    도서제목
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    출판사
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    저자
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    출판일
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((book, index) => (
                                <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td class="p-4">
                                        <img src={book.image} class="w-16 md:w-32 max-w-full max-h-full" alt={book.title} />
                                    </td>
                                    <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        <a href={book.link} target="_blank" rel="noopener noreferrer">
                                            {book.title}
                                        </a>
                                    </td>
                                    <td class="px-6 py-4">
                                        {book.publisher}
                                    </td>
                                    <td class="px-6 py-4">
                                        {book.author}
                                    </td>
                                    <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {book.pubdate}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

function SearchBox({ query, setQuery, setResults }) {

    useEffect(() => {
        if (query) {
            axios.get(`http://localhost:8081/api/book/${query}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    setResults(response.data.items || []);
                })
                .catch(error => {
                    console.error("Error fetching data: ", error.response.data);
                    setResults([]);
                });
        } else {
            setResults([]);
        }
    }, [query]);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <input
            type="text"
            id="table-search-users"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="검색어를 입력해주세요."
            value={query}
            onChange={handleInputChange}
        />
    );
}