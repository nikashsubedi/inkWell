import { Link } from "react-router-dom";
import { NavLink as RouterNavLink } from "react-router-dom";

export default function NavLink ({ label, page, activePage, setActivePage })  {
  const isActive = activePage === page;
  return (
    <RouterNavLink
      to={page} 
      onClick={() => setActivePage(page)}
      className={`font-semibold transition-colors duration-200 ${isActive ? 'text-primary-blue border-b-2 border-primary-blue' : 'text-medium-grey hover:text-primary-blue'}`}
    >
      {label}
    </RouterNavLink>
  );
};
