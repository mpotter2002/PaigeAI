"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun, Settings, ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 focus:outline-none"
            onClick={() => { window.location.href = '/' }}
            aria-label="Go to home and reset chat"
            type="button"
          >
            <Image
              src="/images/paige-avatar.png"
              alt="Paige Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-semibold">Paige</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="px-4 py-2 rounded bg-muted text-sm font-medium">GPT-4</span>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Link href="/settings">
            <Button variant="ghost" size="icon" aria-label="Settings">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

