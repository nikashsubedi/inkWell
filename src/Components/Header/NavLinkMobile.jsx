import { Link } from "react-router-dom";

const NavLinkMobile = ({ label, page, activePage, setActivePage }) => {
  return (
    <Link
      to="/"
      onClick={() => setActivePage(page)}
      className={`block px-6 py-2 font-semibold transition-colors duration-200 ${activePage === page ? 'bg-light-grey text-dark-grey' : 'text-dark-grey hover:bg-light-grey'}`}
    >
      {label}
    </Link>
  );
};

export default NavLinkMobile;