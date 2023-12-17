import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateRangePicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // 시작 날짜 변경 이벤트 핸들러
  const handleStartDateChange = (date) => {
    setStartDate(date);
    // 마지막 날짜와 비교하여 조건을 설정할 수 있습니다.
    if (endDate && date > endDate) {
      setEndDate(null);
    }
  };

  // 마지막 날짜 변경 이벤트 핸들러
  const handleEndDateChange = (date) => {
    // 시작 날짜와 비교하여 조건을 설정할 수 있습니다.
    if (startDate && date < startDate) {
      alert('마지막 날짜는 시작 날짜 이후여야 합니다.');
    } else {
      setEndDate(date);
    }
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="시작 날짜 선택"
      />
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate} // 시작 날짜 이후만 선택 가능
        placeholderText="마지막 날짜 선택"
      />
    </div>
  );
}

export default DateRangePicker;
