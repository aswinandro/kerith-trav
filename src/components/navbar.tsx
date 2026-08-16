export default function NavBar() {
  return (
    <nav className="bg-gray-800 sticky top-0 z-50">
      <div className="secContainer container mx-auto h-16 flex items-center justify-between px-4">
        <div className="logoDiv">
          <span className="text-2xl font-bold">erith Travels</span>
        </div>
        <div className="hidden md:block">
          <div className="flex gap-8">
            <a href="/" className="text-white hover:text-blue-300 text-sm">Home</a>
            <a href="/destinations" className="text-white hover:text-blue-300 text-sm">Destinations</a>
            <a href="/packages" className="text-white hover:text-blue-300 text-sm">Packages</a>
            <a href="/reviews" className="text-white hover:text-blue-300 text-sm">Reviews</a>
          </div>
        </div>
        <button className="md:hidden bg-blue-600 text-white px-4 py-2 rounded">
          Menu
        </button>
      </div>
    </nav>
  );
}