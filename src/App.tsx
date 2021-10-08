import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import './App.css';
import { Header } from 'components/Header';
import { PrivateRoute, PublicRoute } from 'utils/routes';
import { LoginPage } from 'pages/Login';
import { RegisterPage } from 'pages/Register';
import { UserContext, UserSetContext } from 'utils/contexts/user.context';
import { User } from 'types/User';
import { Footer } from 'components/Footer';
import { getJson } from 'utils/helpers/localStorage';
import { HomePage } from 'pages/Home';
import { customTheme } from 'utils/customTheme';

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
            <PublicRoute path="/" exact component={LoginPage} />
            <PublicRoute path="/register" exact component={RegisterPage} />
          </>
        )}
        <PrivateRoute path="/channels" exact component={HomePage} />
        {user.isAuthenticated ? <Redirect to="/channels" /> : <Redirect to="/" />}
      </Switch>
    );
  }, [user.isLoaded, user.isAuthenticated]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={customTheme}>
        <UserSetContext.Provider value={{ setValue: setUser }}>
          <UserContext.Provider value={user}>
            <Header />
            <main className="main">{content}</main>
            <Footer />
          </UserContext.Provider>
        </UserSetContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
