import { useState } from "react";
import ExpenseList from "./ExpenseList";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseForm from "./ExpenseForm";

// now we can't expand our array as well after setting as const

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Utilities" },
    { id: 2, description: "aaa", amount: 10, category: "Utilities" },
    { id: 3, description: "aaa", amount: 10, category: "Utilities" },
    { id: 4, description: "aaa", amount: 10, category: "Utilities" },
    { id: 5, description: "aaa", amount: 10, category: "Utilities" },
  ]);

  const handleExpenseDelete = (id: Number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // since on state change this component will again computed(means this function will re-run) and the visibleExpense will be updated , so no need to create another use state for this.
  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <div>
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) => {
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }]);
          }}
        />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <ExpenseList expenses={visibleExpenses} onDelete={handleExpenseDelete} />
    </div>
  );
};

export default Page;
