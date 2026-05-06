import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import SharableDashboard from "./components/ui/SharableDashboard";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./pages/Auth/ProtectedRoute";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/share/:shareLink" element={<SharableDashboard />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
