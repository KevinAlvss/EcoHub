import { createContext, useState, ReactNode, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth/AuthService";
import { toast } from "react-toastify";

type AuthContextProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  token: string | undefined;
  userId: string | undefined;
  login: (email: string, password: string) => void;
  logOut: () => void;
  checkLogin: () => void;
};

export const AuthContext = createContext({} as AuthContextData);
const api = new AuthService();

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const navigate = useNavigate();

  const [token, setToken] = useState(window.sessionStorage.getItem("token") || "");
  const [userId, setUserId] = useState(window.sessionStorage.getItem("userId") || "");
  
  const login = async (email: string, password: string) => {
    const response = await api.login({
      email: email,
      senha: password
    })
    .catch(e => {
      toast.error("Algum erro ocorreu tente mais tarde")

      return;
    });
  
    setToken(response!.token);
    setUserId(response!.idUsuario);

    window.sessionStorage.setItem("token", response!.token);
    window.sessionStorage.setItem("userId", response!.idUsuario);
  };

  const logOut = () => {
    setToken("");
    window.sessionStorage.removeItem("token");
    navigate("/login");
  };

  const checkLogin = useCallback(() => {
    if (!token || token === "") {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        login,
        logOut,
        checkLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
