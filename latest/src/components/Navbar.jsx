import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Trash2, CheckCircle2 } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Tasks", icon: LayoutDashboard },
    { path: "/deleted", label: "Trash", icon: Trash2 },
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gray-900 text-white shadow-md">
      {/* Brand */}
      <div className="flex items-center gap-2">
        <CheckCircle2 size={28} className="text-green-400" />
        <h2 className="text-xl font-bold">Todo-List</h2>
      </div>

      {/* Links */}
      <div className="flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
              location.pathname === item.path
                ? "bg-green-600 text-white"
                : "hover:bg-gray-700"
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
