import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import setupTaskNotifications from './services/notificationService';

const App = () => {
  const themeMode = useSelector(state => state.theme.mode);
  const tasks = useSelector(state => state.tasks.tasks);

  const theme = createTheme({
    palette: {
      mode: themeMode,
      ...(themeMode === 'light'
        ? {
            // Light theme colors
            primary: { main: '#1976d2' },
            secondary: { main: '#9c27b0' },
            background: { default: '#f5f5f5', paper: '#ffffff' },
          }
        : {
            // Dark theme colors
            primary: { main: '#90caf9' },
            secondary: { main: '#ce93d8' },
            background: { default: '#121212', paper: '#1e1e1e' },
          }),
    },
  });

  useEffect(() => {
    setupTaskNotifications(tasks);
    return () => {
      if (window.taskNotificationIntervals) {
        window.taskNotificationIntervals.forEach(clearInterval);
      }
    };
  }, [tasks]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
