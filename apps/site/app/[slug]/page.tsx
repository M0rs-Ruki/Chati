import { api } from "@/lib/api";
import SectionRenderer from "@/components/sections/SectionRenderer";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getTheme() {
  try {
    const theme = await api.getTheme();
    return theme || null;
  } catch {
    return null;
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;

  const [data, theme] = await Promise.all([api.getPage(slug), getTheme()]);

  if (!data || !data.page) {
    notFound();
  }

  const page = data.page;
  const primaryColor = theme?.primaryColor || "#ffffffff";
  const secondaryColor = theme?.secondaryColor || "#000000ff";

  return (
    <article>
      {page.sections && page.sections.length > 0 ? (
        <SectionRenderer sections={page.sections} theme={theme} />
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: secondaryColor }}
          >
            {page.title}
          </h1>
          {page.description && (
            <p className="text-xl text-gray-600">{page.description}</p>
          )}
        </div>
      )}
    </article>
  );
}
