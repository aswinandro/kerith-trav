import React, { useState, useCallback } from "react";
import Image from "next/image";

export function Accordion({
  title,
  desc,
  active,
  setActive,
}: {
  title: string;
  desc: string;
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-item">
      <button
        className={cn(
          "accordion-button w-full text-left justify-between py-3 px-0 text-white background-none"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <span>▼</span>
      </button>
      <div
        className={cn(
          "accordion-content bg-gray-800 text-sm text-white/80 overflow-hidden",
          isOpen && "max-h-[200px]"
        )}
      >
        <p className="p-4">{desc}</p>
      </div>
    </div>
  );
}

export default function Questions() {
  const [active, setActive] = useState(
    "How do i chose right travel destination for me?"
  );

  const accordionItems = useCallback(
    [
      {
        id: 1,
        title: "How to find my destination",
        desc:
          "Consider your interests, budget, desired experiences, and the type of environment. Research destinations that align with your preferences",
      },
      {
        id: 2,
        title: "How can i find budget friendly travel options and deals?",
        desc:
          "Look for travel deals, discounts on flights and accommodations, and consider using travel apps or websites that offer competitive prices. Being flexible with your travel dates can also help you find better deals",
      },
      {
        id: 3,
        title: "Best times to visit specific destination?",
        desc:
          "Look for travel deals, discounts on flights and accommodations, and consider using travel apps or websites that offer competitive prices. Being flexible with your travel dates can also help you find better deals",
      },
      {
        id: 4,
        title: "Can I make changes to or cancel my booking?",
        desc:
          "The ability to make changes or cancel your booking depends on the terms and conditions of the service provider you booked with. Some bookings may be non-refundable or subject to fees for changes. We recommend reviewing the specific policies outlined at the time of booking or contacting our customer support for assistance.",
      },
    ],
    []
  );

  return (
    <div className="questions section container bg-gray-900 text-white">
      <div className="secHeading">
        <h3 className="text-2xl mb-6">Frequently Asked Questions</h3>
      </div>
      <div className="secContainer grid">
        <div className="accordion grid">
          {accordionItems.map((item) => (
            <Accordion
              key={item.id}
              title={item.title}
              desc={item.desc}
              active={active}
              setActive={setActive}
            />
          ))}
        </div>
        <div className="form py-8">
          <div className="secHeading mb-4">
            <h4 className="text-lg mb-2">Do you have any specific question?</h4>
            <p className="text-white/80">
              Please fill the form below and our dedicated team will get in touch with you as soon as possible.
            </p>
          </div>
          <div className="formContent grid grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="p-2 rounded bg-gray-800 text-white"
            />
            <textarea
              placeholder="Enter your question here"
              className="p-2 rounded bg-gray-800 text-white resize-none min-h-[100px]"
            />
            <button
              className="btn col-span-2 py-3"
              type="button"
            >
              Submit Inquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}