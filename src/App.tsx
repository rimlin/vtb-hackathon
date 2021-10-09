import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import { AuthProvider } from 'oidc-react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import './assets/fonts/stylesheet.css';
import './App.css';
import { PrivateRoute, PublicRoute } from 'utils/routes';
import { LoginPage } from 'pages/Login';
import { RegisterPage } from 'pages/Register';
import { UserContext, UserSetContext } from 'utils/contexts/user.context';
import { User } from 'types/User';
import { getJson } from 'utils/helpers/localStorage';
import { DatasetsPage } from 'pages/Datasets';
import { customTheme } from 'utils/customTheme';
import { AuthLayout } from 'layouts/Auth';
import { DashboardLayout } from 'layouts/Dashboard';
import { DatasetPage } from 'pages/Dataset';
import { ConnectionsPage } from 'pages/Connections';
import { QueriesPage } from 'pages/Queries';
import { QueryCreationPage } from 'pages/QueryCreation';

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

const queryClient = new QueryClient();

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
          <>
            <AuthLayout>
              <PublicRoute path="/login" exact component={LoginPage} />
              <PublicRoute path="/register" exact component={RegisterPage} />
            </AuthLayout>
            <Redirect to="/login" />
          </>
        )}

        {user.isAuthenticated === true && (
          <>
            <DashboardLayout>
              <PrivateRoute path="/" exact component={DatasetsPage} />
              <PrivateRoute path="/dataset/:id" exact component={DatasetPage} />
              <PrivateRoute path="/connections" exact component={ConnectionsPage} />
              <PrivateRoute path="/queries" exact component={QueriesPage} />
              <PrivateRoute path="/queries/create" exact component={QueryCreationPage} />
            </DashboardLayout>
            <Redirect to="/" />
          </>
        )}
      </Switch>
    );
  }, [user.isLoaded, user.isAuthenticated]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={customTheme}>
        <AuthProvider {...oidcConfig}>
          <UserSetContext.Provider value={{ setValue: setUser }}>
            <UserContext.Provider value={user}>
              <QueryClientProvider client={queryClient}>
                <StyledEngineProvider injectFirst>{content}</StyledEngineProvider>
              </QueryClientProvider>
            </UserContext.Provider>
          </UserSetContext.Provider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
