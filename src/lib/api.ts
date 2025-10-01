import type { Todo, CreateTodoData, UpdateTodoData } from "./types";

// Mock data
let todos: Todo[] = [
  {
    id: 1,
    title: "Learn TanStack Router",
    description: "Complete the tutorial and understand all core concepts",
    completed: false,
    createdAt: "2024-01-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Build a React app",
    description: "Create a new React application with modern routing",
    completed: true,
    createdAt: "2024-01-02T14:30:00Z",
  },
  {
    id: 3,
    title: "Deploy to production",
    description: "Deploy the finished app to Vercel or Netlify",
    completed: false,
    createdAt: "2024-01-03T09:15:00Z",
  },
];

let nextId = 4;

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // Fetch all todos
  async getTodos(): Promise<Todo[]> {
    await delay(300);
    return [...todos];
  },

  // Fetch a single todo
  async getTodo(id: number): Promise<Todo | null> {
    await delay(200);
    return todos.find((todo) => todo.id === id) || null;
  },

  // Create a new todo
  async createTodo(data: CreateTodoData): Promise<Todo> {
    await delay(400);
    const newTodo: Todo = {
      id: nextId++,
      title: data.title,
      description: data.description,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    todos.push(newTodo);
    return newTodo;
  },

  // Update a todo
  async updateTodo(id: number, data: UpdateTodoData): Promise<Todo | null> {
    await delay(300);
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return null;

    todos[index] = { ...todos[index], ...data };
    return todos[index];
  },

  // Delete a todo
  async deleteTodo(id: number): Promise<boolean> {
    await delay(250);
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return false;

    todos.splice(index, 1);
    return true;
  },
};
