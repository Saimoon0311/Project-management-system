import { createStore, combineReducers } from "redux";
// ↑ removed applyMiddleware and thunk import

import authReducer from "./authSlice";
import projectsReducer from "./projectsSlice";
import tasksReducer from "./tasksSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
});

const store = createStore(rootReducer);
// ↑ removed applyMiddleware(thunk)

export default store;
