import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/ReduxProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatBot } from "@/components/chat/ChatBot";

import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LocalGems - Discover Authentic Local Experiences",
  description: "Connect with local experts for unique, off-the-beaten-path travel experiences.",
};

// Assuming 'Providers' is a component that combines ReduxProvider and ThemeProvider
// For this change, we'll replace the nested structure with a placeholder 'Providers'
// as indicated by the provided Code Edit. If 'Providers' is not defined elsewhere,
// this would lead to a compilation error.
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="flex flex-col min-h-screen font-sans antialiased bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 relative">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-20">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster position="bottom-right" />
          <ChatBot />
        </Providers>
      </body>
    </html>
  );
}
