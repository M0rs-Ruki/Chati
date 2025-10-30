import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import ShareButtons from "./share-buttons";

type ApiPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover: { url?: string } | null;
  category: { name?: string } | null;
  author: { id: string; name: string; email: string };
  createdAt: string;
  publishedAt?: string;
  readTime?: string;
};

async function getAllPosts(): Promise<ApiPost[]> {
  const base = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${base}/api/public/blog`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = (await res.json()) as { posts: ApiPost[] };
  return data.posts ?? [];
}

async function getPostByIdOrSlug(idOrSlug: string): Promise<ApiPost | null> {
  const posts = await getAllPosts();
  return (
    posts.find((p) => p.id === idOrSlug) ||
    posts.find((p) => p.slug === idOrSlug) ||
    null
  );
}

// Note the Promise type for params + await usage
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params; // await required in Next 15/16
  const post = await getPostByIdOrSlug(id);
  if (!post) return { title: "Blog Post Not Found" };
  return {
    title: `${post.title} - Chati AI Blog`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: "article",
      images: post.cover?.url ? [{ url: post.cover.url }] : undefined,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostByIdOrSlug(id);

  if (!post) {
    return (
      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </main>
    );
  }

  const dateStr = post.publishedAt ?? post.createdAt;

  return (
    <main>
      {/* UI unchanged below */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all mb-6"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
          <div className="max-w-3xl">
            <div className="inline-block mb-4 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {post.category?.name || "General"}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User size={16} />
                {post.author?.name || "Unknown"}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {new Date(dateStr).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              {post.readTime ? <span>{post.readTime}</span> : null}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden bg-muted">
            <img
              src={post.cover?.url || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <article className="prose prose-invert max-w-none">
                <div
                  className="text-lg text-muted-foreground leading-relaxed space-y-6"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>

              <div className="mt-12 pt-8 border-t border-border">
                <ShareButtons title={post.title} />
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-primary text-primary-foreground rounded-lg p-8 sticky top-24">
                <h3 className="text-xl font-bold mb-3">
                  Ready to Transform Your Marketing?
                </h3>
                <p className="mb-6 opacity-90">
                  Start using Chati AI today and see the difference WhatsApp
                  marketing can make.
                </p>
                <Button variant="secondary" className="w-full" asChild>
                  <Link href="/contact">Get Started Free</Link>
                </Button>
              </div>

              <RelatedPosts currentId={post.id} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using Chati AI to drive growth
            through WhatsApp marketing.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

async function RelatedPosts({ currentId }: { currentId: string }) {
  const posts = await getAllPosts();
  const others = posts.filter((p) => p.id !== currentId).slice(0, 3);
  return (
    <div className="mt-8 bg-card border border-border rounded-lg p-6">
      <h4 className="font-bold mb-4">More Articles</h4>
      <div className="space-y-3">
        {others.map((related) => (
          <Link
            key={related.id}
            href={`/blog/${related.slug || related.id}`}
            className="block text-sm hover:text-primary transition-colors line-clamp-2"
          >
            {related.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
