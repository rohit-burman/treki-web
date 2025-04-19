import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-card py-12 px-4 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="font-bold text-xl text-primary">TREKI</h3>
            <p className="text-muted-foreground text-sm">
              The multi-interface API testing tool for modern developers
            </p>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">          
            <p className="text-muted-foreground text-base mx-auto mb-4 md:mb-0">
              Made with ❤️ by team Treki.
            </p>
          
        </div>
      </div>
    </footer>
  );
} 