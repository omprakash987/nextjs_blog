import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog-Mania",
  description: "Discover a world of insightful articles and expert opinions on our blogging platform. Whether you are passionate about tech, lifestyle, travel, or personal growth, our blog brings you fresh content daily to inspire and inform. Dive into in-depth guides, how-tos, and the latest trends curated by a community of skilled writers. With easy navigation and a user-friendly interface, our website is your go-to resource for staying updated on the topics that matter most to you. Join our community today and start your blogging journey with us!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
