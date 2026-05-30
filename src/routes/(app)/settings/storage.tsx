import { createFileRoute } from "@tanstack/react-router"

import { DummyRoutePage } from "@/components/screens/dashboard-pages"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export const Route = createFileRoute("/(app)/settings/storage")({
  component: StorageRoute,
})

function StorageRoute() {
  return (
    <DashboardShell>
      <DummyRoutePage
        eyebrow="Settings"
        title="Storage"
        summary="Dummy storage targets for incomplete, complete, torrent, and extracted files."
        items={[
          ["Incoming", "Path for active partial downloads."],
          ["Complete", "Final media and archive destination."],
          ["Disk guard", "Pause jobs when free space falls below threshold."],
        ]}
      />
    </DashboardShell>
  )
}
