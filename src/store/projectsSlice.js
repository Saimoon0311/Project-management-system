const initialState = {
  projects: [],
  loading: false,
  error: null,
};

// Load saved projects from localStorage when app starts
const savedProjects = localStorage.getItem("projects");
const initialProjects = savedProjects ? JSON.parse(savedProjects) : [];

const projectsReducer = (
  state = { ...initialState, projects: initialProjects },
  action,
) => {
  let newState = state;

  switch (action.type) {
    case "FETCH_PROJECTS_START":
      return { ...state, loading: true };
    case "FETCH_PROJECTS_SUCCESS":
      newState = { ...state, projects: action.payload, loading: false };
      break;
    case "FETCH_PROJECTS_FAIL":
      return { ...state, error: action.payload, loading: false };
    case "ADD_PROJECT":
      newState = { ...state, projects: [...state.projects, action.payload] };
      break;
    case "UPDATE_PROJECT":
      newState = {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.id ? action.payload : p,
        ),
      };
      break;
    default:
      return state;
  }

  // Save to localStorage after every change (this fixes disappearing)
  localStorage.setItem("projects", JSON.stringify(newState.projects));
  return newState;
};

export default projectsReducer;
