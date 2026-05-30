import { createFileRoute } from "@tanstack/react-router"

import { HistoryPage } from "@/components/screens/dashboard-pages"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export const Route = createFileRoute("/(app)/history")({
  component: HistoryRoute,
})

function HistoryRoute() {
  return (
    <DashboardShell>
      <HistoryPage />
    </DashboardShell>
  )
}
