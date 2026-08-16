import React from "react";
import Image from "next/image";

export default function Reviews() {
  const clients = [
    { name: "Sarah Johnson", location: "New York, USA", rating: 5 },
    { name: "Michael Chen", location: "London, UK", rating: 4.5 },
    { name: "Emily Rodriguez", location: "Sydney, Australia", rating: 5 },
    { name: "David Kim", location: "Toronto, Canada", rating: 4.8 },
  ];

  return (
    <section
      className="py-12 bg-gray-900 relative overflow-x-hidden"
      style={{ background: "linear-gradient(180deg, #1a1a2e 0%, #141413 100%)" }}
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
              <stop offset="0%" style="stop-color:#1a1a2e" />
              <stop offset="100%" style="stop-color:#141413" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <motion.div
        className="secContainer container mx-auto py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="imgDiv">
            <Image
              src="/placeholder.svg?height=500&width=600"
              alt="Happy customer testimonial"
              loading="lazy"
              className="reviewMainImage"
              width={600}
              height={500}
            />
          </div>

          <div className="textDiv">
            <span
              className="text-orange-500 text-sm uppercase tracking-wider"
            >
              From Our Clients
            </span>
            <h3
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              style={{ color: "#fff" }}
            >
              Real Travel History from Our Beloved Clients
            </h3>
            <p className="text-white/60 text-lg mb-8">
              By choosing us as their tour agency, customers enjoy an enriching
              experience filled with unforgettable memories.
            </p>

            <div className="stars flex mb-8">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="icon h-5 w-5 fill-yellow-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Z"
                  />
                </svg>
              ))}
            </div>

            <div className="clientsGrid grid grid-cols-2 gap-6">
              {clients.map((client, index) => (
                <motion.div
                  key={index}
                  className="clientCard bg-gray-800 rounded-xl p-6 hover:shadow-2xl transition-shadow group"
                  whileHover={{ transform: "translateY(-10px)", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                  whileTap={{ transform: "scale(0.96)" }}
                  transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.1 }}
                >
                  <div
                    className="clientImage"
                    style={{
                      background: "url('/placeholder.svg?height=80&width=80') center/cover",
                    }}
                    aria-label={`Client testimonial ${index + 1}`}
                    role="article"
                  />
                  <div className="clientInfo mt-4">
                    <p
                      className="font-medium text-white"
                      style={{ color: "#fff" }}
                    >
                      {client.name}
                    </p>
                    <p
                      className="text-white/60 text-sm"
                      style={{ color: "#a0a0a0" }}
                    >
                      {client.location}
                    </p>
                  </div>
                  <div
                    className="rating flex mt-3"
                    style={{ color: "#fbbf24" }}
                  >
                    {[Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 fill-yellow-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Z"
                        />
                      </svg>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}