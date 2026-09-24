import { NextResponse } from "next/server";
import { getRepos } from "@/lib/github";

export const revalidate = 3600;

export async function GET() {
  const repos = await getRepos();
  return NextResponse.json({ repos: repos ?? [], fallback: repos === null });
}
