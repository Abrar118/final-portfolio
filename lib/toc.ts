import type { Block } from "@/data/blog/posts";

export type TocItem = { id: string; label: string; level?: 2 | 3 };

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/* The headings of a post, keyed by block index, with ids that are unique
   within the post. PostBody and the contents list both read this. */
export function postHeadings(body: Block[]): Map<number, TocItem> {
  const seen = new Map<string, number>();
  const out = new Map<number, TocItem>();
  body.forEach((b, i) => {
    if (b.t !== "h") return;
    const base = slug(b.text) || "section";
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    out.set(i, { id: n ? `${base}-${n + 1}` : base, label: b.text, level: b.level ?? 2 });
  });
  return out;
}
