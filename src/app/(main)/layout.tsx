import React from "react";
import Navbar from "./components/Navbar";

type Props = {};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />

      {children}
    </div>
  );
}
