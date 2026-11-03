import Image from "next/image";
import Link from "next/link";
import type { Block } from "@/data/blog/posts";
import { postHeadings } from "@/lib/toc";

/* Inline markup: `code`, **bold** and [text](url). Nothing else. */
const INLINE = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(INLINE).map((part, i) => {
        if (part.startsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>;
        if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link && link[2].startsWith("/"))
          return (
            <Link key={i} href={link[2]} className="post-link">
              {link[1]}
            </Link>
          );
        if (link)
          return (
            <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer" className="post-link">
              {link[1]}
            </a>
          );
        return part;
      })}
    </>
  );
}

export default function PostBody({ body }: { body: Block[] }) {
  const heads = postHeadings(body);
  return (
    <div className="post-body">
      {body.map((b, i) => {
        switch (b.t) {
          case "h": {
            const h = heads.get(i)!;
            return b.level === 3 ? (
              <h3 key={i} id={h.id} className="post-h3">
                {b.text}
              </h3>
            ) : (
              <h2 key={i} id={h.id} className="post-h">
                {b.text}
              </h2>
            );
          }
          case "p":
            return (
              <p key={i}>
                <Inline text={b.text} />
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="post-list">
                {b.items.map((it) => (
                  <li key={it}>
                    <Inline text={it} />
                  </li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre key={i} className="post-code" tabIndex={0}>
                <code>{b.text}</code>
              </pre>
            );
          case "table":
            return (
              <div key={i} className="post-table-wrap" tabIndex={0}>
                <table className="post-table">
                  <thead>
                    <tr>
                      {b.head.map((h) => (
                        <th key={h} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r) => (
                      <tr key={r[0]}>
                        {r.map((c, j) => (
                          <td key={j} className={j === 0 ? "post-cell-key" : undefined}>
                            <Inline text={c} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "gallery":
            return (
              <div
                key={i}
                className={`post-gallery ${b.tall ? "is-tall" : ""} ${b.items.length === 1 ? "is-single" : ""}`}
              >
                {b.items.map((it) => (
                  <figure key={it.label} className="post-shot">
                    <span className="frame">
                      <Image
                        src={it.src}
                        alt={`${b.name}: ${it.label}`}
                        sizes="(max-width: 1024px) 46vw, 420px"
                        className="frame-image"
                      />
                    </span>
                    <figcaption>{it.label}</figcaption>
                  </figure>
                ))}
              </div>
            );
          case "img":
            return (
              <figure key={i} className="post-figure">
                <span className="frame">
                  <Image
                    src={b.src}
                    alt={b.alt}
                    width={b.width}
                    height={b.height}
                    sizes="(max-width: 1024px) 92vw, 900px"
                    className="frame-image"
                    style={b.height > b.width ? { maxWidth: 460, margin: "0 auto" } : undefined}
                  />
                </span>
                {b.caption && <figcaption>{b.caption}</figcaption>}
              </figure>
            );
        }
      })}
    </div>
  );
}
