import { createFileRoute } from "@tanstack/react-router"

import { DummyRoutePage } from "@/components/screens/dashboard-pages"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export const Route = createFileRoute("/(app)/queue/priorities")({
  component: PrioritiesRoute,
})

function PrioritiesRoute() {
  return (
    <DashboardShell>
      <DummyRoutePage
        eyebrow="Queue"
        title="Priorities"
        summary="Dummy priority surface for ordering downloads and torrents through one scheduler."
        items={[
          ["Move controls", "Top, bottom, up, down, and pin placeholders."],
          ["Protocol slots", "Balance HTTP chunks against torrent jobs."],
          ["Package priority", "Apply priority across grouped direct links."],
        ]}
      />
    </DashboardShell>
  )
}
