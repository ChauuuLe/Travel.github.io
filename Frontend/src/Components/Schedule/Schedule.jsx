import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendar } from 'react-icons/fa';
import './Schedule.css';

const Schedule = (props) => {
  const {
    members = [],
    selectedDates = {},
    dates = [],
    onDataChangeDates,
    onDataChangeSelectedDates,
  } = props;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [startDate, setStartDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  const handleDateChange = (memberName, date, status) => {
    const updatedDates = {
      ...selectedDates,
      [memberName]: {
        ...selectedDates[memberName],
        [date]: status,
      }
    };
    onDataChangeSelectedDates(updatedDates);
  };

  const addNewDate = (date) => {
    const newDateKey = date.toISOString().split('T')[0];
    if (!dates.includes(newDateKey)) {
      onDataChangeDates([...dates, newDateKey]);
      const updatedDates = Object.fromEntries(
        Object.entries(selectedDates).map(([memberName, memberDates]) => [
          memberName,
          {
            ...memberDates,
            [newDateKey]: 'unknown',
          }
        ])
      );
      onDataChangeSelectedDates(updatedDates);
    }
    setIsDatePickerOpen(false);
  };

  const renderStatus = (username, date) => {
    return selectedDates[username]?.[date] || 'unknown';
  };

  const renderTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {dates.map((date) => (
              <th key={date}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id}>
              <td>{member.username}</td>
              {dates.map((date) => (
                <td key={date}>
                  <select
                    value={renderStatus(member.username, date)}
                    onChange={(e) => handleDateChange(member.username, date, e.target.value)}
                  >
                    <option value="yes">✔️</option>
                    <option value="no">❌</option>
                    <option value="unknown">❓</option>
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="select-dates-container">
      <button
        className="add-date-button"
        onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
      >
        <FaCalendar /> Add Date
      </button>
      {isDatePickerOpen && (
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            addNewDate(date);
          }}
          inline
        />
      )}
      {renderTable()}
    </div>
  );
}

export default Schedule;
