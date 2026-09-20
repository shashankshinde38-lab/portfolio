import type { Metadata } from "next";
import "@/admin/components/Login/AdminLogin.css";
import "@/admin/styles/admin-portal.css";

export const metadata: Metadata = {
  title: "Admin | Shashank Shinde",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
