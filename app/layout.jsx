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
          {children}
          <div className="grid grid-cols-4 px-5">
            <div className="hidden md:block">
              <GenreList />
            </div>
            <div className="col-span4 md:col-span-3"></div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
