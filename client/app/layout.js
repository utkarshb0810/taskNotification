import "./globals.css";
export const metadata = {
  title: "Notification System",
  description: "Built with Next.js App Router and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 p-6">{children}</body>
    </html>
  );
}
