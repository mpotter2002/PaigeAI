"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"

export default function Settings() {
  const router = useRouter()
  const [settings, setSettings] = useState({
    autoScroll: true,
    messageSound: true,
    fontSize: 16,
    defaultModel: "gpt-4",
    codeHighlighting: true,
    markdownRendering: true,
  })

  const handleSwitchChange = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }))
  }

  const handleSliderChange = (value: number[]) => {
    setSettings((prev) => ({
      ...prev,
      fontSize: value[0],
    }))
  }

  const handleSelectChange = (value: string) => {
    setSettings((prev) => ({
      ...prev,
      defaultModel: value,
    }))
  }

  return (
    <div className="container max-w-4xl py-10">
      <Button variant="ghost" className="mb-6 flex items-center gap-2" onClick={() => router.push("/")}>
        <ArrowLeft className="h-4 w-4" />
        Back to Chat
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Settings</CardTitle>
          <CardDescription>Customize your Paige experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Interface</h3>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-scroll">Auto-scroll to new messages</Label>
                <Switch
                  id="auto-scroll"
                  checked={settings.autoScroll}
                  onCheckedChange={() => handleSwitchChange("autoScroll")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="message-sound">Message notification sound</Label>
                <Switch
                  id="message-sound"
                  checked={settings.messageSound}
                  onCheckedChange={() => handleSwitchChange("messageSound")}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="font-size">Font Size: {settings.fontSize}px</Label>
                </div>
                <Slider
                  id="font-size"
                  min={12}
                  max={24}
                  step={1}
                  value={[settings.fontSize]}
                  onValueChange={handleSliderChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">AI Models</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="default-model">Default AI Model</Label>
                <Select value={settings.defaultModel} onValueChange={handleSelectChange}>
                  <SelectTrigger id="default-model">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="claude">Claude</SelectItem>
                    <SelectItem value="llama">Llama</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Content Display</h3>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="code-highlighting">Code syntax highlighting</Label>
                <Switch
                  id="code-highlighting"
                  checked={settings.codeHighlighting}
                  onCheckedChange={() => handleSwitchChange("codeHighlighting")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="markdown-rendering">Markdown rendering</Label>
                <Switch
                  id="markdown-rendering"
                  checked={settings.markdownRendering}
                  onCheckedChange={() => handleSwitchChange("markdownRendering")}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

