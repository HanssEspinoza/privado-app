import Header from "../components/Header";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Bienvenido al Dashboard</h1>
        <p>
          Explora los proyectos y gestiona planes de prueba, casos de prueba y
          defectos.
        </p>
      </main>
    </div>
  );
};

export default DashboardPage;
