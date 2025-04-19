import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <section id="getstarted" className="py-20 px-4 md:px-6 bg-primary/5 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.3),transparent_70%)]" />
      
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Ready to Upgrade Your API Testing?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Start using Treki today and experience the seamless integration of web interface,
          CLI tool, and robust backend for all your API testing needs.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="px-8">
            <Link href="#download">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="https://github.com" target="_blank">
              View on GitHub
            </Link>
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Cloud Sync</h3>
            <p className="text-muted-foreground text-center text-sm">
              Keep your requests and projects in sync across all devices
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Interface Flexibility</h3>
            <p className="text-muted-foreground text-center text-sm">
              Switch between web and CLI based on your current needs
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Authentication</h3>
            <p className="text-muted-foreground text-center text-sm">
              JWT-based authentication keeps your testing secure
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 