"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Bold,
  Italic,
  Underline,
  Link2,
  ImageIcon,
  Code,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Minus,
  Eye,
  X,
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  theme: "dark" | "light"
}

export function RichTextEditor({ value, onChange, theme }: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imageAlt, setImageAlt] = useState("")
  const [showPreview, setShowPreview] = useState(false)

  const insertText = (before: string, after = "") => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)

    onChange(newText)

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  const formatBold = () => insertText("**", "**")
  const formatItalic = () => insertText("*", "*")
  const formatUnderline = () => insertText("<u>", "</u>")
  const formatH1 = () => insertText("# ", "")
  const formatH2 = () => insertText("## ", "")
  const formatH3 = () => insertText("### ", "")
  const formatCode = () => insertText("`", "`")
  const formatCodeBlock = () => insertText("```\n", "\n```")
  const formatList = () => insertText("- ", "")
  const formatOrderedList = () => insertText("1. ", "")
  const formatQuote = () => insertText("> ", "")
  const formatDivider = () => insertText("\n---\n", "")

  const insertLink = () => {
    if (linkUrl) {
      const markdown = `[${linkText || linkUrl}](${linkUrl})`
      const textarea = textareaRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const newText = value.substring(0, start) + markdown + value.substring(start)
      onChange(newText)

      setShowLinkDialog(false)
      setLinkUrl("")
      setLinkText("")
    }
  }

  const insertImage = () => {
    if (imageUrl) {
      const markdown = `![${imageAlt || "Image"}](${imageUrl})`
      const textarea = textareaRef.current
      if (!textarea) return

      const start = textarea.selectionStart
      const newText = value.substring(0, start) + markdown + value.substring(start)
      onChange(newText)

      setShowImageDialog(false)
      setImageUrl("")
      setImageAlt("")
    }
  }

  const renderPreview = () => {
    // Simple markdown rendering for preview
    const html = value
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-10 mb-5">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Underline
      .replace(/<u>(.*?)<\/u>/g, "<u>$1</u>")
      // Code inline
      .replace(/`([^`]+)`/g, '<code class="bg-zinc-800 px-2 py-1 rounded text-sm font-mono text-green-400">$1</code>')
      // Code block
      .replace(
        /```\n([\s\S]*?)\n```/g,
        '<pre class="bg-zinc-900 p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm font-mono text-green-400">$1</code></pre>',
      )
      // Links
      .replace(
        /\[([^\]]+)\]$$([^)]+)$$/g,
        '<a href="$2" class="text-green-500 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>',
      )
      // Images
      .replace(/!\[([^\]]*)\]$$([^)]+)$$/g, '<img src="$2" alt="$1" class="max-w-full rounded-lg my-4" />')
      // Lists
      .replace(/^- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 list-decimal">$1</li>')
      // Quote
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-green-500 pl-4 italic my-4">$1</blockquote>')
      // Divider
      .replace(/^---$/gim, '<hr class="my-8 border-zinc-700" />')
      // Paragraphs
      .replace(/\n\n/g, '</p><p class="mb-4">')

    return `<div class="prose prose-invert max-w-none"><p class="mb-4">${html}</p></div>`
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div
        className={`flex flex-wrap items-center gap-1 p-2 rounded-lg border ${
          theme === "dark" ? "bg-zinc-900 border-zinc-700" : "bg-gray-50 border-gray-200"
        }`}
      >
        <Button type="button" size="sm" variant="ghost" onClick={formatBold} title="Bold" className="h-8 w-8 p-0">
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={formatItalic} title="Italic" className="h-8 w-8 p-0">
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={formatUnderline}
          title="Underline"
          className="h-8 w-8 p-0"
        >
          <Underline className="h-4 w-4" />
        </Button>

        <div className={`w-px h-6 mx-1 ${theme === "dark" ? "bg-zinc-700" : "bg-gray-300"}`} />

        <Button type="button" size="sm" variant="ghost" onClick={formatH1} title="Heading 1" className="h-8 w-8 p-0">
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={formatH2} title="Heading 2" className="h-8 w-8 p-0">
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={formatH3} title="Heading 3" className="h-8 w-8 p-0">
          <Heading3 className="h-4 w-4" />
        </Button>

        <div className={`w-px h-6 mx-1 ${theme === "dark" ? "bg-zinc-700" : "bg-gray-300"}`} />

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => setShowLinkDialog(true)}
          title="Insert Link"
          className="h-8 w-8 p-0"
        >
          <Link2 className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => setShowImageDialog(true)}
          title="Insert Image"
          className="h-8 w-8 p-0"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>

        <div className={`w-px h-6 mx-1 ${theme === "dark" ? "bg-zinc-700" : "bg-gray-300"}`} />

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={formatCode}
          title="Inline Code"
          className="h-8 w-8 p-0"
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={formatList}
          title="Bullet List"
          className="h-8 w-8 p-0"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={formatOrderedList}
          title="Numbered List"
          className="h-8 w-8 p-0"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={formatQuote} title="Quote" className="h-8 w-8 p-0">
          <Quote className="h-4 w-4" />
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={formatDivider} title="Divider" className="h-8 w-8 p-0">
          <Minus className="h-4 w-4" />
        </Button>

        <div className="flex-1" />

        <Button
          type="button"
          size="sm"
          variant={showPreview ? "default" : "ghost"}
          onClick={() => setShowPreview(!showPreview)}
          className={showPreview ? "bg-green-500 hover:bg-green-600 text-white" : ""}
        >
          {showPreview ? <X className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
          {showPreview ? "Edit" : "Preview"}
        </Button>
      </div>

      {/* Editor/Preview */}
      {!showPreview ? (
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Start typing, or press '/' for commands..."
          rows={30}
          className={`font-mono text-sm ${
            theme === "dark"
              ? "bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
              : "bg-white border-gray-200"
          }`}
        />
      ) : (
        <div
          className={`min-h-[500px] p-6 rounded-lg border ${
            theme === "dark" ? "bg-zinc-900 border-zinc-700 text-white" : "bg-white border-gray-200"
          }`}
          dangerouslySetInnerHTML={{ __html: renderPreview() }}
        />
      )}

      {/* Link Dialog */}
      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent className={theme === "dark" ? "bg-zinc-900 border-zinc-700 text-white" : ""}>
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Link Text</Label>
              <Input
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Enter link text"
                className={theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label>URL</Label>
              <Input
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className={theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : ""}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLinkDialog(false)}>
              Cancel
            </Button>
            <Button onClick={insertLink} className="bg-green-500 hover:bg-green-600 text-white">
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className={theme === "dark" ? "bg-zinc-900 border-zinc-700 text-white" : ""}>
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className={theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label>Alt Text</Label>
              <Input
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Describe the image"
                className={theme === "dark" ? "bg-zinc-800 border-zinc-700 text-white" : ""}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImageDialog(false)}>
              Cancel
            </Button>
            <Button onClick={insertImage} className="bg-green-500 hover:bg-green-600 text-white">
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
