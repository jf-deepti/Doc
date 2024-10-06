import dynamic from 'next/dynamic';
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import './globals.css';
import { Metadata } from "next";
import { dark } from "@clerk/themes";
import Provider from "./Provider";

// Dynamically import ClerkProvider with SSR disabled
const ClerkProvider = dynamic(() => import("@clerk/nextjs").then(mod => mod.ClerkProvider), {
  ssr: false, // Disable server-side rendering for ClerkProvider
});

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: 'LiveDocs',
  description: 'Your go-to collaborative editor',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Optionally, include meta tags, favicons, etc. */}
      </head>
      <body className={cn("min-h-screen font-sans antialiased", fontSans.variable)}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
            variables: { 
              colorPrimary: "#3371FF",
              fontSize: '16px',
            },
          }}
        >
          <Provider>
            {children}
          </Provider>
        </ClerkProvider>
      </body>
    </html>
  );
}
