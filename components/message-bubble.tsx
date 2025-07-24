"use client"

import { useState } from "react"
import type { Message } from "ai"
import { Copy, Check } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"

interface MessageBubbleProps {
  message: Message
  isAi: boolean
}

export default function MessageBubble({ message, isAi }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        "group flex animate-fade-in items-start gap-x-3 py-4 transition-all",
        isAi ? "justify-start" : "justify-end",
      )}
    >
      {isAi && (
        <div className="h-8 w-8 shrink-0 rounded-full overflow-hidden border shadow-sm">
          <img src="/images/paige-avatar.png" alt="Paige Avatar" className="w-full h-full object-cover" />
        </div>
      )}

      <div
        className={cn(
          "group relative max-w-[85%] rounded-lg px-3 py-2 text-sm shadow-md sm:max-w-[75%] md:max-w-[65%]",
          isAi ? "bg-white text-foreground" : "bg-purple-500 text-white",
        )}
      >
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline: _inline, className, children, ...props }: any) {
                const inline = typeof _inline === "boolean" ? _inline : false;
                const match = /language-(\w+)/.exec(className || "")
                return !inline && match ? (
                  <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" {...props}>
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>

        {isAi && (
          <button
            onClick={copyToClipboard}
            className="absolute -right-2 -top-2 hidden rounded-full bg-background p-1 shadow-sm transition-all hover:bg-muted group-hover:block"
            aria-label="Copy message"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
          </button>
        )}
      </div>

      {!isAi && (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-purple-100 text-purple-500 dark:bg-purple-900">
          <span className="text-sm font-medium">You</span>
        </div>
      )}
    </div>
  )
}

