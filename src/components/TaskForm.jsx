import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { taskAdded, taskUpdated } from '../features/tasks/tasksSlice';
import { TextField, Button, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { Add, Close } from '@mui/icons-material';
import { format } from 'date-fns';

const TaskForm = ({ task, onCancel }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || null);
  const [dueTime, setDueTime] = useState(task?.dueTime || null);
  const [status, setStatus] = useState(task?.status || 'pending');
  const [subtasks, setSubtasks] = useState(task?.subtasks || []);
  const [newSubtask, setNewSubtask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      id: task?.id || Date.now().toString(),
      title,
      description,
      dueDate,
      dueTime,
      status,
      subtasks,
      createdAt: task?.createdAt || new Date().toISOString(),
    };

    if (task) {
      dispatch(taskUpdated(taskData));
    } else {
      dispatch(taskAdded(taskData));
    }
    onCancel();
  };

  const addSubtask = () => {
    if (newSubtask.trim()) {
      setSubtasks([
        ...subtasks,
        { id: Date.now().toString(), text: newSubtask, completed: false },
      ]);
      setNewSubtask('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={3}
        margin="normal"
      />
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <DatePicker
          label="Due Date"
          value={dueDate}
          onChange={(newValue) => setDueDate(newValue)}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
        <TimePicker
          label="Due Time"
          value={dueTime}
          onChange={(newValue) => setDueTime(newValue)}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      </Box>
      <TextField
        select
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        fullWidth
        margin="normal"
        SelectProps={{ native: true }}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </TextField>
      <Typography variant="h6" sx={{ mt: 2 }}>Subtasks</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
        <TextField
          label="Add subtask"
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={addSubtask}>
                  <Add />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box sx={{ mt: 1 }}>
        {subtasks.map((subtask) => (
          <Box key={subtask.id} sx={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={subtask.completed}
              onChange={() => {}}
            />
            <Typography sx={{ ml: 1 }}>{subtask.text}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          {task ? 'Update' : 'Add'} Task
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
