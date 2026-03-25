import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Trash2, CheckCircle2 } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Tasks", icon: LayoutDashboard },
    { path: "/deleted", label: "Trash", icon: Trash2 },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <CheckCircle2 size={22} className="navbar-brand-icon" />
        <h2>Todo-List</h2>
      </div>

      <div className="navbar-links">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
          >
            <item.icon size={15} />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
