import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://kvlandriitodos.onrender.com/users/";
// const url = "http://localhost:3001/users/";

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().user.id;
    const response = await axios.get(url + userId);
    return response.data.todos;
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (todo, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().user.id;
      const todos = thunkAPI.getState().todos.todos;
      const updatedTodos = [...todos, todo];
      await axios.patch(url + userId, {
        todos: updatedTodos,
      });
      return updatedTodos;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (index, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().user.id;
      const todos = thunkAPI.getState().todos.todos;
      const updatedTodos = todos.filter((_, i) => {
        return i !== index;
      });
      await axios.patch(url + userId, {
        todos: updatedTodos,
      });
      return updatedTodos;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const toggleCompleted = createAsyncThunk(
  "todos/toggleCompleted",
  async ({ id, checked }, thunkAPI) => {
    try {
      const userId = thunkAPI.getState().user.id;
      const todos = thunkAPI.getState().todos.todos;
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            checked: !checked,
          };
        }
        return todo;
      });
      await axios.patch(url + userId, {
        todos: updatedTodos,
      });
      return updatedTodos;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    addedTodos: 0,
    status: null,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = "success";
        state.todos = action.payload;
        state.error = null;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(addTodo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = "success";
        state.todos.push(action.payload);
        state.addedTodos = state.addedTodos + 1;
        state.error = null;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = "success";
        state.todos = action.payload;
        state.error = null;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(toggleCompleted.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(toggleCompleted.fulfilled, (state, action) => {
        state.status = "success";
        state.todos = action.payload;
        state.error = null;
      })
      .addCase(toggleCompleted.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default todoSlice.reducer;
