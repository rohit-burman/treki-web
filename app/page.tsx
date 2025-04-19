"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Features from "@/components/features";
import Interfaces from "@/components/interfaces";
import TechStack from "@/components/tech-stack";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem("treki-token");
    
    // if (token) {
    //   router.push("/app");
    // }
  }, [router]);
  
  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Interfaces />
        <TechStack />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
