import { createFileRoute } from "@tanstack/react-router"

import { DummyRoutePage } from "@/components/screens/dashboard-pages"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export const Route = createFileRoute("/downloads/extraction")({
  component: ExtractionRoute,
})

function ExtractionRoute() {
  return (
    <DashboardShell>
      <DummyRoutePage
        eyebrow="Direct Links"
        title="Extraction"
        summary="Dummy post-download workflow for archives, passwords, checksums, and cleanup."
        items={[
          [
            "Archive jobs",
            "Track pending, running, and failed extraction tasks.",
          ],
          [
            "Passwords",
            "Store package-specific and global password candidates.",
          ],
          [
            "Cleanup",
            "Remove parts, verify output, and move completed folders.",
          ],
        ]}
      />
    </DashboardShell>
  )
}
