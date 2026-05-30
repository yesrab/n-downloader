import { createFileRoute } from "@tanstack/react-router"

import { DummyRoutePage } from "@/components/screens/dashboard-pages"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export const Route = createFileRoute("/(app)/queue/scheduler")({
  component: SchedulerRoute,
})

function SchedulerRoute() {
  return (
    <DashboardShell>
      <DummyRoutePage
        eyebrow="Queue"
        title="Scheduler"
        summary="Dummy time and bandwidth automation for day/night transfer behavior."
        items={[
          ["Time windows", "Set boost, quiet, and maintenance periods."],
          ["Bandwidth caps", "Change upload and download limits by schedule."],
          [
            "Wake actions",
            "Placeholder for NAS spin-up and post-run shutdown.",
          ],
        ]}
      />
    </DashboardShell>
  )
}
