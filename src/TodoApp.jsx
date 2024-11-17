import { useState } from "react";

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [inputText, setInputText] = useState("");
    const [inputDate, setInputDate] = useState("");
    const [editingId, setEditingId] = useState(null);

    function handleAddOrUpdateClick() {
        if (!inputText || !inputDate) {
            alert("Enter all entries below!");
            return;
        }

        if (editingId) {
            setTodos(todos.map(todo =>
                todo.id === editingId ? { ...todo, text: inputText, date: inputDate } : todo
            ));
            setEditingId(null);
        } else {
            const newTodo = {
                id: Date.now(),
                text: inputText,
                date: inputDate,
            };
            setTodos([...todos, newTodo]);
        }

        setInputText("");
        setInputDate("");
    }

    function handleEditClick(todo) {
        setInputText(todo.text);
        setInputDate(todo.date);
        setEditingId(todo.id);
    }

    function handleDeleteClick(id) {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    return (
        <div className="w-full max-w-[48rem] mx-auto flex flex-col gap-8 p-4 bg-gray-800 rounded-xl">
            <h1 className="font-bold text-3xl text-white text-center">Todo App</h1>
            <div className="w-full flex flex-col sm:flex-row items-center gap-4 sm:gap-2 mb-8 sm:justify-between">
                <input
                    className="w-full sm:w-1/2 rounded-lg p-2"
                    type="text"
                    placeholder="Add Item Here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <input
                    className="w-full sm:w-1/4 rounded-lg p-2"
                    type="date"
                    value={inputDate}
                    onChange={(e) => setInputDate(e.target.value)}
                />
                <button
                    className="w-full sm:w-auto py-2 px-4 bg-green-800 text-white rounded-lg hover:bg-green-500"
                    onClick={handleAddOrUpdateClick}
                >
                    {editingId ? "Update" : "Add"}
                </button>
            </div>

            <ul className="w-full space-y-2">
                {todos.map((todo, index) => (
                    <li key={todo.id} className="flex flex-col sm:flex-row justify-between items-center bg-gray-700 p-3 rounded-lg text-white">
                        <div className="flex flex-col sm:flex-row items-center gap-2">
                            <p className="text-xl font-semibold">{index + 1}.</p>
                            <p className="text-xl font-semibold">{todo.text}</p>
                        </div>
                        <p className="text-lg">{todo.date}</p>
                        <div className="flex gap-2 mt-2 sm:mt-0">
                            <button
                                className="py-1 px-3 bg-blue-800 rounded-lg hover:bg-blue-500"
                                onClick={() => handleEditClick(todo)}
                            >
                                Edit
                            </button>
                            <button
                                className="py-1 px-3 bg-red-800 rounded-lg hover:bg-red-500"
                                onClick={() => handleDeleteClick(todo.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
