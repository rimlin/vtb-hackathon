export interface UserInfo {
  login: string;
}

export interface User {
  isAuthenticated: boolean;
  isLoaded: boolean;
  info?: UserInfo;
}
