const AboutSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 relative inline-block">
          About Our Artisans
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-amber-800 -mb-4"></span>
        </h2>
        <p className="text-gray-600 mb-6">
          Welcome to Artisan Collection, your premier destination for authentic handcrafted pieces. 
          We work directly with master artisans from around the world to bring you unique, high-quality 
          creations that celebrate traditional craftsmanship.
        </p>
        <p className="text-gray-600 mb-6">
          Our mission is to preserve cultural heritage while supporting artisan communities. Each piece 
          in our collection tells a story of tradition, skill, and passion that has been passed down 
          through generations.
        </p>
        <p className="text-gray-600">
          By choosing Artisan Collection, you&apos;re not just acquiring a beautiful object – you&apos;re becoming
  part of a story that connects you to the hands that made it and the culture that inspired it.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;