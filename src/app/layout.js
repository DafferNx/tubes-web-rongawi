import "./globals.css";

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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
