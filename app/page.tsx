import { Suspense } from "react"
import ChatInterface from "@/components/chat-interface"
import { Loader2 } from "lucide-react"

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
          </div>
        }
      >
        <ChatInterface />
      </Suspense>
    </main>
  )
}

