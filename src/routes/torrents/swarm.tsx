import { createFileRoute } from "@tanstack/react-router"

import { DummyRoutePage } from "@/components/screens/dashboard-pages"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export const Route = createFileRoute("/torrents/swarm")({
  component: SwarmRoute,
})

function SwarmRoute() {
  return (
    <DashboardShell>
      <DummyRoutePage
        eyebrow="Torrents"
        title="Swarm"
        summary="Dummy peer and seed telemetry inspired by qBittorrent's transfer view."
        items={[
          [
            "Peers",
            "Inspect connected clients, countries, and piece progress.",
          ],
          ["Seeds", "Track availability and swarm health per torrent."],
          ["Pieces", "Placeholder for piece map and priority controls."],
        ]}
      />
    </DashboardShell>
  )
}
