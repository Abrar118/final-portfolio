"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Bullet, MapHero, Route, Stopline } from "@/components/network/parts";
import { categoryLabel, stopById, type LineId } from "@/data/network";

type Neighbor = { slug: string; title: string } | null;

export default function ProjectDetailsContainer({
  project,
  prev,
  next,
}: {
  project: Project;
  prev: Neighbor;
  next: Neighbor;
}) {
  const stop = project.slug ? stopById.get(project.slug) : undefined;
  const stopLines: LineId[] = stop?.lines ?? ["T"];

  return (
    <main>
      <MapHero height="tall">
        <div className="sign-grid sign-grid-project">
          <div>
            <nav aria-label="Breadcrumb">
              <Link href="/projects" className="sign-back">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All work
              </Link>
            </nav>
            <h1 className="sign-name sign-name-project">{project.title}</h1>
            <p className="ticket">
              {stopLines.map((l) => (
                <Bullet key={l} id={l} size="sm" />
              ))}
              <span className="data">{project.year}</span>
              {project.category && <span>{categoryLabel[project.category]}</span>}
              {project.context && <span>{project.context}</span>}
            </p>
          </div>
          <div className="sign-aside">
            <p>{project.description}</p>
            <div className="sign-actions">
              {project.href && (
                <a href={project.href} target="_blank" rel="noopener noreferrer" className="btn btn-sign">
                  Live site <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
              {project.links?.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-sign-quiet">
                  {l.label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-sign-quiet">
                  Source code <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </MapHero>

      <Route line={stopLines[0]}>
        {project.content && (
          <Stopline title="What it is">
            <div className="prose-sign">
              {typeof project.content === "string" ? <p>{project.content}</p> : project.content}
            </div>
          </Stopline>
        )}

        {project.images.length > 0 && (
        <section className="route-section gallery-section">
          <div className="page-wrap">
            <h2 className="section-title route-stop">Screens</h2>
            <div className="gallery">
              {project.images.map((image, index) => {
                const portrait = typeof image !== "string" && image.height > image.width;
                const strip = typeof image !== "string" && image.width > image.height * 2.6;
                return (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <button
                        aria-label={`Enlarge ${project.title} screenshot ${index + 1}`}
                        className={`frame gallery-shot ${portrait ? "gallery-portrait" : strip ? "gallery-strip" : index === 0 ? "gallery-lead" : ""}`}
                      >
                        <Image
                          src={image}
                          alt={`${project.title} screenshot ${index + 1}`}
                          sizes={index === 0 ? "(max-width: 1024px) 92vw, 1200px" : "(max-width: 1024px) 92vw, 600px"}
                          priority={index === 0}
                          className="frame-image"
                        />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="dialog-frame">
                      <DialogTitle className="sr-only">
                        {project.title}, screenshot {index + 1}
                      </DialogTitle>
                      <DialogDescription className="sr-only">Enlarged project screenshot.</DialogDescription>
                      <Image
                        src={image}
                        alt={`${project.title} screenshot ${index + 1}`}
                        sizes="90vw"
                        className="max-h-[85vh] w-full object-contain"
                      />
                    </DialogContent>
                  </Dialog>
                );
              })}
            </div>
          </div>
        </section>
        )}

        {project.features && project.features.length > 0 && (
          <Stopline title="What it does">
            <ul className="feature-list">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Stopline>
        )}

        {project.stack && project.stack.length > 0 && (
          <Stopline title="Built with">
            <ul className="stack-list">
              {project.stack.map((t) => (
                <li key={t.name}>{t.name}</li>
              ))}
            </ul>
          </Stopline>
        )}

        <nav aria-label="More projects" className="adjacent">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="adjacent-link">
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              <span>
                <span className="adjacent-label">Previous</span>
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/projects/${next.slug}`} className="adjacent-link adjacent-next">
              <span>
                <span className="adjacent-label">Next</span>
                {next.title}
              </span>
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          )}
        </nav>
      </Route>
    </main>
  );
}
