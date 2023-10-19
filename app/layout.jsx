import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/navbar";
import GenreList from "@/components/GenreList";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gameportal",
  description: "Browse games and more",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <div className="main-content">
            <div className="left-column">
              <GenreList />
            </div>
            <div className="right-column">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
