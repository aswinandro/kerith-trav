export default function Destinations() {
  const destinations = [
    {
      id: 1,
      name: "Paris",
      location: "France",
      rating: 4.7,
      desc: "The City of Light captivates visitors with its iconic landmarks like the Eiffel Tower.",
      img: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      name: "Great Barrier Reef",
      location: "Australia",
      rating: 4.3,
      desc: "World's largest coral reef system, vibrant coral gardens and marine life.",
      img: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      name: "Machu Picchu",
      location: "Peru",
      rating: 4.7,
      desc: "Iconic Incan citadel nestled in misty Andes mountains.",
      img: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 4,
      name: "Dubai",
      location: "UAE",
      rating: 4.7,
      desc: "Futuristic skyscrapers, luxury malls and cultural fusion.",
      img: "/placeholder.svg?height=300&width=400",
    },
  ];

  return (
    <section className="py-12 bg-gray-800 text-white">
      <div className="secContainer container">
        <div className="secTitle text-center mb-8">
          <span className="text-red-500">Explore Now</span>
          <h3>Find your Dream Destination</h3>
          <p>Fill in the fields to find your best spot for next tour</p>
        </div>

        <div className="searchField grid max-w-md mx-auto mb-8">
          <div className="inputField flex mb-4">
            <span className="icon">📍</span>
            <input
              type="text"
              placeholder="Location"
              className="w-full bg-gray-700 text-white px-3 py-2 rounded"
            />
          </div>
          <div className="inputField flex mb-4">
            <span className="icon">💰</span>
            <input type="text" placeholder="Budget" className="w-full bg-gray-700 text-white px-3 py-2 rounded" />
          </div>
          <div className="inputField flex mb-4">
            <span className="icon">📅</span>
            <input type="date" className="w-full bg-gray-700 text-white px-3 py-2 rounded" />
          </div>
          <button className="btn w-full bg-blue-600 text-white py-2 rounded mb-4">
            <span className="icon">🔍</span> Search
          </button>
        </div>

        <div className="destinationContainer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="singleDestination bg-gray-700 rounded p-4 hover:shadow-lg transition-shadow"
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
              <span className="rating text-yellow-500">
                ⭐ {destination.rating}
              </span>
            </div>
          ))}
        </div>

        <div className="pagination mt-8 flex justify-center">
          <button className="prev mr-2">Previous</button>
          <button className="next">Next</button>
        </div>
      </div>
    </section>
  );
}