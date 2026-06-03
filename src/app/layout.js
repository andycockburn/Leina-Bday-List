export const metadata = {
  title: "Leina's Birthday Wishlist 🎂",
  description: "Help choose gifts for Leina's 9th birthday!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
