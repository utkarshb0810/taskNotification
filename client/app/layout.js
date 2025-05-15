

import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Notification System",
  description: "Built with Next.js App Router and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="max-w-5xl mx-auto p-6">{children}</main>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
