import { createFileRoute } from "@tanstack/react-router"

import { DummyRoutePage } from "@/components/screens/dashboard-pages"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export const Route = createFileRoute("/(app)/torrents/ratio-rules")({
  component: RatioRulesRoute,
})

function RatioRulesRoute() {
  return (
    <DashboardShell>
      <DummyRoutePage
        eyebrow="Torrents"
        title="Ratio rules"
        summary="Dummy seeding policy page for ratio, time, category, and storage constraints."
        items={[
          ["Global ratio", "Default share ratio and seeding time."],
          [
            "Category policy",
            "Different rules for ISOs, media, and open data.",
          ],
          [
            "Stop actions",
            "Pause, remove torrent, or keep metadata after target.",
          ],
        ]}
      />
    </DashboardShell>
  )
}
