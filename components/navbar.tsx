"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("treki-token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <Link href="/" className="font-black text-2xl tracking-tight bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            TREKI
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#interfaces" className="text-muted-foreground hover:text-foreground transition-colors">
            Interfaces
          </Link>
          <Link href="#tech" className="text-muted-foreground hover:text-foreground transition-colors">
            Tech Stack
          </Link>
          <Link href="https://github.com/rohit-burman/treki-web" className="text-muted-foreground hover:text-foreground transition-colors">
            GitHub
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Button asChild>
              <Link href="/app">Open App</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="outline" className="hidden sm:flex">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
} 