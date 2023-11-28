import React, { useState } from 'react';

function DateTimePicker({onChange}) {

  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  const timeOptions = [];
  
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) { 
      const hour = i.toString().padStart(2, '0');
      const minute = j.toString().padStart(2, '0');
      timeOptions.push(`${hour}:${minute}`);
    }
  }
  
  const dateOptions = ['월', '화', '수', '목', '금', '토', '일'];


  const handleTimeChange = (e) => {
    setTime(e.target.value);
    onChange({
      target: {
        name: 'time',
        value: e.target.value,
      },
    });
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    onChange({
      target: {
        name: 'date',
        value: e.target.value,
      },
    });
  }
  return (
    <div>
      <label>
        날짜 선택:
        <select value={date} onChange={handleDateChange}>
          {dateOptions.map((day, index) => (
            <option key={index} value={day}>{day}</option>
          ))}
        </select>
      </label>
      <label>
        시간 선택:
        <select value={time} onChange={handleTimeChange}>
          {timeOptions.map((time, index) => (
            <option key={index} value={time}>{time}</option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default DateTimePicker;
