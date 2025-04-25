import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../../features/tasks/tasksSlice';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Stack,
  Chip
} from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

const TaskForm = ({ open, onClose, task }) => {
  const dispatch = useDispatch();
  const isEdit = Boolean(task);
  
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    dueDate: task?.dueDate || null,
    dueTime: task?.dueTime || null,
    priority: task?.priority || 'medium',
  });

  const [subtasks, setSubtasks] = useState(task?.subtasks || []);
  const [newSubtask, setNewSubtask] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      ...formData,
      subtasks
    };

    if (isEdit) {
      dispatch(updateTask({ id: task.id, ...taskData }));
    } else {
      dispatch(addTask(taskData));
    }
    onClose();
  };

  const addSubtask = () => {
    if (newSubtask.trim()) {
      setSubtasks([...subtasks, { text: newSubtask, completed: false }]);
      setNewSubtask('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? 'Edit Task' : 'Add New Task'}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Task Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          
          <TextField
            margin="normal"
            fullWidth
            multiline
            rows={3}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          
          <Stack direction="row" spacing={2} sx={{ my: 2 }}>
            <DatePicker
              label="Due Date"
              value={formData.dueDate}
              onChange={(date) => setFormData({ ...formData, dueDate: date })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            
            <TimePicker
              label="Due Time"
              value={formData.dueTime}
              onChange={(time) => setFormData({ ...formData, dueTime: time })}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Stack>
          
          <TextField
            select
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {['low', 'medium', 'high'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Subtasks</Typography>
            <Stack direction="row" spacing={1} sx={{ my: 1 }}>
              <TextField
                label="Add subtask"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                fullWidth
              />
              <Button onClick={addSubtask} variant="outlined">
                Add
              </Button>
            </Stack>
            
            <Stack spacing={1}>
              {subtasks.map((subtask, index) => (
                <Chip
                  key={index}
                  label={subtask.text}
                  onDelete={() => setSubtasks(subtasks.filter((_, i) => i !== index))}
                />
              ))}
            </Stack>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {isEdit ? 'Update' : 'Add'} Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
