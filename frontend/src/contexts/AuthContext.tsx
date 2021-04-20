import { createContext, useState, useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { AuthContextType, LoginType } from "../@types/globals";
import { LOGIN } from "../querys/query.graphql";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }) => {
  const [login, { data, error }] = useMutation<LoginType>(LOGIN);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const alert = useAlert();
  const router = useRouter();

  useEffect(() => {
    async function loadUserFromStorage() {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (token) {
        if (user) setUser(JSON.parse(String(user)));
      }
      setLoading(false);
    }
    loadUserFromStorage();
  }, []);

  useEffect(() => {
    if (data) {
      const { token, user } = data.login;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    }
  }, [data]);

  const handleLogin = async (email: string, password: string) => {
    login({
      variables: {
        email,
        password,
      },
    })
      .then(() => router.push("/products"))
      .catch((e) => alert.error(e.message));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        loading,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
