import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteTask,
  toggleTaskStatus,
  toggleSubtask
} from '../../features/tasks/tasksSlice';
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
  Collapse,
  Chip,
  Stack,
  Box
} from '@mui/material';
import {
  Delete,
  Edit,
  ExpandMore,
  ExpandLess,
  Notifications
} from '@mui/icons-material';
import TaskForm from './TaskForm';
import { format } from 'date-fns';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleToggleStatus = () => {
    dispatch(toggleTaskStatus(task.id));
  };

  const handleToggleSubtask = (subtaskId) => {
    dispatch(toggleSubtask({ taskId: task.id, subtaskId }));
  };

  const priorityColors = {
    high: 'error',
    medium: 'warning',
    low: 'success'
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            checked={task.status === 'completed'}
            onChange={handleToggleStatus}
          />
          
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{
                textDecoration: task.status === 'completed' ? 'line-through' : 'none'
              }}
            >
              {task.title}
            </Typography>
            
            {task.dueDate && (
              <Typography variant="body2" color="text.secondary">
                Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                {task.dueTime && ` at ${format(new Date(task.dueTime), 'hh:mm a')}`}
              </Typography>
            )}
          </Box>
          
          <Chip
            label={task.priority}
            color={priorityColors[task.priority]}
            size="small"
            sx={{ mr: 1 }}
          />
          
          <IconButton onClick={() => setExpanded(!expanded)}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
        
        <Collapse in={expanded}>
          <Box sx={{ mt: 2, pl: 6 }}>
            {task.description && (
              <Typography paragraph>{task.description}</Typography>
            )}
            
            {task.subtasks?.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Subtasks:</Typography>
                <Stack spacing={1}>
                  {task.subtasks.map((subtask) => (
                    <Box key={subtask.id} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Checkbox
                        size="small"
                        checked={subtask.completed}
                        onChange={() => handleToggleSubtask(subtask.id)}
                      />
                      <Typography
                        sx={{
                          textDecoration: subtask.completed ? 'line-through' : 'none',
                          opacity: subtask.completed ? 0.7 : 1
                        }}
                      >
                        {subtask.text}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={() => setEditModalOpen(true)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => dispatch(deleteTask(task.id))}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        </Collapse>
      </CardContent>
      
      <TaskForm
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        task={task}
      />
    </Card>
  );
};

export default TaskItem;
