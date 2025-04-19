import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const techStack = [
  {
    name: "Frontend",
    description: "Sleek, responsive web interface built with modern technologies",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Backend",
    description: "Robust server implementation for API request handling",
    tech: ["Express.js", "Node.js", "JWT Auth", "NeonDB/Supabase"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
      </svg>
    ),
  },
  {
    name: "CLI Tool",
    description: "Fast, efficient command-line interface for power users",
    tech: ["Rust", "CLI Architecture", "System-level APIs"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "Database",
    description: "Modern relational database for efficient data storage",
    tech: ["PostgreSQL", "Drizzle ORM", "Data modeling"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
];

export default function TechStack() {
  return (
    <section id="tech" className="py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Powered by Modern Technology</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Treki is built on a foundation of fast, reliable, and production-grade technologies
            to deliver the best API testing experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {techStack.map((tech, index) => (
            <Card key={index} className="border border-border bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-primary">{tech.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{tech.description}</p>
                    <Separator className="my-3" />
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tech.tech.map((t, i) => (
                        <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 