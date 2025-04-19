import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Interfaces() {
  return (
    <section id="interfaces" className="py-20 px-4 md:px-6 bg-secondary/10">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Multiple Interfaces, One Ecosystem</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Treki offers a unified API testing experience through multiple interfaces,
            all working together seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Web Interface */}
          <Card className="overflow-hidden border-primaryg border border-border shadow-lgg">
            <div className="p-4 bg-card">
              <h3 className="text-xl font-bold mb-1">Web Interface</h3>
              <p className="text-muted-foreground text-sm mb-4">Sleek &amp; Intuitive</p>
              <Separator className="my-2" />
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Visual request builder
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Project management
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Response visualization
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Team collaboration
                </li>
              </ul>
            </div>
            <CardContent className="p-0">
              {/* Mock UI */}
              <div className="bg-card h-64 relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-10 bg-secondary/20 flex items-center px-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive opacity-75"></div>
                    <div className="w-3 h-3 rounded-full bg-chart-3 opacity-75"></div>
                    <div className="w-3 h-3 rounded-full bg-chart-1 opacity-75"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 h-[calc(100%-2.5rem)] mt-10">
                  <div className="border-r border-border bg-secondary/5 p-2">
                    <div className="h-6 w-3/4 bg-accent/50 rounded mb-2"></div>
                    <div className="h-4 w-full bg-accent/30 rounded mb-1"></div>
                    <div className="h-4 w-full bg-accent/30 rounded mb-1"></div>
                    <div className="h-4 w-full bg-accent/30 rounded"></div>
                  </div>
                  <div className="col-span-2 p-2">
                    <div className="h-6 w-1/2 bg-accent/50 rounded mb-4"></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="h-4 w-full bg-accent/30 rounded mb-1"></div>
                        <div className="h-8 w-full bg-accent/20 rounded mb-2"></div>
                      </div>
                      <div>
                        <div className="h-4 w-full bg-accent/30 rounded mb-1"></div>
                        <div className="h-8 w-full bg-accent/20 rounded mb-2"></div>
                      </div>
                    </div>
                    <div className="h-4 w-1/4 bg-primary/40 rounded mt-4 ml-auto"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CLI Tool */}
          <Card className="overflow-hidden border border-border">
            <div className="p-4 bg-card">
              <h3 className="text-xl font-bold mb-1">CLI Tool</h3>
              <p className="text-muted-foreground text-sm mb-4">Fast &amp; Efficient</p>
              <Separator className="my-2" />
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Lightning-fast execution
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Scriptable workflows
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  CI/CD integration
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Local config files
                </li>
              </ul>
            </div>
            <CardContent className="p-0">
              <ScrollArea className="h-64 w-full bg-black/90 text-white font-mono text-xs p-4">
                <pre className="leading-relaxed">
                  <code className="text-wrap">
                    <span className="text-primary">$</span> treki --help{"\n"}
                    <span className="text-muted-foreground">
                      Treki CLI - A powerful API testing tool{"\n\n"}
                      USAGE:{"\n"}
                      treki [OPTIONS] [COMMAND]{"\n\n"}
                      OPTIONS:{"\n"}
                      {/* -U, --url &lt;URL&gt;         URL to send the request to{"\n"} */}
                      -M, --method &lt;METHOD&gt;   HTTP method (GET, POST, PUT, etc.){"\n"}
                      -H, --header &lt;HEADER&gt;   HTTP header in the form "key: value"{"\n"}
                      -d, --data &lt;DATA&gt;       Request body data{"\n"}
                      -v, --verbose          Show verbose output{"\n"}
                      -h, --help             Show this help message{"\n\n"}
                      COMMANDS:{"\n"}
                      login       Login to your Treki account{"\n"}
                      sync        Sync with your Treki cloud account{"\n"}
                      run         Run a saved request{"\n"}
                      list        List saved requests/projects{"\n"}
                    </span>
                    {"\n"}
                    {/* <span className="text-primary">$</span> treki -U https://api.example.com/users -M GET */}
                    <span className="text-primary h-full">$</span> treki-cli post https://jsonplaceholder.typicode.com/posts -b {'{\"title\":\"foo\", \"body\":\"bar\", \"userId\":1\"}'} -H {`Content-Type: application/json`} -v
                  </code>
                </pre>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Backend */}
          <Card className="overflow-hidden border border-border">
            <div className="p-4 bg-card">
              <h3 className="text-xl font-bold mb-1">Express.js Backend</h3>
              <p className="text-muted-foreground text-sm mb-4">Robust &amp; Reliable</p>
              <Separator className="my-2" />
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  JWT Authentication
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Cloud storage
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  API proxying
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Team permissions
                </li>
              </ul>
            </div>
            <CardContent className="p-0">
              <div className="h-64 bg-card text-xs font-mono p-4 overflow-hidden">
                <pre className="text-muted-foreground">
                  <code>
                    <span className="text-primary">// Express.js Backend Code</span>{"\n\n"}
                    app.post('/api/execute', authenticate, async (req, res) ={'>'} {"{\n"}
                    {"  "}try {"{\n"}
                    {"    "}const {"{"} url, method, headers, body {"}"} = req.body;{"\n"}
                    {"    "}const response = await axios({"{\n"}
                    {"      "}url,{"\n"}
                    {"      "}method,{"\n"}
                    {"      "}headers,{"\n"}
                    {"      "}data: body{"\n"}
                    {"    "}{'}'});{"\n\n"}
                    {"    "}await saveRequestHistory({"{\n"}
                    {"      "}userId: req.user.id,{"\n"}
                    {"      "}request: {"{"} url, method, headers, body {"}"},{"{\n"}
                    {"      "}response: {"{\n"}
                    {"        "}status: response.status,{"\n"}
                    {"        "}headers: response.headers,{"\n"}
                    {"        "}data: response.data{"\n"}
                    {"      "}{"}"}{"}\n"}
                    {"    "}{'}'});{"\n\n"}
                    {"    "}return res.json({"{\n"}
                    {"      "}status: response.status,{"\n"}
                    {"      "}headers: response.headers,{"\n"}
                    {"      "}data: response.data{"\n"}
                    {"    "}{'}'});{"\n"}
                    {"  "}{"}"}{"}\n"}
                  </code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 