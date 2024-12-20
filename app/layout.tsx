import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="bg-purple-500 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
              {/* Left Side: Logo */}
              <div className="flex items-center space-x-2">
                <Link
                  href="/"
                  className="text-2xl font-bold hover:text-blue-300 transition duration-300"
                >
                  Clerk Web 🤞
                </Link>
              </div>

              {/* Right Side: Navigation */}
              <div className="flex items-center space-x-4">
                <ul className="flex items-center space-x-4">
                  <li>
                    <SignedIn>
                      {/* User Button */}
                      <div className="flex items-center space-x-2 text-white hover:text-blue-300 transition duration-300">
                        <UserButton showName />
                      </div>
                    </SignedIn>
                  </li>
                  <li>
                    <SignedOut>
                      {/* Sign-In Button */}
                      <SignInButton>
                        <Link href="/sign-in">
                          <button className="px-4 py-2 bg-black hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300">
                            Sign in
                          </button>
                        </Link>
                      </SignInButton>
                    </SignedOut>
                  </li>
                </ul>
              </div>
            </div>
          </header>

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
