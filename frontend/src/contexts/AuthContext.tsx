import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    role: string,
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    Cookies.get("token") || null,
  );
  const [user, setUser] = useState<any>(() => {
    const userCookie = Cookies.get("user");
    return userCookie ? JSON.parse(userCookie) : null;
  });
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

        // Guardar el token y los datos del usuario en cookies
        Cookies.set("token", data.token, { expires: 1 }); // Expira en 1 día
        Cookies.set("user", JSON.stringify(data.user), { expires: 1 });

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

  const register = async (
    email: string,
    password: string,
    name: string,
    role: string,
  ) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, role }), // Añadimos `role` aquí
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

    // Eliminar el token y los datos del usuario de las cookies
    Cookies.remove("token");
    Cookies.remove("user");

    navigate("/login");
  };

  const isAuthenticated = !!token;

  useEffect(() => {
    // Cargar el token y los datos de usuario desde las cookies si están disponibles
    const storedToken = Cookies.get("token");
    const storedUser = Cookies.get("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
