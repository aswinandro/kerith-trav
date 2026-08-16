export default function Loader() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      style={{ background: "linear-gradient(180deg, #1a1a2e 0%, #141413 100%)" }}
    >
      <motion.div
        className="text-xl"
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        Loading...
      </motion.div>
    </div>
  );
}