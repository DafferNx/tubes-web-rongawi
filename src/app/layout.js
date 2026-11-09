import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Forum Resep | Inspirasi masakan sehari-hari",
  description: "Temukan resep dan inspirasi masakan favoritmu.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main id="konten" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
