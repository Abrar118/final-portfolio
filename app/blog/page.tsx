import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MapHero, Route } from "@/components/network/parts";
import { posts } from "@/data/blog/posts";
import { formatPostDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog | Abrar Mahir Esam",
  description: "Writing by Abrar Mahir Esam on developer tooling, software and the way I work.",
};

export default function BlogPage() {
  return (
    <main>
      <MapHero height="tall">
        <div className="sign-grid sign-grid-project">
          <h1 className="sign-name">Blog</h1>
          <div className="sign-aside">
            <p>Notes on the tools I build and the way I work.</p>
          </div>
        </div>
      </MapHero>

      <Route line="T">
        <section className="route-section">
          <div className="page-wrap">
            <ul className="post-index">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="post-index-link">
                    <span className="post-index-title">{p.title}</span>
                    <span className="post-index-summary">{p.summary}</span>
                    <span className="work-meta">
                      <span className="data">{formatPostDate(p.date)}</span>
                      {p.tags.length > 0 && `. ${p.tags.join(", ")}`}
                    </span>
                    <span className="work-view">
                      Read post <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Route>
    </main>
  );
}
