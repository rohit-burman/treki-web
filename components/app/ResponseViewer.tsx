"use client";

import React, { useState } from "react";
import { useAppContext } from "@/lib/context/AppContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { obsidian } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { duotoneEarth, duotoneSpace } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ResponseViewer() {
  const { currentResponse } = useAppContext();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!currentResponse) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-card text-muted-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mb-4 opacity-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-lg select-none">Send a request to see the response</p>
      </div>
    );
  }

  const getFormattedResponse = () => {
    if (!currentResponse.data) return "{}";
    
    const responseData = currentResponse.data.body !== undefined ? 
      currentResponse.data.body : 
      currentResponse.data;
    
    if (typeof responseData === 'string') {
      try {
        const parsed = JSON.parse(responseData);
        return JSON.stringify(parsed, null, 2);
      } catch {
        return responseData;
      }
    }
    
    // Otherwise, stringify the object
    return JSON.stringify(responseData, null, 2);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-zinc-950/90">
      <div className="flex items-center p-3 border-b border-border gap-2">
        <div className="flex items-center gap-2">
          <div 
            className={`px-2 py-1 rounded text-xs font-medium ${
              currentResponse.status >= 200 && currentResponse.status < 300
                ? "bg-green-500/10 text-green-500 border border-green-500/20"
                : currentResponse.status >= 400
                ? "bg-red-500/10 text-red-500 border border-red-500/20"
                : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
            }`}
          >
            {currentResponse.status} {currentResponse.statusText}
          </div>
          <div className="text-xs text-muted-foreground">{currentResponse.time}</div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto h-7 text-xs"
          onClick={() => copyToClipboard(getFormattedResponse())}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>

      <Tabs defaultValue="response" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="mx-3 mt-3 bg-card/50 border border-border">
          <TabsTrigger value="response" className="text-xs">
            Response
          </TabsTrigger>
          <TabsTrigger value="headers" className="text-xs">
            Headers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="response" className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-3 h-full">
              <SyntaxHighlighter
                language="json"
                style={duotoneSpace}
                showLineNumbers={true}
                wrapLines={true}
                wrapLongLines={true}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  width: '100%',
                  height: '100%',
                  overflow: 'auto',
                  // backgroundColor: '#1a1d23'
                  backgroundColor: 'oklch(.21 .006 285.885)'
                
                }}
                codeTagProps={{
                  style: {
                    whiteSpace: 'pre-wrap',
                  }
                }}
              >
                {getFormattedResponse()}
              </SyntaxHighlighter>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="headers" className="flex-1 p-3 overflow-auto">
          <div className="grid grid-cols-[1fr_2fr] gap-2">
            <div className="text-xs font-medium text-muted-foreground">Header</div>
            <div className="text-xs font-medium text-muted-foreground">Value</div>
            
            {Object.entries(currentResponse.headers).map(([key, value]) => (
              <React.Fragment key={key}>
                <div className="text-sm font-mono truncate border-b border-border py-1.5">
                  {key}
                </div>
                <div className="text-sm font-mono truncate border-b border-border py-1.5">
                  {value}
                </div>
              </React.Fragment>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 