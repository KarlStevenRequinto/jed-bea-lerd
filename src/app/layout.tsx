import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/providers/StoreProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import NavbarGate from "@/components/navigation/navbar-gate";
import FooterGate from "@/components/navigation/footer-gate";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });



export const metadata: Metadata = {
    title: "Auto Real Estate Ecommerce",
    description: "Discover and manage automotive and real estate listings in one place.",
    icons: {
        icon: "/home-n-drive-logo.png",
    },
};

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
                <SmoothScrollProvider>
                    <StoreProvider>
                        <NavbarGate />
                        <main className="flex min-h-[calc(100vh-5rem)] w-full flex-col gap-0">{children}</main>
                        <FooterGate />
                    </StoreProvider>
                </SmoothScrollProvider>
            </body>
        </html>
    );
};

export default RootLayout;


