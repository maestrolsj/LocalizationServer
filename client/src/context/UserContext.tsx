import React from "react";
import createPersistedState from "use-persisted-state";
export const useUserState = createPersistedState("user");

type User =
  | {
      id?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      accessToken?: string;
    }
  | null
  | undefined;

interface UserContextState {
  user: User;
  setUser: (user?: User) => void;
}

export const UserContext = React.createContext<UserContextState>({
  user: {},
  setUser: () => undefined,
});

export const UserProvider: React.SFC<{}> = ({ children }) => {
  const [user, setUser] = useUserState<User>({});
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
