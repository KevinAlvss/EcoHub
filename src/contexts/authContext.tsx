import { createContext, useState, ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth/AuthService";
import { toast } from "react-toastify";

type AuthContextProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  token: string | undefined;
  login: (email: string, password: string) => void;
  logOut: () => void;
  checkLogin: () => void;
};

export const AuthContext = createContext({} as AuthContextData);
const api = new AuthService();

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const navigate = useNavigate();

  const [token, setToken] = useState(window.sessionStorage.getItem("token") || "");
  
  const login = async (email: string, password: string) => {
    const responseToken = await api.login({
      email: email,
      senha: password
    })
    .catch(e => {
      toast.error("Algum erro ocorreu tente mais tarde")

      return;
    });
  
    setToken(responseToken!);

    window.sessionStorage.setItem("token", responseToken!);
  };

  const logOut = () => {
    setToken("");
    window.sessionStorage.removeItem("token");
    navigate("/login");
  };

  const checkLogin = () => {
    if (!token || token === "") {
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
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
