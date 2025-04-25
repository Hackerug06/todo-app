import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice';
import themeReducer from './theme';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    theme: themeReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // For date objects in tasks
    }),
});
