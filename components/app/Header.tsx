"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { logout } = useAuth();

  return (
    <header className="bg-background border-b border-border h-14 flex items-center px-4 sticky top-0 z-50">
      <div className="flex items-center">
        <Link
          href="/"
          className="font-black text-2xl tracking-tight bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mr-8"
        >
          TREKI
        </Link>
      </div>
      
      <div className="flex-1 mx-4">
        {/* Center area - can be used for search or other elements */}
      </div>
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                U
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/app/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
} 