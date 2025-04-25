import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  filter: 'all', // 'all', 'active', 'completed'
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      },
      prepare({ title, description, dueDate, dueTime, priority }) {
        return {
          payload: {
            id: nanoid(),
            title,
            description,
            dueDate,
            dueTime,
            priority,
            status: 'pending',
            subtasks: [],
            createdAt: new Date().toISOString(),
          },
        };
      },
    },
    updateTask(state, action) {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    toggleTaskStatus(state, action) {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.status = task.status === 'completed' ? 'pending' : 'completed';
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    addSubtask(state, action) {
      const { taskId, text } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        task.subtasks.push({
          id: nanoid(),
          text,
          completed: false
        });
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    toggleSubtask(state, action) {
      const { taskId, subtaskId } = action.payload;
      const task = state.tasks.find(task => task.id === taskId);
      if (task) {
        const subtask = task.subtasks.find(sub => sub.id === subtaskId);
        if (subtask) {
          subtask.completed = !subtask.completed;
          localStorage.setItem('tasks', JSON.stringify(state.tasks));
        }
      }
    },
    setFilter(state, action) {
      state.filter = action.payload;
    }
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
  addSubtask,
  toggleSubtask,
  setFilter
} = tasksSlice.actions;

export const selectAllTasks = (state) => state.tasks.tasks;
export const selectFilteredTasks = (state) => {
  const { tasks, filter } = state.tasks;
  switch (filter) {
    case 'active':
      return tasks.filter(task => task.status !== 'completed');
    case 'completed':
      return tasks.filter(task => task.status === 'completed');
    default:
      return tasks;
  }
};

export default tasksSlice.reducer;
