import { createTheme } from '@mui/material/styles';

export const customTheme = createTheme({
  palette: {
    primary: {
      main: '#0062FF',
    },
    secondary: {
      main: '#F2F4F8',
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    button: {
      fontWeight: 500,
    },
    h1: {
      fontSize: 56,
      fontWeight: 500,
    },
    h2: {
      fontSize: 48,
      fontWeight: 500,
    },
    fontFamily: 'VTB Group UI Web,Arial,Garuda,sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
        sizeLarge: {
          fontSize: 16,
          fontWeight: 500,
          lineHeight: '24px',
          padding: '16px 32px',
          textTransform: 'capitalize',
        },
        sizeMedium: {
          fontSize: 16,
          fontWeight: 500,
          lineHeight: '24px',
          padding: '12px 20px',
          textTransform: 'capitalize',
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          required: false,
        },
      },
    },
  },
});
