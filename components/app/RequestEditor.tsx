"use client";

import React, { useState, useEffect } from "react";
import { useAppContext } from "@/lib/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RequestEditor() {
  const { currentRequest, updateRequest, executeRequest, isLoading } = useAppContext();
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState<"GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS">("GET");
  const [headers, setHeaders] = useState<{ key: string; value: string; enabled: boolean }[]>([]);
  const [params, setParams] = useState<{ key: string; value: string; enabled: boolean }[]>([]);
  const [bodyType, setBodyType] = useState<"none" | "json" | "form-data" | "x-www-form-urlencoded">("none");
  const [bodyContent, setBodyContent] = useState("");
  const [requestName, setRequestName] = useState("");
  const [authType, setAuthType] = useState<"none" | "basic" | "bearer" | "apikey">("none");
  const [authParams, setAuthParams] = useState<{
    username?: string;
    password?: string;
    token?: string;
    key?: string;
    value?: string;
    addTo?: "header" | "query";
  }>({});

  useEffect(() => {
    if (currentRequest) {
      setUrl(currentRequest.url);
      setMethod(currentRequest.method);
      setHeaders(currentRequest.headers.length > 0 ? [...currentRequest.headers, { key: "", value: "", enabled: true }] : [{ key: "", value: "", enabled: true }]);
      setParams(currentRequest.params.length > 0 ? [...currentRequest.params, { key: "", value: "", enabled: true }] : [{ key: "", value: "", enabled: true }]);
      setBodyType(currentRequest.body.type);
      setBodyContent(currentRequest.body.content);
      setRequestName(currentRequest.name);
      setAuthType(currentRequest.auth?.type || "none");
      setAuthParams(currentRequest.auth?.params || {});
    }
  }, [currentRequest]);

  useEffect(() => {
    if (currentRequest) {
      const debounce = setTimeout(() => {
        updateRequest(currentRequest.id, {
          url,
          method,
          headers: headers.filter(h => h.key || h.value),
          params: params.filter(p => p.key || p.value),
          body: {
            type: bodyType,
            content: bodyContent,
          },
          name: requestName,
          auth: {
            type: authType,
            params: authParams
          }
        });
      }, 500);

      return () => clearTimeout(debounce);
    }
  }, [url, method, headers, params, bodyType, bodyContent, requestName, authType, authParams, currentRequest, updateRequest]);

  const handleHeaderChange = (index: number, field: 'key' | 'value' | 'enabled', value: string | boolean) => {
    const newHeaders = [...headers];
    
    if (field === 'enabled') {
      newHeaders[index].enabled = value as boolean;
    } else {
      newHeaders[index][field] = value as string;
    }
    
    const lastIndex = newHeaders.length - 1;
    if (index === lastIndex && (newHeaders[lastIndex].key || newHeaders[lastIndex].value)) {
      newHeaders.push({ key: "", value: "", enabled: true });
    }
    
    setHeaders(newHeaders);
  };

  const handleParamChange = (index: number, field: 'key' | 'value' | 'enabled', value: string | boolean) => {
    const newParams = [...params];
    
    if (field === 'enabled') {
      newParams[index].enabled = value as boolean;
    } else {
      newParams[index][field] = value as string;
    }
    
    const lastIndex = newParams.length - 1;
    if (index === lastIndex && (newParams[lastIndex].key || newParams[lastIndex].value)) {
      newParams.push({ key: "", value: "", enabled: true });
    }
    
    setParams(newParams);
  };

  const commonHeaders = [
    { key: "Content-Type", value: "application/json" },
    { key: "Content-Type", value: "application/x-www-form-urlencoded" },
    { key: "Content-Type", value: "multipart/form-data" },
    { key: "Accept", value: "application/json" },
    { key: "Accept", value: "*/*" },
    { key: "Authorization", value: "Bearer " },
    { key: "Authorization", value: "Basic " },
    { key: "User-Agent", value: "Treki/1.0" },
    { key: "Cache-Control", value: "no-cache" },
    { key: "Cache-Control", value: "max-age=0" },
    { key: "Accept-Language", value: "en-US,en;q=0.9" },
    { key: "X-Requested-With", value: "XMLHttpRequest" }
  ];

  const getHeaderValueSuggestions = (key: string) => {
    if (!key) return [];
    
    const lowerKey = key.toLowerCase();
    
    switch (lowerKey) {
      case 'content-type':
        return [
          "application/json",
          "application/x-www-form-urlencoded",
          "multipart/form-data",
          "text/plain",
          "text/html",
          "application/xml"
        ];
      case 'accept':
        return [
          "application/json",
          "*/*",
          "text/plain",
          "text/html",
          "application/xml"
        ];
      case 'authorization':
        return [
          "Bearer ",
          "Basic ",
          "Digest ",
          "OAuth "
        ];
      case 'cache-control':
        return [
          "no-cache",
          "no-store",
          "max-age=0",
          "max-age=3600",
          "public",
          "private"
        ];
      default:
        return [];
    }
  };

  const handleHeaderSuggestion = (header: { key: string, value: string }) => {
    const headerExists = headers.some(h => h.key.toLowerCase() === header.key.toLowerCase());
    
    if (!headerExists) {
      const emptyRowIndex = headers.findIndex(h => !h.key && !h.value);
      if (emptyRowIndex !== -1) {
        const newHeaders = [...headers];
        newHeaders[emptyRowIndex] = { ...header, enabled: true };
        setHeaders(newHeaders);
      } else {
        setHeaders([...headers.slice(0, -1), { ...header, enabled: true }, { key: "", value: "", enabled: true }]);
      }
    }
  };

  const commonParams = [
    { key: "page", value: "1" },
    { key: "limit", value: "10" },
    { key: "sort", value: "asc" },
    { key: "filter", value: "" },
    { key: "search", value: "" },
    { key: "id", value: "" }
  ];

  const handleParamSuggestion = (param: { key: string, value: string }) => {
    const paramExists = params.some(p => p.key.toLowerCase() === param.key.toLowerCase());
    
    if (!paramExists) {
      const emptyRowIndex = params.findIndex(p => !p.key && !p.value);
      if (emptyRowIndex !== -1) {
        const newParams = [...params];
        newParams[emptyRowIndex] = { ...param, enabled: true };
        setParams(newParams);
      } else {
        setParams([...params.slice(0, -1), { ...param, enabled: true }, { key: "", value: "", enabled: true }]);
      }
    }
  };

  if (!currentRequest) {
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
        <p className="text-lg select-none">Select or create a request to get started</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-zinc-950/90">
      <div className="flex items-center p-3 border-b border-border gap-2">
        <Input
          value={requestName}
          onChange={(e) => setRequestName(e.target.value)}
          className="font-medium h-8 focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-orange-500 border-transparent bg-transparent"
          placeholder="Request Name"
        />
      </div>
      
      <div className="p-3 flex items-center gap-2 border-b border-border">
        <div className="flex bg-card/50 border border-border rounded-md w-full">
          <Select value={method} onValueChange={(value) => setMethod(value as any)}>
            <SelectTrigger 
              className="bg-transparent text-sm px-2 py-1 border-r  border-border rounded-l-md rounded-r-none font-medium w-[110px]"
              style={{ color: getMethodColor(method) }}
            >
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
              <SelectItem value="PATCH">PATCH</SelectItem>
              <SelectItem value="OPTIONS">OPTIONS</SelectItem>
            </SelectContent>
          </Select>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 w-full text-sm h-8 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none rounded-r-md"
            placeholder="https://api.example.com"
          />
        </div>
        <Button 
          variant="default" 
          className="ml-auto bg-orange-500 hover:bg-orange-600 text-white"
          onClick={executeRequest}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </div>
      
      <Tabs defaultValue="params" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="mx-3 mt-3 bg-card/50 border border-border">
          <TabsTrigger value="params" className="text-xs">Query Params</TabsTrigger>
          <TabsTrigger value="headers" className="text-xs">Headers</TabsTrigger>
          <TabsTrigger value="auth" className="text-xs">Authorization</TabsTrigger>
          <TabsTrigger 
            value="body" 
            className="text-xs" 
            disabled={method === "GET"}
          >
            Body
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="params" className="flex-1 p-3 overflow-auto">
          <div className="flex justify-between items-center mb-3">
            <div className="text-xs text-muted-foreground">Common parameters:</div>
            <div className="flex flex-wrap gap-1 max-w-[500px]">
              {commonParams.map((param, index) => (
                <button
                  key={index}
                  onClick={() => handleParamSuggestion(param)}
                  className="px-2 py-1 text-xs rounded bg-zinc-800 hover:bg-zinc-700 transition-colors"
                >
                  {param.key}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-2">
            <div className="text-xs font-medium text-muted-foreground">Enabled</div>
            <div className="text-xs font-medium text-muted-foreground">Key</div>
            <div className="text-xs font-medium text-muted-foreground">Value</div>
            <div></div>
            
            {params.map((param, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center justify-center">
                  <Switch 
                    checked={param.enabled} 
                    onCheckedChange={(checked) => handleParamChange(index, 'enabled', checked)}
                  />
                </div>
                <Input
                  value={param.key}
                  onChange={(e) => handleParamChange(index, 'key', e.target.value)}
                  className="h-8 text-sm"
                  placeholder="param_name"
                  list="param-suggestions"
                />
                <Input
                  value={param.value}
                  onChange={(e) => handleParamChange(index, 'value', e.target.value)}
                  className="h-8 text-sm"
                  placeholder="value"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  disabled={params.length === 1 && !param.key && !param.value}
                  onClick={() => {
                    if (params.length > 1) {
                      setParams(params.filter((_, i) => i !== index));
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </React.Fragment>
            ))}
          </div>
          
          <datalist id="param-suggestions">
            {commonParams.map((param, index) => (
              <option key={index} value={param.key} />
            ))}
          </datalist>
        </TabsContent>
        
        <TabsContent value="headers" className="flex-1 p-3 overflow-auto">
          <div className="flex justify-between items-center mb-3">
            <div className="text-xs text-muted-foreground">Common headers:</div>
            <div className="flex flex-wrap gap-1 max-w-[500px]">
              {/* Show unique header keys only */}
              {Array.from(new Set(commonHeaders.map(h => h.key))).map((key, index) => (
                <button
                  key={index}
                  onClick={() => handleHeaderSuggestion(commonHeaders.find(h => h.key === key) || { key, value: "" })}
                  className="px-2 py-1 text-xs rounded bg-zinc-800 hover:bg-zinc-700 transition-colors"
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-2">
            <div className="text-xs font-medium text-muted-foreground">Enabled</div>
            <div className="text-xs font-medium text-muted-foreground">Key</div>
            <div className="text-xs font-medium text-muted-foreground">Value</div>
            <div></div>
            
            {headers.map((header, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center justify-center">
                  <Switch 
                    checked={header.enabled} 
                    onCheckedChange={(checked) => handleHeaderChange(index, 'enabled', checked)}
                  />
                </div>
                <Input
                  value={header.key}
                  onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                  className="h-8 text-sm"
                  placeholder="Content-Type"
                  list="header-key-suggestions"
                />
                <Input
                  value={header.value}
                  onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
                  className="h-8 text-sm"
                  placeholder="application/json"
                  list={`header-value-suggestions-${index}`}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  disabled={headers.length === 1 && !header.key && !header.value}
                  onClick={() => {
                    if (headers.length > 1) {
                      setHeaders(headers.filter((_, i) => i !== index));
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </React.Fragment>
            ))}
          </div>
          
          {/* Datalist for header keys */}
          <datalist id="header-key-suggestions">
            {Array.from(new Set(commonHeaders.map(h => h.key))).map((key, index) => (
              <option key={index} value={key} />
            ))}
          </datalist>
          
          {/* Datalists for header values based on current key */}
          {headers.map((header, index) => (
            <datalist key={index} id={`header-value-suggestions-${index}`}>
              {getHeaderValueSuggestions(header.key).map((value, valueIndex) => (
                <option key={valueIndex} value={value} />
              ))}
            </datalist>
          ))}
        </TabsContent>
        
        <TabsContent value="auth" className="flex-1 p-3 overflow-auto">
          <div className="mb-4">
            <Label className="text-xs font-medium mb-2 block">Authorization Type</Label>
            <Select value={authType} onValueChange={(value: any) => setAuthType(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select auth type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Auth</SelectItem>
                <SelectItem value="basic">Basic Auth</SelectItem>
                <SelectItem value="bearer">Bearer Token</SelectItem>
                <SelectItem value="apikey">API Key</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {authType === "basic" && (
            <div className="space-y-3">
              <div>
                <Label className="text-xs font-medium mb-1 block">Username</Label>
                <Input 
                  value={authParams.username || ""} 
                  onChange={(e) => setAuthParams({...authParams, username: e.target.value})}
                  className="h-8 text-sm"
                />
              </div>
              <div>
                <Label className="text-xs font-medium mb-1 block">Password</Label>
                <Input 
                  type="password"
                  value={authParams.password || ""} 
                  onChange={(e) => setAuthParams({...authParams, password: e.target.value})}
                  className="h-8 text-sm"
                />
              </div>
            </div>
          )}
          
          {authType === "bearer" && (
            <div>
              <Label className="text-xs font-medium mb-1 block">Token</Label>
              <Input 
                value={authParams.token || ""} 
                onChange={(e) => setAuthParams({...authParams, token: e.target.value})}
                className="h-8 text-sm"
                placeholder="Bearer token"
              />
            </div>
          )}
          
          {authType === "apikey" && (
            <div className="space-y-3">
              <div>
                <Label className="text-xs font-medium mb-1 block">Key</Label>
                <Input 
                  value={authParams.key || ""} 
                  onChange={(e) => setAuthParams({...authParams, key: e.target.value})}
                  className="h-8 text-sm"
                  placeholder="API Key name (e.g. X-API-Key)"
                />
              </div>
              <div>
                <Label className="text-xs font-medium mb-1 block">Value</Label>
                <Input 
                  value={authParams.value || ""} 
                  onChange={(e) => setAuthParams({...authParams, value: e.target.value})}
                  className="h-8 text-sm"
                  placeholder="API Key value"
                />
              </div>
              <div>
                <Label className="text-xs font-medium mb-1 block">Add to</Label>
                <Select 
                  value={authParams.addTo || "header"} 
                  onValueChange={(value: any) => setAuthParams({...authParams, addTo: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select where to add" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="header">Header</SelectItem>
                    <SelectItem value="query">Query Parameter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {authType === "none" && (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              <p>No authorization set for this request</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="body" className="flex-1 p-3 flex flex-col overflow-hidden">
          <div className="mb-3">
            <div className="flex items-center gap-4 mb-2">
              <Label className="text-xs font-medium">Body Type</Label>
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setBodyType("none")}
                  className={`px-2 py-1 rounded ${bodyType === "none" ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" : "hover:bg-accent/50"}`}
                >
                  None
                </button>
                <button
                  onClick={() => setBodyType("json")}
                  className={`px-2 py-1 rounded ${bodyType === "json" ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" : "hover:bg-accent/50"}`}
                >
                  JSON
                </button>
                <button
                  onClick={() => setBodyType("form-data")}
                  className={`px-2 py-1 rounded ${bodyType === "form-data" ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" : "hover:bg-accent/50"}`}
                >
                  Form Data
                </button>
                <button
                  onClick={() => setBodyType("x-www-form-urlencoded")}
                  className={`px-2 py-1 rounded ${bodyType === "x-www-form-urlencoded" ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" : "hover:bg-accent/50"}`}
                >
                  x-www-form-urlencoded
                </button>
              </div>
            </div>
          </div>
          
          {bodyType !== "none" && (
            <Textarea
              value={bodyContent}
              onChange={(e) => setBodyContent(e.target.value)}
              className="flex-1 min-h-0 font-mono text-sm resize-none"
              placeholder={bodyType === "json" ? '{\n  "key": "value"\n}' : "key=value&another=value"}
            />
          )}
          
          {bodyType === "none" && (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <p>No body for this request</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function getMethodColor(method: string): string {
  switch (method) {
    case "GET":
      return "#10b981"; // green-500
    case "POST":
      return "#3b82f6"; // blue-500
    case "PUT":
      return "#eab308"; // yellow-500
    case "DELETE":
      return "#ef4444"; // red-500
    case "PATCH":
      return "#8b5cf6"; // purple-500
    default:
      return "#6b7280"; // gray-500
  }
} 