import { createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  status: 'idle',
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    taskAdded: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    taskDeleted: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    taskUpdated: (state, action) => {
      const { id, ...updatedFields } = action.payload;
      const existingTask = state.tasks.find(task => task.id === id);
      if (existingTask) {
        Object.assign(existingTask, updatedFields);
      }
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    subtaskAdded: (state, action) => {
      const { taskId, subtask } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task) {
        if (!task.subtasks) task.subtasks = [];
        task.subtasks.push(subtask);
      }
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    subtaskToggled: (state, action) => {
      const { taskId, subtaskId } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task && task.subtasks) {
        const subtask = task.subtasks.find(s => s.id === subtaskId);
        if (subtask) {
          subtask.completed = !subtask.completed;
        }
      }
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
  },
});

export const { 
  taskAdded, 
  taskDeleted, 
  taskUpdated, 
  subtaskAdded,
  subtaskToggled
} = tasksSlice.actions;

export default tasksSlice.reducer;

export const selectAllTasks = state => state.tasks.tasks;
