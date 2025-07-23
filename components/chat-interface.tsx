"use client"

import { useState, useRef, useEffect } from "react"
import Header from "./header"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, User } from "lucide-react"
import { Loader2 } from "lucide-react"

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

export default function ChatInterface() {
  const [selectedModel, setSelectedModel] = useState("gpt-4")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleModelChange = (model: string) => {
    setSelectedModel(model)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input,
      id: Date.now().toString(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch response')
      }

      const data = await response.json()
      setMessages(prev => [...prev, data])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header selectedModel={selectedModel} onModelChange={handleModelChange} />

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-6">
                <img
                  src="/images/paige-avatar.png"
                  alt="Paige Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-3xl font-medium mb-3">Welcome to Paige</h2>
              <p className="text-muted-foreground max-w-md text-lg">
                Your modern AI assistant. Start a conversation by typing a message below.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex w-max max-w-[80%] items-start gap-3 rounded-lg px-4 py-2",
                  message.role === "user"
                    ? "ml-auto bg-purple-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800"
                )}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={message.role === "user" ? "/placeholder-user.jpg" : "/images/paige-avatar.png"}
                    alt={message.role === "user" ? "User" : "Paige"}
                  />
                  <AvatarFallback>
                    {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs text-muted-foreground">
                    {message.role === "user" ? "You" : "Paige"}
                  </span>
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-purple-500" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="min-h-[60px] w-full pr-12 resize-none"
              disabled={isLoading}
              rows={1}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 bottom-2 h-8 w-8 rounded-full bg-purple-500 hover:bg-purple-600"
              disabled={isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send, Shift+Enter for a new line
          </p>
        </div>
      </div>
    </>
  )
}

