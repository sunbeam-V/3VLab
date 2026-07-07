import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/app/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
    subsets: ["latin", "cyrillic"],
    preload: false,
});

export const metadata: Metadata = {
    title: "3VLab",
    description: "Игровая студия",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
            <body className={`${inter.className} min-h-screen flex flex-col`}>
                <ThemeProvider>
                    <Header />
                    <main className="flex-grow">{children}</main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}