import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  getAllTodos,
  addNewTodo,
  updateTodo,
  toggleTodoCompleted,
  deleteTodoItem,
  clearAllTodosList,
} from "../services/todoAPI";

import { ITodosState, ITodo } from '../types/interfaces';

const initialState: ITodosState = {
  todos: [],
  selectedOption: "all",
  todoID: null,
};

export const fetchTodos = createAsyncThunk<ITodo[]>(
  "todos/fetchTodos",
  async () => {
    const response = await getAllTodos();
    return response.data;
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (data: ITodo) => {
    const response = await addNewTodo(data);
    return response.data;
  }
);



export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async (data: ITodo) => {
    const response = await updateTodo(data);
    return response.data;
  }
);

export const toggleCompletedTodo = createAsyncThunk(
  "todos/toggleCompletedTodo",
  async (data: ITodo) => {
    const response = await toggleTodoCompleted(data);
    return response.data;
  }
);

// delete by ID
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number) => {
    await deleteTodoItem(id);
    return id;
  }
);

export const clearAllTodos = createAsyncThunk(
  "todos/clearAllTodos",
  async () => {
    await clearAllTodosList();
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setSelectedOption(state, action: PayloadAction<string>) {
      state.selectedOption = action.payload;
    },
    setTodoID(state, action: PayloadAction<number | null>) {
      state.todoID = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // get all todos
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      
      // add new todo
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos =[action.payload, ...state.todos]
      })

      // edit todo
      .addCase(editTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) => (todo.id === action.payload.id ? action.payload : todo));
      })

      // toggle todo completed
      .addCase(toggleCompletedTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) => (todo.id === action.payload.id ? action.payload : todo));
      })

      // delete todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })

      // clear all todos
      .addCase(clearAllTodos.fulfilled, (state) => {
        state.todos = [];
      });
  },
});

export const { actions, reducer } = todoSlice;
export const { setSelectedOption, setTodoID } = actions;
export default reducer;
