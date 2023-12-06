// src/FindEmailForm.js
import React, { useState } from 'react';
import "./FindEmailForm.css";

function FindEmailForm() {
  const [userId, setUserId] = useState('');

  const handleFindEmail = () => {
    // Implement find email logic or navigate to the find email page
    console.log('Find email request for:', userId);
    // Code to send userId to the server and find associated email would go here
  };

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Recode
        </h2>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          아이디 찾기
        </h2>
      </div>
  
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              아이디
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
  
          <div className="flex items-center justify-between space-x-4">
            <button
              type="button"
              className="w-1/2 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              취소
            </button>
            <button
              type="submit"
              className="w-1/2 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              다음
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
  
  );
}

export default FindEmailForm;
