export default function Footer(){
    return(
        <>
             <footer className="py-12 mt-12 bg-gray-800 text-gray-300">
    <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h5 className="text-xl font-bold mb-4">BizBlog</h5>
        <p className="text-sm">A modern blog platform for businesses and creators.</p>
      </div>
      <div>
        <h5 className="text-lg font-semibold mb-4">Explore</h5>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-primary-blue transition-colors duration-200">Articles</a></li>
          <li><a href="#" className="hover:text-primary-blue transition-colors duration-200">Categories</a></li>
          <li><a href="#" className="hover:text-primary-blue transition-colors duration-200">Authors</a></li>
        </ul>
      </div>
      <div>
        <h5 className="text-lg font-semibold mb-4">Company</h5>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-primary-blue transition-colors duration-200">About Us</a></li>
          <li><a href="#" className="hover:text-primary-blue transition-colors duration-200">Contact</a></li>
          <li><a href="#" className="hover:text-primary-blue transition-colors duration-200">Careers</a></li>
        </ul>
      </div>
      <div>
        <h5 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h5>
        <form className="flex">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full p-2 rounded-l-md bg-gray-700 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-blue placeholder-gray-400"
          />
          <button type="submit" className="bg-primary-blue text-white p-2 rounded-r-md hover:bg-opacity-90 transition-colors duration-200">
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
    <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
      <p>&copy; 2025 inkWell. All rights reserved.</p>
    </div>
  </footer>
        </>
    )
}