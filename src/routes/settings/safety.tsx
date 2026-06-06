import { createFileRoute } from "@tanstack/react-router"

import { DummyRoutePage } from "@/components/screens/dashboard-pages"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export const Route = createFileRoute("/settings/safety")({
  component: SafetyRoute,
})

function SafetyRoute() {
  return (
    <DashboardShell>
      <DummyRoutePage
        eyebrow="Settings"
        title="Safety"
        summary="Dummy verification, allowlist, blocklist, and scan hooks for downloaded files."
        items={[
          ["Checksums", "Verify known hashes after download."],
          ["Blocklist", "Reject unsafe extensions and domains."],
          ["Scan hook", "Placeholder for external scanner integration."],
        ]}
      />
    </DashboardShell>
  )
}
