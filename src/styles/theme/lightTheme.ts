import { Theme, createTheme } from '@mui/material';

const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#fcba03',
    },
    secondary: {
      main: '#6C5F5B',
    },
  },
});

export default lightTheme;
