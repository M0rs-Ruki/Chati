"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  GripVertical,
  Trash2,
  Type,
  ImageIcon,
  Square,
  LayoutGrid,
  HelpCircle,
  Minus,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

interface Component {
  id: string
  type: string
  data: any
}

interface PageBuilderProps {
  content: Component[]
  onChange: (content: Component[]) => void
}

export default function PageBuilder({ content, onChange }: PageBuilderProps) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)

  const componentTypes = [
    { type: "hero", label: "Hero Section", icon: Square },
    { type: "heading", label: "Heading", icon: Type },
    { type: "paragraph", label: "Paragraph", icon: Type },
    { type: "button", label: "Button", icon: Square },
    { type: "image", label: "Image", icon: ImageIcon },
    { type: "text-image", label: "Text + Image", icon: LayoutGrid },
    { type: "feature-cards", label: "Feature Cards", icon: LayoutGrid },
    { type: "faq", label: "FAQ Section", icon: HelpCircle },
    { type: "divider", label: "Divider", icon: Minus },
  ]

  const addComponent = (type: string) => {
    const newComponent: Component = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      data: getDefaultData(type),
    }
    onChange([...content, newComponent])
    setSelectedComponent(newComponent.id)
  }

  const getDefaultData = (type: string) => {
    switch (type) {
      case "hero":
        return {
          title: "Hero Title",
          subtitle: "Hero subtitle text",
          buttonText: "Get Started",
          buttonLink: "#",
        }
      case "heading":
        return { text: "Heading Text", level: "h2" }
      case "paragraph":
        return { text: "Paragraph text goes here..." }
      case "button":
        return { text: "Click Me", link: "#", variant: "primary" }
      case "image":
        return { src: "/placeholder.svg?height=400&width=800", alt: "Image" }
      case "text-image":
        return {
          title: "Text + Image Section",
          text: "Description text",
          imageSrc: "/placeholder.svg?height=400&width=600",
          imagePosition: "right",
        }
      case "feature-cards":
        return {
          title: "Features",
          cards: [
            { title: "Feature 1", description: "Description 1" },
            { title: "Feature 2", description: "Description 2" },
            { title: "Feature 3", description: "Description 3" },
          ],
        }
      case "faq":
        return {
          title: "Frequently Asked Questions",
          items: [
            { question: "Question 1?", answer: "Answer 1" },
            { question: "Question 2?", answer: "Answer 2" },
          ],
        }
      case "divider":
        return { style: "solid" }
      default:
        return {}
    }
  }

  const updateComponent = (id: string, data: any) => {
    onChange(content.map((comp) => (comp.id === id ? { ...comp, data } : comp)))
  }

  const deleteComponent = (id: string) => {
    onChange(content.filter((comp) => comp.id !== id))
    if (selectedComponent === id) {
      setSelectedComponent(null)
    }
  }

  const moveComponent = (index: number, direction: "up" | "down") => {
    const newContent = [...content]
    const newIndex = direction === "up" ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= newContent.length) return
    ;[newContent[index], newContent[newIndex]] = [newContent[newIndex], newContent[index]]
    onChange(newContent)
  }

  const renderComponentEditor = (component: Component) => {
    switch (component.type) {
      case "hero":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={component.data.title}
                onChange={(e) =>
                  updateComponent(component.id, {
                    ...component.data,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Input
                value={component.data.subtitle}
                onChange={(e) =>
                  updateComponent(component.id, {
                    ...component.data,
                    subtitle: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Button Text</Label>
              <Input
                value={component.data.buttonText}
                onChange={(e) =>
                  updateComponent(component.id, {
                    ...component.data,
                    buttonText: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Button Link</Label>
              <Input
                value={component.data.buttonLink}
                onChange={(e) =>
                  updateComponent(component.id, {
                    ...component.data,
                    buttonLink: e.target.value,
                  })
                }
              />
            </div>
          </div>
        )
      case "heading":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Text</Label>
              <Input
                value={component.data.text}
                onChange={(e) =>
                  updateComponent(component.id, {
                    ...component.data,
                    text: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Level</Label>
              <select
                className="w-full px-3 py-2 rounded-md border border-input bg-background"
                value={component.data.level}
                onChange={(e) =>
                  updateComponent(component.id, {
                    ...component.data,
                    level: e.target.value,
                  })
                }
              >
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
                <option value="h5">H5</option>
                <option value="h6">H6</option>
              </select>
            </div>
          </div>
        )
      case "paragraph":
        return (
          <div className="space-y-2">
            <Label>Text</Label>
            <Textarea
              value={component.data.text}
              onChange={(e) =>
                updateComponent(component.id, {
                  ...component.data,
                  text: e.target.value,
                })
              }
              rows={4}
            />
          </div>
        )
      case "button":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Text</Label>
              <Input
                value={component.data.text}
                onChange={(e) =>
                  updateComponent(component.id, {
                    ...component.data,
                    text: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Link</Label>
              <Input
                value={component.data.link}
                onChange={(e) =>
                  updateComponent(component.id, {
                    ...component.data,
                    link: e.target.value,
                  })
                }
              />
            </div>
          </div>
        )
      case "image":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input
                value={component.data.src}
                onChange={(e) =>
                  updateComponent(component.id, {
                    ...component.data,
                    src: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Alt Text</Label>
              <Input
                value={component.data.alt}
                onChange={(e) =>
                  updateComponent(component.id, {
                    ...component.data,
                    alt: e.target.value,
                  })
                }
              />
            </div>
          </div>
        )
      default:
        return <div className="text-muted-foreground">No editor available</div>
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Component Palette */}
      <div className="lg:col-span-1">
        <Card className="bg-secondary border-border">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4 text-foreground">Components</h3>
            <div className="space-y-2">
              {componentTypes.map((comp) => {
                const Icon = comp.icon
                return (
                  <Button
                    key={comp.type}
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => addComponent(comp.type)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {comp.label}
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Canvas */}
      <div className="lg:col-span-2 space-y-4">
        {content.length === 0 ? (
          <Card className="bg-secondary border-border border-dashed">
            <CardContent className="py-12 text-center">
              <Plus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Add components from the left to start building your page</p>
            </CardContent>
          </Card>
        ) : (
          content.map((component, index) => (
            <Card
              key={component.id}
              className={`bg-card border-border cursor-pointer transition-colors ${
                selectedComponent === component.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedComponent(component.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <GripVertical className="h-5 w-5 text-muted-foreground mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-sm text-foreground capitalize">
                        {component.type.replace("-", " ")}
                      </span>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation()
                            moveComponent(index, "up")
                          }}
                          disabled={index === 0}
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation()
                            moveComponent(index, "down")
                          }}
                          disabled={index === content.length - 1}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteComponent(component.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    {selectedComponent === component.id && (
                      <div className="mt-4 pt-4 border-t border-border">{renderComponentEditor(component)}</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
