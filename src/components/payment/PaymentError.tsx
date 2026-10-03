"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FiXCircle, FiHome, FiRefreshCw } from "react-icons/fi";
import { CONTACT } from "@/data/contact";

export default function PaymentError() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const errorDescription = searchParams.get("error_description");

  const message = errorDescription
    ? decodeURIComponent(errorDescription)
    : !token
      ? "Payment was not initiated, or it was cancelled before completion."
      : "Something went wrong. Please try again or contact support.";

  return (
    <div className="grid min-h-[75vh] place-items-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
        className="glass w-full max-w-lg rounded-[30px] p-10 text-center"
      >
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-coral/40 bg-coral/10 text-coral">
          <FiXCircle size={30} />
        </span>
        <h1 className="display mt-6 text-3xl text-cream">Payment failed</h1>
        <p className="lede mt-4">{message}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/#packages" className="btn btn-primary">
            <FiRefreshCw size={16} /> Try again
          </Link>
          <Link href="/" className="btn btn-ghost">
            <FiHome size={16} /> Go to home
          </Link>
        </div>

        <p className="mt-7 text-xs text-cream/40">
          Need help? Call{" "}
          <a href={CONTACT.phoneHref} className="text-amber-2">
            {CONTACT.phoneDisplay}
          </a>{" "}
          or email{" "}
          <a href={CONTACT.emailHref} className="text-amber-2">
            {CONTACT.email}
          </a>
        </p>
      </motion.div>
    </div>
  );
}
