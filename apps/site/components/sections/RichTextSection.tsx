interface RichTextSectionProps {
  data: {
    content?: string
    backgroundColor?: string
  }
}

export default function RichTextSection({ data }: RichTextSectionProps) {
  const { content, backgroundColor } = data

  return (
    <section 
      className="py-16"
      style={{ backgroundColor: backgroundColor || 'transparent' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content || '' }}
        />
      </div>
    </section>
  )
}
