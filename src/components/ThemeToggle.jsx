import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../app/theme';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <Tooltip title={darkMode ? 'Light mode' : 'Dark mode'}>
      <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
