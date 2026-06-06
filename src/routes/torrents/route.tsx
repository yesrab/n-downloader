import { createFileRoute } from "@tanstack/react-router"

import { TorrentsPage } from "@/components/screens/dashboard-pages"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export const Route = createFileRoute("/torrents")({
  component: TorrentsRoute,
})

function TorrentsRoute() {
  return (
    <DashboardShell>
      <TorrentsPage />
    </DashboardShell>
  )
}
