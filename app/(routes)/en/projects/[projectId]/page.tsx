"use client";
import { Suspense } from "react";
import ProjectDetailPage from "@/features/projects/components/ProjectDetailPage";
import ProjectDetailSkeleton from "@/features/projects/components/ProjectDetailSkeleton";
import { useParams } from "next/navigation";

export default function EnglishProjectDetailPage() {
  const { projectId } = useParams();
  
  return (
    <Suspense fallback={<ProjectDetailSkeleton />}>
      <ProjectDetailPage projectId={projectId as string} />
    </Suspense>
  );
}

