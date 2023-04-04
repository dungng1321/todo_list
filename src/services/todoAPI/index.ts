import instance from '../../services/instance';
import {ITodo } from '../../types/interfaces';

export const getAllTodos = () => {
  return instance.get<ITodo[]>('/todos');
};

export const addNewTodo = (data: ITodo) => {
  return instance.post<ITodo>('/todos', data);
};

export const updateTodo = ( data: ITodo) => {
  return instance.put<ITodo>(`/todos/${data.id}`, data);
};

export const toggleTodoCompleted = (data: ITodo) => {
  return instance.put<ITodo>(`/todos/${data.id}`,data);
};

export const deleteTodoItem = (id: number) => {
  return instance.delete<ITodo>(`/todos/${id}`);
};

export const clearAllTodosList = async () => {
  const response = await instance.get<ITodo[]>('/todos');
  const todos = response.data;
  for(let i = 0; i < todos.length; i++) {
    await instance.delete(`/todos/${todos[i].id}`);
  }
};
