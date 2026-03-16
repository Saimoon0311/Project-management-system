const initialState = { tasks: [], loading: false };

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload };
    case "TOGGLE_TASK_OPTIMISTIC":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t,
        ),
      };
    case "TOGGLE_TASK_SUCCESS":
      return { ...state, tasks: action.payload };
    case "TOGGLE_TASK_FAIL":
      return { ...state, tasks: action.payload }; // revert
    default:
      return state;
  }
};

export default tasksReducer;
