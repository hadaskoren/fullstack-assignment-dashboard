import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TimeRange = ({ date, onTimeChange }) => {
  const {startDate, endDate} = date

  const handleStartDateChange = (date) => {
    onTimeChange(date, endDate);
  };

  const handleEndDateChange = (date) => {
    onTimeChange(startDate, date);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="flex w-[400px] justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700">From:</label>
          <DatePicker
            className="datepicker-input"
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">To:</label>
          <DatePicker
            className="datepicker-input"
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>
    </div>
  );
};

export default TimeRange;

