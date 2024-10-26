import { useAuth } from "../contexts/AuthContext";

const DashboardPage = () => {
  const { logout, user } = useAuth();

  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      <p>Usuario: {user?.email}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};

export default DashboardPage;
