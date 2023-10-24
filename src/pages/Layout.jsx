import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTheme } from "../contexts/ThemeContext";

const Layout = () => {
  const { theme } = useTheme();
  return (
    <div className={`h-full min-h-full ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
      <Navbar />
      <main className="px-4 sm:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;