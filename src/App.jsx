import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [budget, setBudget] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [isEditBudget, setIsEditBudget] = useState(false);
  const [expenseCost, setExpenseCost] = useState(0);
  const [expenseName, setExpenseName] = useState("");
  const [expensesList, setExpensesList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExpenseIndex, setCurrentExpenseIndex] = useState(null);

  useEffect(() => {
    setRemaining(budget - totalExpenses);
  }, [budget, totalExpenses]);

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const saveBudget = async () => {
    setRemaining(budget - totalExpenses);
    setIsEditBudget(false);
  };

  const handleNameChange = (e) => {
    setExpenseName(e.target.value);
  };

  const handleExpenseChange = (e) => {
    setExpenseCost(Number(e.target.value));
  };

  const handleSaveExpense = () => {
    if (isEditing) {
      const updatedExpensesList = [...expensesList];
      updatedExpensesList[currentExpenseIndex] = {
        name: expenseName,
        cost: expenseCost,
      };
      setExpensesList(updatedExpensesList);
      setTotalExpenses(
        updatedExpensesList.reduce((acc, expense) => acc + expense.cost, 0)
      );
      setIsEditing(false);
      setCurrentExpenseIndex(null);
    } else {
      const newExpense = {
        name: expenseName,
        cost: expenseCost,
      };
      setExpensesList([...expensesList, newExpense]);
      setTotalExpenses(totalExpenses + expenseCost);
    }
    setExpenseName("");
    setExpenseCost(0);
  };

  const handleEditExpense = (index) => {
    const expense = expensesList[index];
    setExpenseName(expense.name);
    setExpenseCost(expense.cost);
    setIsEditing(true);
    setCurrentExpenseIndex(index);
  };

  const handleDeleteExpense = (index, cost) => {
    const updatedExpenseList = expensesList.filter((_, i) => i !== index);
    setExpensesList(updatedExpenseList);
    setTotalExpenses(totalExpenses - cost);
  };

  return (
    <>
      <div>
        <h2 className="text-4xl font-bold underline text-center my-5">
          My Expense Tracker
        </h2>
        <div className="flex justify-evenly w-[100vw] mt-10">
          <div className="px-6 py-4 bg-slate-600 text-white rounded-2xl">
            {isEditBudget ? (
              <div className="flex justify-between">
                <label className="mr-2">Budget</label>
                <input
                  type="number"
                  value={budget}
                  onChange={handleBudgetChange}
                  className="text-black text-[14px] w-20"
                />
                <button
                  type="button"
                  className="ml-2 border border-white px-2 py-1 text-[12px]"
                  onClick={saveBudget}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex justify-between gap-4">
                <p>Budget: {budget}</p>
                <button
                  type="button"
                  className="border border-white px-2 py-1 text-[12px]"
                  onClick={() => setIsEditBudget(true)}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
          <div className="px-8 py-4 bg-yellow-600 text-white rounded-2xl">
            <p>Remaining: {remaining}</p>
          </div>
          <div className="p-4 bg-blue-500 text-white rounded-2xl">
            <p>Expenses so far: {totalExpenses}</p>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-3xl font-bold underline text-center my-5">
            Add Expense
          </h2>
          <div className="flex justify-evenly">
            <div className="flex">
              <label className="mr-2 text-lg">Name</label>
              <input
                type="text"
                className="text-black text-lg w-80 border border-black px-2 py-1 rounded-lg"
                value={expenseName}
                onChange={handleNameChange}
              />
            </div>
            <div>
              <label className="mr-2 text-lg">Cost</label>
              <input
                type="number"
                className="text-black text-lg w-80 border border-black px-2 py-1 rounded-lg"
                value={expenseCost}
                onChange={handleExpenseChange}
              />
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <button
              type="button"
              className="ml-2 border bg-blue-600 text-white px-20 py-2 text-xl"
              onClick={handleSaveExpense}
            >
              {isEditing ? "Update" : "Save"}
            </button>
          </div>
        </div>
        <div className="mt-10">
          <h3 className="text-3xl font-bold text-center underline">
            Expense List
          </h3>
          <div className="flex justify-evenly mt-5">
            <p className="text-[18px] font-bold">S.No.</p>
            <p className="text-[18px] font-bold">Name</p>
            <p className="text-[18px] font-bold">Cost</p>
            <p className="text-[18px] font-bold">Action</p>
          </div>
          {expensesList.map((item, index) => (
            <div className="flex justify-evenly mt-2" key={index}>
              <p className="text-[18px] text-center mx-5">{index + 1}</p>
              <p className="text-[18px] text-center mx-5">{item.name}</p>
              <p className="text-[18px] text-center">{item.cost}</p>
              <div className="flex gap-1">
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleDeleteExpense(index, item.cost)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleEditExpense(index)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
