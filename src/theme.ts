import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1025,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.125rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '0.875rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '0.75rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '0.875rem',
      color: '#333',
      lineHeight: 1.8,
    },
    body2: {
      fontSize: '1rem',
      color: '#333',
      lineHeight: 1.8,
    },
  },
  palette: {
    text: {
      primary: '#6576FF',
      secondary: '#2C3782',
    },
    primary: {
      main: '#6576FF',
      dark: '#359352',
      light: '#68c47e'

    },
    secondary: {
      main: '#f1bc1a',
    },
    success: {
      main: '#2EC2A0',
    },
    error: {
      main: '#F57171',
    },
  },
})
