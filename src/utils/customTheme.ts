import { createTheme } from '@mui/material/styles';

export const customTheme = createTheme({
  palette: {
    primary: {
      main: '#0062FF',
    },
    secondary: {
      main: '#F2F4F8',
    }
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
      fontSize: 32,
      fontWeight: 500,
    },
    fontFamily: 'VTB Group UI Web,Arial,Garuda,sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          borderRadius: 8,
        },
        sizeLarge: {
          fontSize: 16,
          fontWeight: 500,
          lineHeight: '24px',
          padding: '16px 32px',
          textTransform: 'initial',
        },
        sizeMedium: {
          fontSize: 16,
          fontWeight: 500,
          lineHeight: '24px',
          padding: '12px 20px',
          textTransform: 'initial',
        },
        sizeSmall: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '16px',
          padding: '12px 20px',
          textTransform: 'initial',
        },
        outlinedSecondary: {
          color: '#333333',
          borderColor: '#DBDEEB',
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
      defaultProps: {
        InputLabelProps: {
          required: false,
        },
      },
    },
  },
});
