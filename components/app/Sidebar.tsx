"use client";

import { useAppContext } from "@/lib/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ICollection, IRequest } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Sidebar() {
  const {
    collections,
    activeCollectionId,
    activeRequestId,
    addCollection,
    addRequest,
    toggleCollectionExpand,
    setActiveRequest,
  } = useAppContext();

  const [newCollectionName, setNewCollectionName] = useState("");
  const [isAddingCollection, setIsAddingCollection] = useState(false);

  const handleAddCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCollectionName.trim()) {
      addCollection(newCollectionName);
      setNewCollectionName("");
      setIsAddingCollection(false);
    }
  };

  const renderRequests = (requests: IRequest[], collectionId: string) => {
    return requests.map((request) => (
      <div
        key={request.id}
        className={`flex items-center px-2 py-1.5 rounded-md cursor-pointer text-sm group ${
          activeRequestId === request.id
            ? "bg-primary/10 text-primary"
            : "hover:bg-accent/50"
        }`}
        onClick={() => setActiveRequest(request.id)}
      >
        <div
          className={`min-w-8 w-max px-0.5 h-5 flex items-center justify-center rounded text-[10px] font-medium mr-2  ${getMethodColor(
            request.method
          )}`}
        >
          {request.method}
        </div>
        <span className="truncate flex-1">{request.name}</span>
      </div>
    ));
  };

  const renderCollections = (
    collections: ICollection[],
    parentId: string | null = null,
    level = 0
  ) => {
    const filteredCollections = collections.filter(
      (c) => c.parentId === parentId
    );

    return filteredCollections.map((collection) => (
      <div key={collection.id} className={`mb-1 ${level > 0 ? "ml-3" : ""}`}>
        <div
          className={`flex items-center justify-between py-1.5 px-2 rounded-md ${
            activeCollectionId === collection.id
              ? "bg-accent/50"
              : "hover:bg-accent/30"
          } cursor-pointer group`}
          onClick={() => toggleCollectionExpand(collection.id)}
        >
          <div className="flex items-center flex-1 min-w-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 mr-1.5 transition-transform ${
                collection.isExpanded ? "transform rotate-90" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1.5 text-orange-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
            <span className="truncate text-sm font-medium">
              {collection.name}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  addRequest(collection.id);
                }}
              >
                New Request
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  addCollection("New Collection", collection.id);
                }}
              >
                New Sub-Collection
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {collection.isExpanded && (
          <div className="mt-1 pl-4">
            {collection.requests.length > 0 &&
              renderRequests(collection.requests, collection.id)}
            {renderCollections(collections, collection.id, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="w-72 h-full border-r border-border flex flex-col bg-card/50">
      <div className="p-3 border-b border-border">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 bg-background"
          onClick={() => setIsAddingCollection(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          New Collection
        </Button>

        {isAddingCollection && (
          <form onSubmit={handleAddCollection} className="mt-2">
            <div className="flex items-center gap-2">
              <Input
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Collection name"
                autoFocus
                className="h-8"
              />
              <Button
                type="submit"
                size="sm"
                className="h-8 px-2 text-xs bg-orange-500 hover:bg-orange-600 text-white"
              >
                Add
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-8 px-2 text-xs"
                onClick={() => setIsAddingCollection(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>

      <ScrollArea className="flex-1 p-2 overflow-auto">
        {collections.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full opacity-70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-muted-foreground mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-sm text-muted-foreground text-center">
              No collections yet. Create one to get started.
            </p>
          </div>
        ) : (
          renderCollections(collections)
        )}
      </ScrollArea>
    </div>
  );
}

function getMethodColor(method: string) {
  switch (method) {
    case "GET":
      return "bg-green-500/10 text-green-500 border border-green-500/20";
    case "POST":
      return "bg-blue-500/10 text-blue-500 border border-blue-500/20";
    case "PUT":
      return "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20";
    case "DELETE":
      return "bg-red-500/10 text-red-500 border border-red-500/20";
    case "PATCH":
      return "bg-purple-500/10 text-purple-500 border border-purple-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 border border-gray-500/20";
  }
} 