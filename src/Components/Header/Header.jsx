import NavLink from "./NavLink";
import NavLinkMobile from "./NavLinkMobile";
import { Link, } from "react-router-dom";


const Header = ({ activePage, setActivePage, theme, toggleTheme, isMobileMenuOpen, toggleMobileMenu, setShowSearchModal }) => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 md:px-12 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" onClick={() => setActivePage('home')} className="text-2xl font-bold text-primary-blue font-poppins">inkWell</Link>
        <nav className="hidden md:flex space-x-8">
          <NavLink label="Home" page="/" activePage={activePage} setActivePage={setActivePage} />
          <NavLink label="Explore" page="/explore" activePage={activePage} setActivePage={setActivePage} />
          <NavLink label="Write" page="/write" activePage={activePage} setActivePage={setActivePage} />
        </nav>
        <div className="flex items-center space-x-4">
          <button onClick={() => setShowSearchModal(true)} className="text-medium-grey hover:text-primary-blue transition-colors duration-200">
            <i className="fas fa-search text-lg"></i>
          </button>
          <button onClick={toggleTheme} className="text-medium-grey hover:text-primary-blue transition-colors duration-200 p-2 rounded-full hover:bg-light-blue">
            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
          </button>
          {/* Add a visible Sign In/Sign Up button for desktop */}
          <div className="hidden md:block">
            <Link href="#" className="py-2 px-4 rounded-full font-semibold text-primary-blue border border-primary-blue hover:bg-primary-blue hover:text-white transition-colors duration-200">Sign In / Sign Up</Link>
          </div>
          <div className="relative group">
            <Link href="#" className="p-2 rounded-full bg-light-blue text-primary-blue hover:bg-primary-blue hover:text-white transition-colors duration-200">
              <i className="fas fa-user-circle text-lg"></i>
            </Link>
          </div>
          <button onClick={toggleMobileMenu} className="md:hidden text-medium-grey hover:text-primary-blue transition-colors duration-200">
            <i className="fas fa-bars text-lg"></i>
          </button>
        </div>
      </div>
      <nav className={`md:hidden bg-white mt-4 py-2 border-t border-gray-200 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <NavLinkMobile label="Home" page="home" activePage={activePage} setActivePage={setActivePage} />
        <NavLinkMobile label="Explore" page="explore" activePage={activePage} setActivePage={setActivePage} />
        <NavLinkMobile label="Write" page="write" activePage={activePage} setActivePage={setActivePage} />
        <Link href="#" className="block px-6 py-2 text-dark-grey hover:bg-light-grey">Sign In / Sign Up</Link>
      </nav>
    </header>
  );
};
export default Header