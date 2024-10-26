import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="w-full bg-blue-500 text-white shadow-lg">
      <div className="flex items-center justify-between px-8 py-4 max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold">
          <Link to="/dashboard">Dashboard</Link>
        </h1>
        <nav className="space-x-4">
          <Link to="/projects" className="hover:underline">
            Proyectos
          </Link>
          <Link to="/defects" className="hover:underline">
            Defectos
          </Link>
        </nav>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Salir
        </button>
      </div>
    </header>
  );
};

export default Header;
