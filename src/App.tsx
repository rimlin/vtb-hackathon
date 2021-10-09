import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';

import './assets/fonts/stylesheet.css';
import './App.css';
import { PrivateRoute, PublicRoute } from 'utils/routes';
import { LoginPage } from 'pages/Login';
import { RegisterPage } from 'pages/Register';
import { UserContext, UserSetContext } from 'utils/contexts/user.context';
import { User } from 'types/User';
import { getJson } from 'utils/helpers/localStorage';
import { HomePage } from 'pages/Home';
import { customTheme } from 'utils/customTheme';
import { AuthLayout } from 'layouts/Auth';
import { DashboardLayout } from 'layouts/Dashboard';

function App() {
  const [user, setUser] = useState<User>({
    isAuthenticated: false,
    isLoaded: false,
  });

  useEffect(() => {
    const token = getJson('token')?.value;

    if (token) {
      setUser({
        isAuthenticated: true,
        isLoaded: true,
      });
    } else {
      setUser({
        isAuthenticated: false,
        isLoaded: true,
      });
    }
  }, []);

  const content = useMemo(() => {
    if (!user.isLoaded) {
      return null;
    }

    return (
      <Switch>
        {user.isAuthenticated === false && (
          <AuthLayout>
            <PublicRoute path="/" exact component={LoginPage} />
            <PublicRoute path="/register" exact component={RegisterPage} />
          </AuthLayout>
        )}

        {user.isAuthenticated === true && (
          <DashboardLayout>
            <PrivateRoute path="/home" exact component={HomePage} />
          </DashboardLayout>
        )}
        {user.isAuthenticated ? <Redirect to="/home" /> : <Redirect to="/" />}
      </Switch>
    );
  }, [user.isLoaded, user.isAuthenticated]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={customTheme}>
        <UserSetContext.Provider value={{ setValue: setUser }}>
          <UserContext.Provider value={user}>
            <StyledEngineProvider injectFirst>{content}</StyledEngineProvider>
          </UserContext.Provider>
        </UserSetContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
