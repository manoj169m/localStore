const Products = () => {
    const products = [
      { id: 1, name: 'Dhal', price: ' ₹140', image: '/dhal.jpg' },
      { id: 2, name: 'Chilli', price: ' ₹200', image: '/chilli.jpg' },
      { id: 3, name: 'Agarbatti', price: ' ₹10', image: '/agar.jpg' },
    ];
  
    return (
      <section className="min-h-screen bg-green-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-green-900 text-center mb-12 animate-fade-in">
            Our Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in-up"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <h3 className="text-2xl font-semibold text-green-900 mt-4">{product.name}</h3>
                <p className="text-green-600 text-xl mt-2">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Products;  