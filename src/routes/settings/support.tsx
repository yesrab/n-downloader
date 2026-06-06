import { createFileRoute } from "@tanstack/react-router"

import { DummyRoutePage } from "@/components/screens/dashboard-pages"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export const Route = createFileRoute("/settings/support")({
  component: SupportRoute,
})

function SupportRoute() {
  return (
    <DashboardShell>
      <DummyRoutePage
        eyebrow="Settings"
        title="Support"
        summary="Dummy diagnostics area for logs, config export, and local troubleshooting."
        items={[
          ["Logs", "Download recent service logs."],
          ["Config export", "Bundle sanitized settings for debugging."],
          ["Docs", "Placeholder links for install and homelab setup."],
        ]}
      />
    </DashboardShell>
  )
}
