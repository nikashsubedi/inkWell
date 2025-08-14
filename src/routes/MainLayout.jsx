import React,{useState,useEffect} from 'react';
import Header from "../Components/Header/Header";
import Footer from '../Components/Footer';
import { Outlet } from "react-router-dom";
export default function MainLayout(){





    const [activePage, setActivePage] = useState('home');
  const [theme, setTheme] = useState('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);



useEffect(() => {
    // Fix: Inject Font Awesome CSS link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link);

    // Apply dark mode class to body
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    return () => {
      // Clean up on component unmount
      document.head.removeChild(link);
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };



    return(
        <>

        <div className="bg-light-grey text-dark-grey transition-colors duration-300 min-h-screen flex flex-col">
        <Header
          activePage={activePage}
          setActivePage={setActivePage}
          theme={theme}
          toggleTheme={toggleTheme}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          setShowSearchModal={setShowSearchModal}
        />
     
      <main className="container mx-auto px-6 md:px-12 py-12 flex-grow">
         
            <Outlet/>
        </main>
            <Footer />

   </div>
        </>
    )
}