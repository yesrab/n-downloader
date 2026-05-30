import { createFileRoute } from "@tanstack/react-router"

import { QueuePage } from "@/components/screens/dashboard-pages"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export const Route = createFileRoute("/(app)/queue")({
  component: QueueRoute,
})

function QueueRoute() {
  return (
    <DashboardShell>
      <QueuePage />
    </DashboardShell>
  )
}
