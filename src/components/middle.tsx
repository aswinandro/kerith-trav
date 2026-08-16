export default function Middle() {
  const stats = [
    { title: "10", desc: "World of Experiences" },
    { title: "2K+", desc: "Fine Destinations" },
    { title: "10K+", desc: "Customer Reviews" },
    { title: "4.1", desc: "Overall Rating" },
  ];

  return (
    <section className="my-12 bg-gray-800 py-8">
      <div className="secContainer container mx-auto">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map(({ title, desc }, index) => (
            <div key={index} className="text-center text-white">
              <h1 className="text-4xl font-bold">{title}</h1>
              <p className="mt-2 text-white/80">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}