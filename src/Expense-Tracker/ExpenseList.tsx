import React from "react";
interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}
interface Props {
  expenses: Expense[];
  onDelete: (id: Number) => void;
}

const ExpenseList = ({ expenses, onDelete }: Props) => {
  if (expenses.length === 0) return null;

  return (
    <table className="table table-borderd">
      <thead>
        <th>Description</th>
        <th>Amount</th>
        <th>Category</th>
        <th></th>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.description}</td>
            <td>{expense.amount}</td>
            <td>{expense.category}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDelete(expense.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <td>Total</td>
        <td>
          $
          {expenses
            .reduce((acc, expense) => acc + expense.amount, 0)
            .toFixed(2)}
        </td>
        <td></td>
        <td></td>
      </tfoot>
    </table>
  );
};

export default ExpenseList;
