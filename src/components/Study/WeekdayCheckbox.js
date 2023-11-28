import React, { useState } from 'react';

function WeekdayCheckbox() {
  // 각 요일의 체크 상태를 관리하는 상태 변수들
  const [mondayChecked, setMondayChecked] = useState(true);
  const [tuesdayChecked, setTuesdayChecked] = useState(true);
  const [wednesdayChecked, setWednesdayChecked] = useState(true);
  const [thursdayChecked, setThursdayChecked] = useState(true);
  const [fridayChecked, setFridayChecked] = useState(true);
  const [saturdayChecked, setSaturdayChecked] = useState(true);
  const [sundayChecked, setSundayChecked] = useState(true);

  return (
    <div>
      <div className="flex items-center me-4">
        <input
          id="monday-checkbox"
          type="checkbox"
          checked={mondayChecked}
          onChange={() => setMondayChecked(!mondayChecked)}
          className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="monday-checkbox"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          월요일
        </label>
      </div>
      <div className="flex items-center me-4">
        <input
          id="tuesday-checkbox"
          type="checkbox"
          checked={tuesdayChecked}
          onChange={() => setTuesdayChecked(!tuesdayChecked)}
          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="tuesday-checkbox"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          화요일
        </label>
      </div>
      <div className="flex items-center me-4">
        <input
          id="wednesday-checkbox"
          type="checkbox"
          checked={wednesdayChecked}
          onChange={() => setWednesdayChecked(!wednesdayChecked)}
          className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="wednesday-checkbox"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          수요일
        </label>
      </div>
      <div className="flex items-center me-4">
        <input
          id="thursday-checkbox"
          type="checkbox"
          checked={thursdayChecked}
          onChange={() => setThursdayChecked(!thursdayChecked)}
          className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="thursday-checkbox"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          목요일
        </label>
      </div>
      <div className="flex items-center me-4">
        <input
          id="friday-checkbox"
          type="checkbox"
          checked={fridayChecked}
          onChange={() => setFridayChecked(!fridayChecked)}
          className="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="friday-checkbox"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          금요일
        </label>
      </div>
      <div className="flex items-center me-4">
        <input
          id="saturday-checkbox"
          type="checkbox"
          checked={saturdayChecked}
          onChange={() => setSaturdayChecked(!saturdayChecked)}
          className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="saturday-checkbox"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          토요일
        </label>
      </div>
      <div className="flex items-center me-4">
        <input
          id="sunday-checkbox"
          type="checkbox"
          checked={sundayChecked}
          onChange={() => setSundayChecked(!sundayChecked)}
          className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="sunday-checkbox"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          일요일
        </label>
      </div>
    </div>
  );
}

export default WeekdayCheckbox;
