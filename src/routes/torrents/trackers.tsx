import { createFileRoute } from "@tanstack/react-router"

import { DummyRoutePage } from "@/components/screens/dashboard-pages"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export const Route = createFileRoute("/torrents/trackers")({
  component: TrackersRoute,
})

function TrackersRoute() {
  return (
    <DashboardShell>
      <DummyRoutePage
        eyebrow="Torrents"
        title="Trackers"
        summary="Dummy tracker list for announces, scrape status, failures, and next update times."
        items={[
          [
            "Announce state",
            "Working, warning, disabled, and timed out trackers.",
          ],
          ["Scrape data", "Seed and peer counts from tracker responses."],
          ["Fallbacks", "Placeholder for tracker tiers and DHT fallback."],
        ]}
      />
    </DashboardShell>
  )
}
