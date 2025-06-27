import React, { useEffect, useMemo } from "react";
import "./Middle.css";
import Aos from "aos";
import "aos/dist/aos.css";

const stats = [
  { title: "10", desc: "World of Experiences" },
  { title: "2K+", desc: "Fine Destinations" },
  { title: "10K+", desc: "Customer Reviews" },
  { title: "4.1", desc: "Overall Rating" },
];

const Middle = () => {
  useEffect(() => {
    Aos.init({ duration: 2000, once: true });
  }, []);

  const items = useMemo(
    () =>
      stats.map(({ title, desc }, index) => (
        <span className="flex" data-aos="fade-up" key={index}>
          <h1>{title}</h1>
          <p>{desc}</p>
        </span>
      )),
    []
  );

  return (
    <section className="middle section">
      <div className="secContainer container">
        <div className="grid">{items}</div>
      </div>
    </section>
  );
};

export default Middle;
