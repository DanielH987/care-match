import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToasterContext from "./context/ToasterContext";
import AuthContext from "./context/AuthContext";
import DrawerProvider from "./context/DrawerContext"; // Ensure this is the provider, not just the context
import ActiveStatus from "./components/ActiveStatus";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Care Match",
  description: "Care Match",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DrawerProvider> 
          <AuthContext>
            <ToasterContext/>
              <ActiveStatus/>
              {children}
          </AuthContext>
        </DrawerProvider>
      </body>
    </html>
  );
}
