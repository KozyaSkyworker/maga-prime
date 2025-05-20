import { createContext, useContext, useMemo, useState } from "react";
import { TUser } from "../shared/types";

interface AuthContextProps {
  user?: TUser;
  setUser?: (value: TUser) => void;
}

const AuthContext = createContext<AuthContextProps>({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUser | undefined>();

  const authProviderValue = useMemo(() => ({ user, setUser }), [user]);

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { user, setUser: setUserContext } = useContext(AuthContext);

  const setUser = (value: TUser) => {
    setUserContext?.({ ...value });
  };

  return { user, setUser };
};
