// app/blog/[id]/share-buttons.tsx
"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("")
  useEffect(() => {
    setUrl(window.location.href)
  }, [])
  return (
    <div className="flex items-center gap-4">
      <span className="font-medium">Share this article:</span>
      <div className="flex gap-3">
        <Button variant="outline" size="sm" asChild>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </Button>
      </div>
    </div>
  )
}
