import { useState, useEffect } from "react";
import { Button } from "./Buttons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setIsLoggedIn(!!storedToken);
  }, []);

  const handleLogin = () => navigate("/signin");
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="w-full flex justify-center">
      <nav className="bg-white border border-gray-200 rounded-full px-6 py-3 shadow-lg fixed top-6 z-50 max-w-screen-xl mx-auto w-[95%]">
        <div className="flex justify-between items-center">
          {/* Logo Section - Larger and more prominent */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-full"></div>
              </div>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-black to-gray-700 bg-clip-text text-transparent">
              VaultIQ
            </h1>
          </div>

          {/* Right Side - Larger buttons and better spacing */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <Button
                size="lg"
                variant="primary"
                text="Login"
                onClick={handleLogin}
              />
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-black text-base font-medium">Welcome back!</span>
                <Button
                  size="lg"
                  variant="secondary"
                  text="Logout"
                  onClick={handleLogout}
                />
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;