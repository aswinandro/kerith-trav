export default function NavBar() {
  return (
    <nav
      className="bg-gray-900 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <motion.div
        className="secContainer container mx-auto h-16 flex items-center justify-between px-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <div className="logoDiv">
          <span className="text-2xl font-bold text-orange-500">Kerith Travels</span>
        </div>
        <div className="hidden md:block">
          <div className="flex gap-8">
            <a href="/" className="text-white/60 hover:text-orange-500 text-sm transition-colors">Home</a>
            <a href="/destinations" className="text-white/60 hover:text-orange-500 text-sm transition-colors">Destinations</a>
            <a href="/packages" className="text-white/60 hover:text-orange-500 text-sm transition-colors">Packages</a>
            <a href="/reviews" className="text-white/60 hover:text-orange-500 text-sm transition-colors">Reviews</a>
          </div>
        </div>
        <button
          className="md:hidden bg-orange-600 text-white px-4 py-2 rounded"
          whileHover={{ backgroundColor: "#ff8c42" }}
          whileTap={{ scale: 0.95 }}
        >
          Menu
        </button>
      </motion.div>
    </nav>
  );
}