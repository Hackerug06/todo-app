import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../../app/theme';

const Header = () => {
  const themeMode = useSelector(state => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          To-Do App
        </Typography>
        <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
          {themeMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
