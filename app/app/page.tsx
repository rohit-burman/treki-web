"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { withAuth } from "@/lib/auth";
import Sidebar from "@/components/app/Sidebar";
import RequestEditor from "@/components/app/RequestEditor";
import ResponseViewer from "@/components/app/ResponseViewer";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

function AppPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("treki-token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <main className="flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
            <Sidebar />
        <ResizablePanelGroup direction="horizontal">
          {/* <ResizablePanel defaultSize={20} minSize={15} maxSize={30}> */}
          {/* </ResizablePanel> */}
          
          {/* <ResizableHandle withHandle /> */}
          
          <ResizablePanel minSize={15} defaultSize={40}>
            <RequestEditor />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel minSize={15} defaultSize={40}>
            <ResponseViewer />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}

export default withAuth(AppPage); 