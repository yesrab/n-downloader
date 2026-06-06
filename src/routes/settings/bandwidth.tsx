import { createFileRoute } from "@tanstack/react-router"

import { DummyRoutePage } from "@/components/screens/dashboard-pages"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export const Route = createFileRoute("/settings/bandwidth")({
  component: BandwidthRoute,
})

function BandwidthRoute() {
  return (
    <DashboardShell>
      <DummyRoutePage
        eyebrow="Settings"
        title="Bandwidth"
        summary="Dummy global and per-protocol limits for direct downloads and torrents."
        items={[
          ["Download cap", "Global maximum across all active jobs."],
          ["Upload cap", "Torrent upload limit with scheduled overrides."],
          ["Connections", "Max chunks, peers, and jobs per protocol."],
        ]}
      />
    </DashboardShell>
  )
}
