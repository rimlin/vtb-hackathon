import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { UserContext } from 'utils/contexts/user.context';

export const PrivateRoute = ({ component: Component, ...rest }: RouteProps) => {
  const { isAuthenticated } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          Component && <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/register',
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
};
