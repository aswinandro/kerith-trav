"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
    <motion.div
      className="accordion-item"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
    >
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
    </motion.div>
  );
}

export default function Questions() {
  const [active, setActive] = useState(
    "How do i chose right travel destination for me?"
  );

  const accordionItems = [
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

      <div className="secContainer container mx-auto px-6 py-20">
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
    </section>
  );
}