import React, { useReducer } from "react";

// Define initial state
const initialState = {
  todos: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    text: `Todo ${i + 1}`,
  })),
  currentPage: 1,
  todosPerPage: 10,
};

// Define actions
const ACTIONS = {
  NEXT_PAGE: "NEXT_PAGE",
  PREVIOUS_PAGE: "PREVIOUS_PAGE",
  GO_TO_PAGE: "GO_TO_PAGE",
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case ACTIONS.PREVIOUS_PAGE:
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };
    case ACTIONS.GO_TO_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

// Component
const TodoList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { todos, currentPage, todosPerPage } = state;

  // Calculate current todos
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  // Handle page navigation
  const handleNextPage = () => {
    if (currentPage < Math.ceil(todos.length / todosPerPage)) {
      dispatch({ type: ACTIONS.NEXT_PAGE });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch({ type: ACTIONS.PREVIOUS_PAGE });
    }
  };

  const handleGoToPage = (page) => {
    if (page > 0 && page <= Math.ceil(todos.length / todosPerPage)) {
      dispatch({ type: ACTIONS.GO_TO_PAGE, payload: page });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-xl uppercase font-semibold text-center my-3">
        React Pagination with useReducer
      </h1>
      <ul className="bg-white rounded-lg shadow-lg p-5 border">
        {currentTodos.map((todo) => (
          <li key={todo.id} className="py-2 border-b last:border-none">
            {todo.text}
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-5">
        <button
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(todos.length / todosPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={currentPage === Math.ceil(todos.length / todosPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TodoList;
