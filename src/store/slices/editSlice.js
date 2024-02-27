import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://kvlandriitodos.onrender.com/users";
// const url = "http://localhost:3001/users";

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async ({ id, title, description, checked }, thunkAPI) => {
    try {
      const todos = thunkAPI.getState().todos.todos;
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: title,
            description: description,
            checked: checked,
          };
        }
        return todo;
      });
      await axios.patch(url + "/qr4d52858", {
        todos: updatedTodos,
      });
      return updatedTodos;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const editSlice = createSlice({
  name: "edit",
  initialState: {
    todo: [],
    status: null,
    error: null,
  },
  reducers: {
    setTodo: (state, action) => {
      state.todo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editTodo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.status = "success";
        state.todo = action.payload;
        state.error = null;
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { setTodo } = editSlice.actions;
export default editSlice.reducer;
