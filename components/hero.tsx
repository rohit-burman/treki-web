import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="pt-36 h-screen flex pb-20 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(120,119,198,0.3),transparent_40%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(120,119,198,0.15),transparent_40%)]" />
      
      <div className="container my-auto pb-16 mx-auto max-w-5xl text-center">
        <h1 className="font-bold tracking-tighter text-4xl md:text-5xl lg:text-7xl mb-6">
          The <span className="text-primary">Multi-interface</span> API Testing Tool
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Treki combines a sleek web interface, powerful CLI, and robust backend 
          for a seamless API testing experience across all environments.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="#getstarted">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="https://github.com/rohit-burman/treki-web" target="_blank">
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </Link>
          </Button>
        </div>
        
        {/* Code snippet preview */}
        <div className="mt-12 px-4 pt-6 pb-8 bg-card border border-border rounded-lg shadow-md overflow-auto text-left w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <div className="w-3 h-3 rounded-full bg-chart-3"></div>
              <div className="w-3 h-3 rounded-full bg-chart-1"></div>
            </div>
            <div className="text-xs text-muted-foreground">Terminal</div>
          </div>
          <pre className="font-mono text-sm overflow-x-auto">
            <code className="text-muted-foreground text-wrap">
            {/* <span className="text-primary">$</span> treki -U https://api.example.com/users -M GET -H &quot;Content-Type: application/json&quot; */}
              {/* <span className="text-primary h-full">$</span> treki-cli post https://jsonplaceholder.typicode.com/posts -b {'{\"key\":\"value\", \"key\":\"value\"}'} -H {`X-Debug-Mode:true, X-Testing-Data:TrekiCLI`} -v */}
              <span className="text-primary h-full">$</span> treki get https://jsonplaceholder.typicode.com/posts  -v
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
} 