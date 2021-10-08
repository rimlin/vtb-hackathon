import { createContext } from 'react';

import { User } from 'types/User';

export const UserContext = createContext<User>({
  isAuthenticated: false,
  isLoaded: false,
});

export const UserSetContext = createContext<{ setValue: (userInfo: User) => void }>(
  null as any
);
