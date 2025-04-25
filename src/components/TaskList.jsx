import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { taskDeleted, taskUpdated, subtaskToggled } from '../features/tasks/tasksSlice';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, Typography, Box, Paper, Tabs, Tab, Chip } from '@mui/material';
import { Delete, Edit, Notifications } from '@mui/icons-material';
import TaskForm from './TaskForm';
import { format } from 'date-fns';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);
  const [editingTask, setEditingTask] = useState(null);
  const [tabValue, setTabValue] = useState('all');

  const filteredTasks = tasks.filter(task => {
    if (tabValue === 'all') return true;
    if (tabValue === 'completed') return task.status === 'completed';
    if (tabValue === 'in-progress') return task.status === 'in-progress';
    if (tabValue === 'pending') return task.status === 'pending';
    return true;
  });

  const handleStatusChange = (taskId, newStatus) => {
    dispatch(taskUpdated({ id: taskId, status: newStatus }));
  };

  const handleSubtaskToggle = (taskId, subtaskId) => {
    dispatch(subtaskToggled({ taskId, subtaskId }));
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
        <Tab label="All" value="all" />
        <Tab label="Pending" value="pending" />
        <Tab label="In Progress" value="in-progress" />
        <Tab label="Completed" value="completed" />
      </Tabs>
      {editingTask ? (
        <TaskForm task={editingTask} onCancel={() => setEditingTask(null)} />
      ) : (
        <List>
          {filteredTasks.map((task) => (
            <ListItem key={task.id} divider>
              <Checkbox
                edge="start"
                checked={task.status === 'completed'}
                onChange={(e) => 
                  handleStatusChange(task.id, e.target.checked ? 'completed' : 'pending')
                }
              />
              <ListItemText
                primary={task.title}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {task.description}
                    </Typography>
                    <br />
                    {task.dueDate && (
                      <Typography component="span" variant="body2" color="text.secondary">
                        Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                        {task.dueTime && ` at ${format(new Date(task.dueTime), 'hh:mm a')}`}
                      </Typography>
                    )}
                    {task.subtasks && task.subtasks.length > 0 && (
                      <Box sx={{ mt: 1 }}>
                        {task.subtasks.map((subtask) => (
                          <Box key={subtask.id} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Checkbox
                              size="small"
                              checked={subtask.completed}
                              onChange={() => handleSubtaskToggle(task.id, subtask.id)}
                            />
                            <Typography
                              variant="body2"
                              sx={{ textDecoration: subtask.completed ? 'line-through' : 'none' }}
                            >
                              {subtask.text}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </>
                }
              />
              <ListItemSecondaryAction>
                <Chip
                  label={task.status}
                  color={
                    task.status === 'completed' ? 'success' :
                    task.status === 'in-progress' ? 'warning' : 'default'
                  }
                  size="small"
                  sx={{ mr: 1 }}
                />
                <IconButton edge="end" onClick={() => setEditingTask(task)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" onClick={() => dispatch(taskDeleted(task.id))}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default TaskList;
