import { ClerkProvider, UserButton } from "@clerk/nextjs";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/navbar";
import GenreList from "@/components/GenreList";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gameportal",
  description: "Browse games and more",
  icons: {
    icon: "logo.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            <div className="main-content container">
              <div className="left-column px-4">
                <GenreList />
              </div>
              <div className="right-column">{children}</div>
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
