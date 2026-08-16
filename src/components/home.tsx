export default function Home() {
  return (
    <section
      className="min-h-screen bg-black relative overflow-x-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 100%)",
      }}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-full"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 3, delay: 0.5 }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          fill="none"
        >
          <rect width="100" height="100" fill="url(#grad1)" />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#0a0a0f" />
              <stop offset="100%" style="stop-color:#1a1a2e" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 py-24 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="mb-16"
      >
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-wider mb-6"
          style={{ color: "#fff" }}
        >
          Unlock your Travel Dreams With Us!
        </h1>
        <p
          className="text-lg text-white/60 mb-8 max-w-2xl mx-auto"
          style={{ color: "#a0a0a0" }}
        >
          Discover the world's most adventurous nature — life is short!
        </p>
        <motion.div
          className="inline-flex gap-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
        >
          <button
            className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
          >
            Start Here
          </button>
        </motion.div>
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.5 }}
      >
        <svg
          className="w-20 h-20 text-orange-500 opacity-50"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm5.5 13.5l2.5 3L17 14l-5 6.5L9 5l5-3Z" />
        </svg>
      </motion.div>
    </section>
  );
}