
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import modalReducer from './modalSlice';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
    reducer: {
        todos: todoReducer,
        modal: modalReducer,
    },
});

export default store;
