const Footer = () => {
    return (
      <footer className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12">
        <div className="container mx-auto text-center">
          <p className="text-lg mb-4">&copy; 2023 Grocery Store. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-green-300 transition-colors duration-300">
              <i className="fab fa-facebook text-2xl"></i>
            </a>
            <a href="#" className="hover:text-green-300 transition-colors duration-300">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a href="#" className="hover:text-green-300 transition-colors duration-300">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;