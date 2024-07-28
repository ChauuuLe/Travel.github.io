import React, { useState } from "react";
import './ExpenseTracking.css';

const ExpenseTracking = (props) => {
  const {
    expenseTracking,
    members,
    onDataChangeExpenseTracking,
  } = props;
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [newExpenseTitle, setNewExpenseTitle] = useState('');
  const [newExpenseCost, setNewExpenseCost] = useState('');

  const togglePayStatus = (curExpense, member) => {
    const updatedExpenses = expenseTracking.map(expense => {
      if (expense.title === curExpense.title) {
        const updatedPayStatus = {
          ...expense.payStatus,
          [member]: !expense.payStatus[member]
        };
        return { ...expense, payStatus: updatedPayStatus };
      }
      return expense;
    });
    onDataChangeExpenseTracking(updatedExpenses);
  };

  const archiveExpense = (curExpense) => {
    const updatedExpenses = expenseTracking.filter(expense => expense.title !== curExpense.title);
    onDataChangeExpenseTracking(updatedExpenses);
    setSelectedExpense(null);
  };

  const addExpense = () => {
    const todayDate = new Date().toISOString().split('T')[0];
    const newPayStatus = members.reduce((acc, member) => {
      acc[member.username] = false; // Assuming member object has a username property
      return acc;
    }, {});
    const newExpense = {
      day: todayDate,
      title: newExpenseTitle,
      cost: parseFloat(newExpenseCost),
      payStatus: newPayStatus,
    };
    onDataChangeExpenseTracking([...expenseTracking, newExpense]);
    setNewExpenseTitle('');
    setNewExpenseCost('');
  };

  return (
    <div className="expense-tracking">
      <h2>Expense Tracking</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Total cost($)</th>
            <th>Pay on</th>
          </tr>
        </thead>
        <tbody>
          {expenseTracking.map((expense, index) => (
            <tr key={index} onClick={() => setSelectedExpense(expense)}>
              <td>{expense.title}</td>
              <td>{expense.cost.toFixed(2)}$</td>
              <td>{expense.day}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedExpense && (
        <div className="expense-details">
          <h3>{selectedExpense.title} - Details</h3>
          <table>
            <thead>
              <tr>
                <th>Member</th>
                <th>Paid</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member._id}>
                  <td>{member.username}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedExpense.payStatus[member.username]}
                      onChange={() => togglePayStatus(selectedExpense, member.username)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {Object.values(selectedExpense.payStatus).every(paid => paid) && (
            <button className="archive-button" onClick={() => archiveExpense(selectedExpense)}>Archive</button>
          )}
          <button onClick={() => setSelectedExpense(null)}>Close</button>
        </div>
      )}

      <div className="add-expense">
        <h3>Add New Expense</h3>
        <input
          type="text"
          placeholder="Title"
          value={newExpenseTitle}
          onChange={(e) => setNewExpenseTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cost"
          value={newExpenseCost}
          onChange={(e) => setNewExpenseCost(e.target.value)}
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>
    </div>
  );
};

export default ExpenseTracking;
