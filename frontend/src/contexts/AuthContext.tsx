import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        throw new Error(data.error || "Error de autenticación");
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error al iniciar sesión",
        text:
          error.message ||
          "Hubo un problema en el inicio de sesión. Verifica tus credenciales e inténtalo de nuevo.",
        confirmButtonText: "Ok",
      });
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "Tu cuenta ha sido creada. Ahora puedes iniciar sesión.",
          confirmButtonText: "Ok",
        });
        navigate("/login");
      } else {
        throw new Error(data.error || "Error en el registro");
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error al registrarse",
        text:
          error.message ||
          "Hubo un problema al crear tu cuenta. Inténtalo de nuevo.",
        confirmButtonText: "Ok",
      });
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
