import { createFileRoute } from "@tanstack/react-router"

import { DummyRoutePage } from "@/components/screens/dashboard-pages"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export const Route = createFileRoute("/settings/service-health")({
  component: ServiceHealthRoute,
})

function ServiceHealthRoute() {
  return (
    <DashboardShell>
      <DummyRoutePage
        eyebrow="Settings"
        title="Service health"
        summary="Dummy runtime status for API, workers, torrent engine, plugins, and storage."
        items={[
          ["Workers", "Queue worker, extractor, and tracker poller status."],
          ["Plugins", "Host plugin freshness and failure counts."],
          ["Runtime", "Node process, memory, and uptime placeholder."],
        ]}
      />
    </DashboardShell>
  )
}
