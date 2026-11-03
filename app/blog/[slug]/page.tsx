import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import PostBody from "@/components/blog/PostBody";
import { MapHero, Route } from "@/components/network/parts";
import { posts } from "@/data/blog/posts";
import { formatPostDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Blog | Abrar Mahir Esam" };
  return { title: `${post.title} | Abrar Mahir Esam`, description: post.summary };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main>
      <MapHero height="tall">
        <div className="sign-grid sign-grid-project">
          <div>
            <nav aria-label="Breadcrumb">
              <Link href="/blog" className="sign-back">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All posts
              </Link>
            </nav>
            <h1 className="sign-name sign-name-project">{post.title}</h1>
            <p className="ticket">
              <span className="data">{formatPostDate(post.date)}</span>
              {post.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </p>
          </div>
          <div className="sign-aside">
            <p>{post.summary}</p>
            {post.github && (
              <div className="sign-actions">
                <a href={post.github} target="_blank" rel="noopener noreferrer" className="btn btn-sign">
                  Source code <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>
        </div>
      </MapHero>

      <Route line="T">
        <section className="route-section">
          <div className="page-wrap">
            <PostBody body={post.body} />
          </div>
        </section>
      </Route>
    </main>
  );
}
