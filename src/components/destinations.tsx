export default function Destinations() {
  const destinations = [
    {
      id: 1,
      name: "Paris",
      location: "France",
      rating: 4.7,
      desc: "The City of Light captivates visitors with its iconic landmarks like the Eiffel Tower.",
      img: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 2,
      name: "Great Barrier Reef",
      location: "Australia",
      rating: 4.3,
      desc: "World's largest coral reef system, vibrant coral gardens and marine life.",
      img: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 3,
      name: "Machu Picchu",
      location: "Peru",
      rating: 4.7,
      desc: "Iconic Incan citadel nestled in misty Andes mountains.",
      img: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 4,
      name: "Dubai",
      location: "UAE",
      rating: 4.7,
      desc: "Futuristic skyscrapers, luxury malls and cultural fusion.",
      img: "/placeholder.svg?height=400&width=400",
    },
  ];

  return (
    <section
      className="py-16 bg-gray-900 relative overflow-x-hidden"
      style={{ background: "linear-gradient(180deg, #0f0f14 0%, #1a1a2e 100%)" }}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-96"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.2 }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          fill="none"
        >
          <rect width="100" height="100" fill="url(#grad3)" />
          <defs>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#0f0f14" />
              <stop offset="100%" style="stop-color:#1a1a2e" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 py-20"
      >
        <div className="secTitle text-center mb-12">
          <span className="text-red-500 text-sm uppercase tracking-wider">Explore Now</span>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find your Dream Destination
          </h3>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Fill in the fields to find your best spot for next tour
          </p>
        </div>

        <div className="searchField grid max-w-md mx-auto mb-12">
          <div className="inputField flex mb-4">
            <span className="icon">📍</span>
            <input
              type="text"
              placeholder="Location"
              className="w-full bg-gray-800 text-white border border-gray-600 rounded px-4 py-3 focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="inputField flex mb-4">
            <span className="icon">💰</span>
            <input
              type="text"
              placeholder="Budget"
              className="w-full bg-gray-800 text-white border border-gray-600 rounded px-4 py-3 focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="inputField flex mb-4">
            <span className="icon">📅</span>
            <input
              type="date"
              className="w-full bg-gray-800 text-white border border-gray-600 rounded px-4 py-3 focus:outline-none focus:border-orange-500"
            />
          </div>
          <button
            className="btn w-full bg-orange-600 text-white py-3 rounded mb-6"
          >
            <span className="icon">🔍</span> Search
          </button>
        </div>

        <div className="destinationContainer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              className="singleDestination bg-gray-800 rounded-xl p-6 hover:shadow-2xl transition-shadow hover:bg-gray-900 group transition-colors"
            >
              <img
                src={destination.img}
                alt={destination.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <div className="text-info">
                <p className="mb-2">{destination.desc}</p>
                <p className="flex items-center text-sm">
                  <span className="icon">📍</span> {destination.name}
                </p>
              </div>
              <span className="rating text-yellow-500">⭐ {destination.rating}</span>
            </motion.div>
          ))}
        </div>

        <div className="pagination mt-12 flex justify-center">
          <button className="prev mr-2">Previous</button>
          <button className="next">Next</button>
        </div>
      </motion.div>
    </section>
  );
}