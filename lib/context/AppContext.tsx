"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ICollection, IRequest, IResponse, IUser } from "../types";
import { toast } from "sonner";

interface AppContextType {
  collections: ICollection[];
  activeCollectionId: string | null;
  activeRequestId: string | null;
  currentRequest: IRequest | null;
  currentResponse: IResponse | null;
  isLoading: boolean;
  user: IUser | null;
  
  addCollection: (name: string, parentId?: string) => void;
  updateCollection: (id: string, data: Partial<ICollection>) => void;
  deleteCollection: (id: string) => void;
  setActiveCollection: (id: string | null) => void;
  
  addRequest: (collectionId: string, request?: Partial<IRequest>) => void;
  updateRequest: (id: string, data: Partial<IRequest>) => void;
  deleteRequest: (id: string) => void;
  setActiveRequest: (id: string | null) => void;
  
  executeRequest: () => Promise<void>;
  toggleCollectionExpand: (id: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);
  const [activeRequestId, setActiveRequestId] = useState<string | null>(null);
  const [currentRequest, setCurrentRequest] = useState<IRequest | null>(null);
  const [currentResponse, setCurrentResponse] = useState<IResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  // Initialize with a default collection
  useEffect(() => {
    const initialCollection: ICollection = {
      id: uuidv4(),
      name: "My Collection",
      requests: [],
      isExpanded: true,
    };
    
    // Check localStorage or fetch from API
    const storedCollections = localStorage.getItem('treki-collections');
    
    if (storedCollections) {
      try {
        const parsedCollections = JSON.parse(storedCollections);
        setCollections(parsedCollections);
        
        // Set active collection to the first one if it exists
        if (parsedCollections.length > 0) {
          setActiveCollectionId(parsedCollections[0].id);
          
          // Set active request to the first one if it exists
          if (parsedCollections[0].requests.length > 0) {
            const firstRequest = parsedCollections[0].requests[0];
            setActiveRequestId(firstRequest.id);
            setCurrentRequest(firstRequest);
          }
        }
      } catch (error) {
        console.error("Error parsing stored collections:", error);
        setCollections([initialCollection]);
        setActiveCollectionId(initialCollection.id);
      }
    } else {
      setCollections([initialCollection]);
      setActiveCollectionId(initialCollection.id);
    }
    
    // Check for user token
    const token = localStorage.getItem('treki-token');
    if (token) {
      // Fetch user data or decode JWT
      // For now, we'll just set a placeholder user
      setUser({
        id: '1',
        username: 'user',
        email: 'user@example.com',
      });
    }
  }, []);

  // Save collections to localStorage whenever they change
  useEffect(() => {
    if (collections.length > 0) {
      localStorage.setItem('treki-collections', JSON.stringify(collections));
    }
  }, [collections]);

  // Update currentRequest when activeRequestId changes
  useEffect(() => {
    if (activeRequestId) {
      for (const collection of collections) {
        const request = collection.requests.find(r => r.id === activeRequestId);
        if (request) {
          setCurrentRequest(request);
          break;
        }
      }
    } else {
      setCurrentRequest(null);
    }
  }, [activeRequestId, collections]);

  const addCollection = (name: string, parentId?: string) => {
    const newCollection: ICollection = {
      id: uuidv4(),
      name,
      requests: [],
      parentId: parentId || null,
      isExpanded: true,
    };
    
    setCollections(prev => [...prev, newCollection]);
    setActiveCollectionId(newCollection.id);
  };

  const updateCollection = (id: string, data: Partial<ICollection>) => {
    setCollections(prev => 
      prev.map(collection => 
        collection.id === id ? { ...collection, ...data } : collection
      )
    );
  };

  const deleteCollection = (id: string) => {
    setCollections(prev => prev.filter(collection => collection.id !== id));
    
    if (activeCollectionId === id) {
      setActiveCollectionId(collections.length > 1 ? collections[0].id : null);
      setActiveRequestId(null);
    }
  };

  const setActiveCollection = (id: string | null) => {
    setActiveCollectionId(id);
    
    // If a collection is selected, set the first request as active
    if (id) {
      const collection = collections.find(c => c.id === id);
      if (collection && collection.requests.length > 0) {
        setActiveRequestId(collection.requests[0].id);
        setCurrentRequest(collection.requests[0]);
      } else {
        setActiveRequestId(null);
        setCurrentRequest(null);
      }
    } else {
      setActiveRequestId(null);
      setCurrentRequest(null);
    }
  };

  const addRequest = (collectionId: string, requestData?: Partial<IRequest>) => {
    const newRequest: IRequest = {
      id: uuidv4(),
      name: requestData?.name || "New Request",
      method: requestData?.method || "GET",
      url: requestData?.url || "https://api.example.com",
      headers: requestData?.headers || [],
      params: requestData?.params || [],
      body: requestData?.body || {
        type: "none",
        content: "",
      },
      collectionId,
    };
    
    setCollections(prev => 
      prev.map(collection => 
        collection.id === collectionId 
          ? { ...collection, requests: [...collection.requests, newRequest] } 
          : collection
      )
    );
    
    setActiveRequestId(newRequest.id);
    setCurrentRequest(newRequest);
  };

  const updateRequest = (id: string, data: Partial<IRequest>) => {
    let updatedRequest: IRequest | null = null;
    
    setCollections(prev => 
      prev.map(collection => {
        const updatedRequests = collection.requests.map(request => {
          if (request.id === id) {
            updatedRequest = { ...request, ...data };
            return updatedRequest;
          }
          return request;
        });
        
        return { ...collection, requests: updatedRequests };
      })
    );
    
    if (activeRequestId === id && updatedRequest) {
      setCurrentRequest(updatedRequest);
    }
  };

