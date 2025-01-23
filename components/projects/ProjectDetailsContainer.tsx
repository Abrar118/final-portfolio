"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  Clock,
  Eye,
  MessageSquare,
  Plus,
  MessageCircleQuestion,
  Flag,
} from "lucide-react";
import type { Project } from "@/types/project";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function ProjectDetailsContainer({
  project,
}: {
  project: Project;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border p-4">
        <div className="flex items-center gap-2 text-sm text-primary">
          <Link href="/projects" className="hover:text-chart1">
            Projects
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-chart3">{project.title}</span>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">{project.title}</h1>
          <p className="text-lg text-muted-foreground">{project.description}</p>

          <div className="mt-6 flex gap-4">
            {project.href && (
              <Link href={project.href}>
                <Button variant="outline">Preview</Button>
              </Link>
            )}
            {project.github && (
              <Link href={project.github}>
                <Button variant="outline">Github</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <div className="mb-2 h-10 w-10 rounded-full bg-foreground" />
            <p className="text-sm font-medium">Creator</p>
            <p className="text-xs text-muted-foreground">Abrar Mahir Esam</p>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="mb-2 h-10 w-10" />
            <p className="text-sm font-medium">Completion</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-foreground">
              8
            </div>
            <p className="text-sm font-medium">Pages</p>
            <p className="text-xs text-muted-foreground">
              {project.pages?.length || 0}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Eye className="mb-2 h-10 w-10" />
            <p className="text-sm font-medium">253</p>
            <p className="text-xs text-muted-foreground">Views</p>
          </div>
        </div>

        {/* Preview Images */}
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          {project.images.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Image
                  src={typeof image === "string" ? image : image.src}
                  alt={`Preview ${index + 1}`}
                  width={800}
                  height={600}
                  className="object-cover"
                />
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] max-h-[90vh]">
                <Image
                  src={typeof image === "string" ? image : image.src}
                  alt={`Preview ${index + 1}`}
                  width={1920}
                  height={1080}
                  className="md:w-[90vw] md:h-[85vh]"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr,300px]">
          <div className="space-y-8">
            {/* Description */}
            <div className="prose prose-invert max-w-none">
              {typeof project.content === "string" ? (
                <p>{project.content}</p>
              ) : (
                project.content
              )}
            </div>

            {/* Features */}
            <div>
              <h2 className="mb-4 text-2xl font-bold">Features</h2>
              <div className="space-y-2">
                {project.features?.map((feature, index) => (
                  <Collapsible key={feature} defaultOpen={index === 0}>
                    <CollapsibleTrigger
                      className="flex w-full items-center justify-between 
                    rounded-lg bg-muted/40 p-4 hover:bg-muted"
                    >
                      <span>{feature}</span>
                      <ChevronDown className="h-5 w-5" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 text-muted-foreground">
                      Feature details will be displayed here ...
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Categories */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {project.stack?.map((stack) => (
                  <Badge
                    key={stack.name}
                    variant="secondary"
                    className="bg-muted"
                  >
                    {stack.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Pages */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Pages</h3>
              <div className="flex flex-wrap gap-2 text-muted-foreground">
                {project.pages?.map((page) => (
                  <div key={page}>
                    {page}
                    {","}
                  </div>
                ))}
              </div>
            </div>

            {/* Support */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Support</h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact{" "}
                  <span className="italic text-chart1">
                    abrarme118@gmail.com
                  </span>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircleQuestion className="mr-2 h-4 w-4" />
                  React at number{" "}
                  <span className="text-chart2">+8801558075365</span>
                </Button>
              </div>
            </div>

            {/* Refund Policy */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Copyright Policy</h3>
              <p className="text-sm text-muted-foreground">
                All rights reserved to the owner of the project. You can use the
                project for educational purposes only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
