import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', 
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

// Auth
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);

// Todos
export const getTodos = () => API.get('/todo');
export const createTodo = (newTodo) => API.post('/todo', newTodo);
export const updateTodo = (id, updatedTodo) => API.put(`/todo/${id}`, updatedTodo);
export const deleteTodo = (id) => API.delete(`/todo/${id}`);