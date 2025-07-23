"use client"

import type React from "react"

import { useState, useRef, type FormEvent, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SendHorizonal } from "lucide-react"
import { cn } from "@/lib/utils"

interface InputAreaProps {
  input: string
  handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  isLoading: boolean
}

export default function InputArea({ input, handleInputChange, handleSubmit, isLoading }: InputAreaProps) {
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (input.trim()) {
        const form = e.currentTarget.form
        if (form) form.requestSubmit()
      }
    }
  }

  return (
    <div className="border-t bg-background p-4">
      <div
        className={cn(
          "mx-auto max-w-3xl rounded-lg border bg-background transition-all",
          isFocused ? "ring-2 ring-purple-500 ring-offset-2" : "",
        )}
      >
        <form onSubmit={handleSubmit} className="flex items-end gap-2 p-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type your message..."
            className="min-h-12 max-h-36 resize-none border-0 p-2 focus-visible:ring-0 focus-visible:ring-offset-0"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="h-10 w-10 shrink-0 rounded-full bg-purple-500 text-white hover:bg-purple-600"
            disabled={isLoading || !input.trim()}
          >
            <SendHorizonal className="h-5 w-5" />
          </Button>
        </form>
      </div>
      <div className="mx-auto mt-2 max-w-3xl text-center text-xs text-muted-foreground">
        <p>Press Enter to send, Shift+Enter for a new line</p>
      </div>
    </div>
  )
}

