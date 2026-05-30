import { createFileRoute } from "@tanstack/react-router"

import { DownloadsPage } from "@/components/screens/dashboard-pages"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export const Route = createFileRoute("/(app)/downloads")({
  component: DownloadsRoute,
})

function DownloadsRoute() {
  return (
    <DashboardShell>
      <DownloadsPage />
    </DashboardShell>
  )
}
