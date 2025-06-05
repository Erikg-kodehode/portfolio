"use client";
import ProjectDetailPage from "@/features/projects/components/ProjectDetailPage";
import { useParams } from "next/navigation";

export default function NorwegianProjectDetailPage() {
  const { projectId } = useParams();
  return <ProjectDetailPage projectId={projectId as string} />;
}

