import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Calendar, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Chati AI Blog - WhatsApp Marketing Tips & Insights",
  description:
    "Read the latest articles on WhatsApp marketing, customer engagement strategies, and business automation tips from Chati AI experts.",
  openGraph: {
    title: "Chati AI Blog",
    description:
      "Latest insights on WhatsApp marketing and customer engagement.",
    type: "website",
  },
};

type ApiPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover: { url?: string } | null;
  category: { name?: string } | null;
  tags: { name?: string }[];
  author: { id: string; name: string; email: string };
  createdAt: string;
  publishedAt?: string;
};

async function getPosts(): Promise<ApiPost[]> {
  const base = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${base}/api/public/blog`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = (await res.json()) as { posts: ApiPost[] };
  return data.posts ?? [];
}

export default async function Blog() {
  const posts = await getPosts();

  return (
    <main>
      {/* Hero Section (unchanged) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Chati AI <span className="text-primary">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Expert insights, tips, and strategies for WhatsApp marketing
              success
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid (maps real posts) */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              const href = `/blog/${post.slug || post.id}`;
              const dateStr = post.publishedAt ?? post.createdAt;
              return (
                <Link key={post.id} href={href}>
                  <article className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <img
                        src={post.cover?.url || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        {post.category?.name || "General"}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2 flex-grow">
                        {post.excerpt}
                      </p>

                      <div className="space-y-3 border-t border-border pt-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            {new Date(dateStr).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User size={16} />
                          {post.author?.name || "Unknown"}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
                        Read More <ArrowRight size={16} />
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
