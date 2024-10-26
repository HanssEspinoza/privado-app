import "./App.css";
import { useAuth, AuthProvider } from "./contexts/AuthContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";
import ProjectListPage from "./pages/ProjectListPage";
import TestPlanListPage from "./pages/TestPlanListPage";
import TestCaseListPage from "./pages/TestCaseListPage";
import DefectListPage from "./pages/DefectListPage";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <ProjectListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/:projectId/test-plans"
            element={<TestPlanListPage />}
          />
          <Route
            path="/test-plans/:testPlanId/test-cases"
            element={<TestCaseListPage />}
          />
          <Route
            path="/test-cases/:testCaseId/defects"
            element={<DefectListPage />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
