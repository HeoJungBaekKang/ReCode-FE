import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function NaverBook() {
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const chunkedBooks = chunk(books, 10);

    const updateBooks = useCallback((newBooks) => {
        setBooks(newBooks);
    }, []);

    return (
        <>
            <div className="m-10">
                <SearchBox query={query} setQuery={setQuery} setResults={updateBooks} />
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-16 py-3">
                                    <span className="sr-only">Image</span>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    도서제목
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    출판사
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    저자
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    출판일
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {chunkedBooks[currentPage] && chunkedBooks[currentPage].map((book, index) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="p-4">
                                        <img src={book.image} className="w-16 md:w-32 max-w-full max-h-full" alt={book.title} />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        <a href={book.link} target="_blank" rel="noopener noreferrer">
                                            {book.title}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4">
                                        {book.publisher}
                                    </td>
                                    <td className="px-6 py-4">
                                        {book.author}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {book.pubdate}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-6 flex justify-center">
                <nav aria-label="Page navigation example">
                    <ul className="list-style-none flex">
                        <li key="previous-button">
                            <button
                                disabled={currentPage === 0}
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${currentPage === 0 ? 'text-neutral-500' : 'text-neutral-600'} transition-all duration-300 dark:text-neutral-400`}
                            >
                                Previous
                            </button>
                        </li>
                        {chunkedBooks.map((_, index) => (
                            <li key={`page-button-${index}`}>
                                <button
                                    onClick={() => setCurrentPage(index)}
                                    className={`relative block rounded px-3 py-1.5 text-sm ${index === currentPage ? 'text-neutral-50 bg-blue-200' : 'text-neutral-600'} transition-all duration-300 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li key="next-button">
                            <button
                                disabled={currentPage === chunkedBooks.length - 1}
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${currentPage === chunkedBooks.length - 1 ? 'text-neutral-500' : 'text-neutral-600'} transition-all duration-300 dark:text-neutral-400`}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

function chunk(array, size) {
    const chunked_arr = [];
    let copied = [...array];

    while (copied.length > 0) {
        chunked_arr.push(copied.splice(0, size));
    }

    return chunked_arr;
}

function SearchBox({ query, setQuery, setResults }) {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/book/${query}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                setResults(response.data.items || []);
            } catch (error) {
                setResults([]);
            }
        };

        if (query) {
            fetchData();
        } else {
            setResults([]);
        }
    }, [query, setResults]);

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