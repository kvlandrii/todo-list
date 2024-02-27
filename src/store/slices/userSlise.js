import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://kvlandriitodos.onrender.com/users";
// const url = "http://localhost:3001/users";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ login, password }, thunkAPI) => {
    const response = await axios.get(url, {
      params: {
        login: login,
        password: password,
      },
    });
    if (response.data.length === 0) {
      return thunkAPI.rejectWithValue("User not found");
    }
    return response.data[0];
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ login, password }, thunkAPI) => {
    const exist = await axios.get(url, {
      params: {
        login: login,
      },
    });
    if (exist.data.length) {
      return thunkAPI.rejectWithValue("User already exist");
    }
    try {
      const response = await axios.post(url, {
        id: Math.random().toString(36).substr(2, 9),
        login: login,
        password: password,
        todos: [],
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    login: null,
    password: null,
    isAuthenticated: false,
    status: null,
    error: null,
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.error = null;

        state.id = action.payload.id;
        state.login = action.payload.login;
        state.password = action.payload.password;
        state.isAuthenticated = true;

        localStorage.setItem("id", action.payload.id);
        localStorage.setItem("login", action.payload.login);
        localStorage.setItem("password", action.payload.password);
        localStorage.setItem("isAuthenticated", true);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { setId, setLogin, setPassword, setIsAuthenticated } =
  userSlice.actions;
export default userSlice.reducer;
