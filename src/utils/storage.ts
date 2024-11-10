import { Todo } from '../types';

export const storage = {
  getTodos: (): Todo[] => {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
  },

  setTodos: (todos: Todo[]): void => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
};