const HeadSection = () => {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4 animate-fade-in">
            Welcome to Our Grocery Store
          </h1>
          <p className="text-xl text-green-100 animate-fade-in">
            Fresh products delivered to your doorstep!
          </p>
        </div>
      </section>
    );
  };
  
  export default HeadSection;