import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";
import editReducer from "./slices/editSlice";
import userReducer from "./slices/userSlise";

const rootReducer = combineReducers({
  todos: todoReducer,
  edit: editReducer,
  user: userReducer,
});

export default rootReducer;
