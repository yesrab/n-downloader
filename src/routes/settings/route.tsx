import { createFileRoute } from "@tanstack/react-router"

import { SettingsPage } from "@/components/screens/dashboard-pages"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export const Route = createFileRoute("/settings")({
  component: SettingsRoute,
})

function SettingsRoute() {
  return (
    <DashboardShell>
      <SettingsPage />
    </DashboardShell>
  )
}
