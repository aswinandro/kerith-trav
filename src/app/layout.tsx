import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kerith Travels | Tourism & Adventures",
  description: "Experience the world's most adventurous nature - book your dream tour today",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-900 text-white">{children}</body>
    </html>
  );
}