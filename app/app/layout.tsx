"use client";

import { AppProvider } from "@/lib/context/AppContext";
import { AuthProvider } from "@/lib/auth";
import Header from "@/components/app/Header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <AppProvider>
        <div className="flex flex-col h-screen overflow-hidden">
          <Header />
          {children}
        </div>
      </AppProvider>
    </AuthProvider>
  );
} 