import React from "react";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";

export default function Reviews() {
  const clients = [
    { name: "Sarah Johnson", location: "New York, USA", rating: 5 },
    { name: "Michael Chen", location: "London, UK", rating: 4.5 },
    { name: "Emily Rodriguez", location: "Sydney, Australia", rating: 5 },
    { name: "David Kim", location: "Toronto, Canada", rating: 4.8 },
  ];

  return (
    <section className="review section container bg-gray-900 text-white" role="region" aria-label="Customer Reviews">
      <div className="secContainer grid">
        <div className="imgDiv">
          <Image
            src="/placeholder.svg?height=400&width=500"
            alt="Happy customer testimonial"
            loading="lazy"
            className="reviewMainImage"
            width={500}
            height={400}
          />
        </div>

        <div className="textDiv">
          <span className="redText">From Our Clients</span>
          <h3>Real Travel History from Our Beloved Clients</h3>
          <p>
            By choosing us as their tour agency, customers enjoy an enriching
            experience filled with unforgettable memories.
          </p>

          <div className="stars flex">
            {[...Array(5)].map((_, i) => (
              <AiFillStar
                key={i}
                className="icon"
                aria-hidden="true"
                style={{ color: "#fbbf24" }}
              />
            ))}
          </div>

          <div className="clientsImages flex">
            {clients.map((client, index) => (
              <div
                key={index}
                className="clientImage"
                style={{
                  background: "url('/placeholder.svg?height=80&width=80') center/cover",
                }}
                aria-label={`Client testimonial ${index + 1}`}
                role="article"
              >
                <p>{client.name}</p>
                <p>{client.location}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}