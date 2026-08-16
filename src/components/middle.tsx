export default function Middle() {
  const stats = [
    { title: "10", desc: "World of Experiences" },
    { title: "2K+", desc: "Fine Destinations" },
    { title: "10K+", desc: "Customer Reviews" },
    { title: "4.1", desc: "Overall Rating" },
  ];

  return (
    <section
      className="my-16 bg-gray-900 relative overflow-x-hidden"
      style={{ background: "linear-gradient(180deg, #1a1a2e 0%, #141413 100%)" }}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-full"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.2 }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          fill="none"
        >
          <rect width="100" height="100" fill="url(#grad2)" />
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#1a1a2e" />
              <stop offset="100%" style="stop-color:#141413" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {stats.map(({ title, desc }, index) => (
          <motion.div
            key={index}
            className="text-center group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.1 }}
          >
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-orange-500 mb-3 group-hover:text-white transition-colors"
            >
              {title}
            </h1>
            <p
              className="text-white/60 text-sm leading-relaxed"
              style={{ color: "#a0a0a0" }}
            >
              {desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}