import { useAuth } from "../contexts/AuthContext";

const DashboardPage = () => {
  const { logout, user } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-700">
          Bienvenido al Dashboard
        </h1>
        <p className="text-center text-gray-600">Usuario: {user?.email}</p>
        <div className="flex justify-center">
          <button
            onClick={logout}
            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
