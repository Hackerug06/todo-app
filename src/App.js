
import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ThemeToggle from './components/ThemeToggle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // light mode palette
          primary: { main: '#1976d2' },
          secondary: { main: '#9c27b0' },
          background: { default: '#f5f5f5', paper: '#ffffff' },
        }
      : {
          // dark mode palette
          primary: { main: '#90caf9' },
          secondary: { main: '#ce93d8' },
          background: { default: '#121212', paper: '#1e1e1e' },
        }),
  },
});

function App() {
  const darkMode = useSelector(state => state.theme.darkMode);
  const theme = React.useMemo(() => createTheme(getDesignTokens(darkMode ? 'dark' : 'light')), [darkMode]);
  const [showForm, setShowForm] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            To-Do App
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {showForm ? (
          <TaskForm onCancel={() => setShowForm(false)} />
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button 
                variant="contained" 
                onClick={() => setShowForm(true)}
                startIcon={<Add />}
              >
                Add Task
              </Button>
            </Box>
            <TaskList />
          </>
        )}
      </Container>
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  );
}

export default App;
