import { createFileRoute } from "@tanstack/react-router"
import type { ComponentType } from "react"

import { DashboardShell } from "@/components/layout/dashboard-shell"
import { DashboardHome } from "@/components/screens/dashboard-pages"
import { LandingPage } from "@/components/screens/landing-page"

export const Route = createFileRoute("/")({ component: App })

type DeploymentSurface = "edge" | "sustained"

const deploymentSurfaceByTarget: Record<string, DeploymentSurface> = {
  aws: "sustained",
  cloudflare: "edge",
  ec2: "sustained",
  edge: "edge",
  homeserver: "sustained",
  nas: "sustained",
  netlify: "edge",
  server: "sustained",
  sustained: "sustained",
  vercel: "edge",
}

const homeComponentBySurface: Record<DeploymentSurface, ComponentType> = {
  edge: LandingPage,
  sustained: DashboardHomeRoute,
}

const deploymentTarget =
  import.meta.env.VITE_N_DOWNLOADER_DEPLOYMENT_TARGET ??
  (import.meta.env.APP_MODE === "landing" ? "edge" : "sustained")

function App() {
  const deploymentSurface =
    deploymentSurfaceByTarget[deploymentTarget.toLowerCase()] ?? "sustained"
  const HomeComponent = homeComponentBySurface[deploymentSurface]

  return <HomeComponent />
}

function DashboardHomeRoute() {
  return (
    <DashboardShell>
      <DashboardHome />
    </DashboardShell>
  )
}
