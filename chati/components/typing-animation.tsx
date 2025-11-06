"use client"

import { useEffect, useState } from "react"

interface TypingAnimationProps {
  words: string[]
  className?: string
}

export function TypingAnimation({ words, className = "" }: TypingAnimationProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentWord = words[currentWordIndex]
    const typingSpeed = isDeleting ? 50 : 100
    const pauseDuration = 2000

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseDuration)
      return () => clearTimeout(pauseTimer)
    }

    if (!isDeleting && currentText === currentWord) {
      setIsPaused(true)
      return
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false)
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
      return
    }

    const timer = setTimeout(() => {
      setCurrentText((prev) => {
        if (isDeleting) {
          return currentWord.substring(0, prev.length - 1)
        } else {
          return currentWord.substring(0, prev.length + 1)
        }
      })
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, isPaused, currentWordIndex, words])

  return (
    <span className={`inline-flex min-h-[1.2em] items-center ${className}`}>
      <span className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-400 bg-clip-text font-bold text-transparent">
        {currentText}
        <span className="animate-pulse">|</span>
      </span>
    </span>
  )
}