  const deleteRequest = (id: string) => {
    setCollections(prev => 
      prev.map(collection => ({
        ...collection,
        requests: collection.requests.filter(request => request.id !== id)
      }))
    );
    
    if (activeRequestId === id) {
      // Find the collection that had this request
      const collection = collections.find(c => 
        c.requests.some(r => r.id === id)
      );
      
      if (collection && collection.requests.length > 1) {
        // If there are other requests, set the first one as active
        const otherRequests = collection.requests.filter(r => r.id !== id);
        setActiveRequestId(otherRequests[0].id);
        setCurrentRequest(otherRequests[0]);
      } else {
        setActiveRequestId(null);
        setCurrentRequest(null);
      }
    }
  };

  const setActiveRequest = (id: string | null) => {
    setActiveRequestId(id);
    
    if (id) {
      // Find the request in all collections
      for (const collection of collections) {
        const request = collection.requests.find(r => r.id === id);
        if (request) {
          setCurrentRequest(request);
          setActiveCollectionId(collection.id);
          break;
        }
      }
    } else {
      setCurrentRequest(null);
    }
  };

  const executeRequest = async () => {
    if (!currentRequest) {
      toast.error("No request selected");
      return;
    }
    
    setIsLoading(true);
    setCurrentResponse(null);
    
    try {
      // Prepare URL with query parameters
      let url = currentRequest.url;
      const enabledParams = currentRequest.params.filter(p => p.enabled);
      
      if (enabledParams.length > 0) {
        const queryString = enabledParams
          .map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`)
          .join('&');
        
        url += url.includes('?') ? `&${queryString}` : `?${queryString}`;
      }
      
      // Prepare headers
      const headers: Record<string, string> = {};
      currentRequest.headers
        .filter(h => h.enabled)
        .forEach(h => {
          headers[h.key] = h.value;
        });
      
      // Handle authentication
      if (currentRequest.auth && currentRequest.auth.type !== 'none') {
        switch (currentRequest.auth.type) {
          case 'basic':
            if (currentRequest.auth.params.username && currentRequest.auth.params.password) {
              const credentials = btoa(`${currentRequest.auth.params.username}:${currentRequest.auth.params.password}`);
              headers['Authorization'] = `Basic ${credentials}`;
            }
            break;
            
          case 'bearer':
            if (currentRequest.auth.params.token) {
              headers['Authorization'] = `Bearer ${currentRequest.auth.params.token}`;
            }
            break;
            
          case 'apikey':
            if (currentRequest.auth.params.key && currentRequest.auth.params.value) {
              if (currentRequest.auth.params.addTo === 'header') {
                headers[currentRequest.auth.params.key] = currentRequest.auth.params.value;
              } else if (currentRequest.auth.params.addTo === 'query') {
                // Add API key to query parameters
                const queryParam = `${encodeURIComponent(currentRequest.auth.params.key)}=${encodeURIComponent(currentRequest.auth.params.value)}`;
                url += url.includes('?') ? `&${queryParam}` : `?${queryParam}`;
              }
            }
            break;
        }
      }
      
      // Prepare request options
      const options: RequestInit = {
        method: currentRequest.method,
        headers,
      };
      
      // Add body for non-GET requests
      if (currentRequest.method !== 'GET' && currentRequest.body.type !== 'none') {
        if (currentRequest.body.type === 'json') {
          options.body = currentRequest.body.content;
        } else if (currentRequest.body.type === 'x-www-form-urlencoded') {
          options.body = currentRequest.body.content;
        } else if (currentRequest.body.type === 'form-data') {
          // Handle form data (would normally use FormData but this is simplified)
          options.body = currentRequest.body.content;
        }
      }
      
      // Record start time
      const startTime = performance.now();
      
      // Execute request
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "api/requests/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('treki-token')}`,
        },
        body: JSON.stringify({
          method: currentRequest.method,
          url,
          headers,
          body: options.body,
          requestId: currentRequest.id
        }),
      });
      
      // Record end time
      const endTime = performance.now();
      const requestTime = `${(endTime - startTime).toFixed(2)}ms`;
      
      // Parse response
      const data = await response.json();
      
      // Create response object
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });
      
      setCurrentResponse({
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        data,
        time: requestTime,
      });
      
      toast.success(`Request completed in ${requestTime}`);
    } catch (error: any) {
      toast.error(error.message || "Request failed");
      
      setCurrentResponse({
        status: 0,
        statusText: "Error",
        headers: {},
        data: { error: error.message || "Request failed" },
        time: "0ms",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCollectionExpand = (id: string) => {
    setCollections(prev => 
      prev.map(collection => 
        collection.id === id 
          ? { ...collection, isExpanded: !collection.isExpanded } 
          : collection
      )
    );
  };

  const logout = () => {
    localStorage.removeItem('treki-token');
    setUser(null);
    // Redirect to login page would be handled by a protected route wrapper
  };

  const value = {
    collections,
    activeCollectionId,
    activeRequestId,
    currentRequest,
    currentResponse,
    isLoading,
    user,
    
    addCollection,
    updateCollection,
    deleteCollection,
    setActiveCollection,
    
    addRequest,
    updateRequest,
    deleteRequest,
    setActiveRequest,
    
    executeRequest,
    toggleCollectionExpand,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}; 