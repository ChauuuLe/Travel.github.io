import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendar } from 'react-icons/fa';
import './schedule.css';

const Schedule = (props) => {
  const { members, dates, onDataChange } = props;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [startDate, setStartDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [dateKeys, setDateKeys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (dates && dates.length > 0) {
      const newDateKeys = [...new Set(dates.flatMap(member => Object.keys(member.dates)))];
      setDateKeys(newDateKeys);
    }
  }, [dates]);

  if (!currentUser) {
    return null;
  }

  const handleDateChange = (memberName, date, status) => {
    const updatedDates = dates.map((member) => {
      if (member.username === memberName) {
        return {
          ...member,
          dates: {
            ...member.dates,
            [date]: status,
          },
        };
      }
      return member;
    });

    onDataChange(updatedDates);
  };

  const addNewDate = (date) => {
    const newDateKey = date.toISOString().split('T')[0];
    console.log("Adding new date:", newDateKey);
    const updatedDates = members.map((member) => {
      return {
        ...member,
        dates: {
          ...member.dates,
          [newDateKey]: 'unknown',
        },
      };
    });

    console.log("Updated dates:", updatedDates);
    onDataChange(updatedDates);
    setIsDatePickerOpen(false);
  };

  const renderTable = () => {
    console.log("Date keys:", dateKeys);

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {dateKeys.map((date) => (
              <th key={date}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id}>
              <td>{member.username}</td>
              {dateKeys.map((date) => (
                <td key={date}>
                  <select
                    value={dates.find((d) => d.username === member.username)?.dates[date] || 'unknown'}
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