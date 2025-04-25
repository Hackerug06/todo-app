import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredTasks, setFilter } from '../features/tasks/tasksSlice';
import {
  Container,
  Box,
  Button,
  Tabs,
  Tab,
  Typography,
  Stack
} from '@mui/material';
import TaskItem from '../components/tasks/TaskItem';
import TaskForm from '../components/tasks/TaskForm';

const HomePage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectFilteredTasks);
  const filter = useSelector(state => state.tasks.filter);
  const [modalOpen, setModalOpen] = useState(false);

  const handleFilterChange = (event, newValue) => {
    dispatch(setFilter(newValue));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Tasks
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Tabs value={filter} onChange={handleFilterChange}>
            <Tab label="All" value="all" />
            <Tab label="Active" value="active" />
            <Tab label="Completed" value="completed" />
          </Tabs>
          
          <Button
            variant="contained"
            onClick={() => setModalOpen(true)}
          >
            Add Task
          </Button>
        </Box>
        
        <Stack spacing={2}>
          {tasks.length > 0 ? (
            tasks.map((task) => <TaskItem key={task.id} task={task} />)
          ) : (
            <Typography variant="body1" color="text.secondary">
              No tasks found. Add a new task to get started!
            </Typography>
          )}
        </Stack>
      </Box>
      
      <TaskForm open={modalOpen} onClose={() => setModalOpen(false)} />
    </Container>
  );
};

export default HomePage;
