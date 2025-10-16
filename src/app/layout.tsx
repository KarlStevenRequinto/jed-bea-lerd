import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navigation/Navbar";
import "./globals.css";
import StoreProvider from "@/providers/StoreProvider";
import NavbarGate from "@/components/navigation/NavbarGate";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });



export const metadata: Metadata = {
    title: "Auto Real Estate Ecommerce",
    description: "Discover and manage automotive and real estate listings in one place.",
};

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="en">
            <body className={`${inter.variable} antialiased`}>
                <StoreProvider>
                    <NavbarGate />
                    <main className="flex min-h-[calc(100vh-5rem)] w-full flex-col gap-0">{children}</main>
                </StoreProvider>
            </body>
        </html>
    );
};

export default RootLayout;


