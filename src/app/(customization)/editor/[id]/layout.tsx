import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CraftWood Editor",
  description: "Professional design editor for custom products",
};

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
