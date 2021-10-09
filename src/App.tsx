import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import { AuthProvider } from 'oidc-react';

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

const env = {
  AUTH_PROVIDER_URL: 'http://192.168.1.167:8080/auth/realms/master',
  AUTH_CLIENT_ID: 'account',
};

const oidcConfig = {
  onSignIn: async (user: any) => {
    alert('You just signed in, congratz! Check out the console!');
    console.log(user);
    window.location.hash = '';
  },
  clientId: env.AUTH_CLIENT_ID,
  authority: env.AUTH_PROVIDER_URL,
  // redirectUri: `http://192.168.1.167:3000/sign-in`,
  responseType: 'id_token token',
  scope: `openid profile email`,
  automaticSilentRenew: false,
  loadUserInfo: false,
};

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
        <AuthProvider {...oidcConfig}>
          <UserSetContext.Provider value={{ setValue: setUser }}>
            <UserContext.Provider value={user}>
              <StyledEngineProvider injectFirst>{content}</StyledEngineProvider>
            </UserContext.Provider>
          </UserSetContext.Provider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
