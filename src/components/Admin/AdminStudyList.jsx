import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminStudyList({ filteredStudies }) {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  if (!filteredStudies || !filteredStudies.length) {
    return <div>스터디가 없습니다. </div>;
  }

  const chunkedPosts = chunk(filteredStudies, 9);
  const currentPagePosts = chunkedPosts[currentPage];

  // 현재 페이지의 스터디 목록이 없거나 배열이 아닌 경우 처리
  if (!Array.isArray(currentPagePosts) || currentPagePosts.length === 0) {
    return <div>스터디가 없습니다.</div>;
  }

    return (
        <div className="bg-white py-24 sm:py-5">
            <div className="mx-auto max-w-9xl px-6 lg:px-8">
                <div className="mx-auto mt-10m max-w-2xl gap-y-4 gap-x-6 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-3 grid-flow-row-dense">
                    {chunkedPosts[currentPage].map((post) => (
                        <article key={post.id} className="flex max-w-xl flex-col items-start justify-between border-2 border-gray-200 p-4 rounded-md">
                            <div className="flex items-center gap-x-4 text-xs">
                                <time dateTime={post.datetime} className="text-gray-500">
                                    {post.date}
                                </time>
                                <a
                                    href={post.category.href}
                                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                >
                                    {post.category.title}
                                </a>
                            </div>
                            <div className="group relative">
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                    <a href={post.href}>
                                        <span className="absolute inset-0" />
                                        {post.title}
                                    </a>
                                </h3>
                                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                            </div>
                            <div className="relative mt-8 flex items-center gap-x-4">
                                <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                                <div className="text-sm leading-6">
                                    <p className="font-semibold text-gray-900">
                                        <a href={post.author.href}>
                                            <span className="absolute inset-0" />
                                            {post.author.name}
                                        </a>
                                    </p>
                                    <p className="text-gray-600">{post.author.role}</p>
                                </div>
                            </div>
                        </article>
                    ))}
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
                            {chunkedPosts.map((_, index) => (
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
                                    disabled={currentPage === chunkedPosts.length - 1}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${currentPage === chunkedPosts.length - 1 ? 'text-neutral-500' : 'text-neutral-600'} transition-all duration-300 dark:text-neutral-400`}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
          </div>
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