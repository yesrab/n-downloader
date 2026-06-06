import { createFileRoute } from "@tanstack/react-router"

import { DummyRoutePage } from "@/components/screens/dashboard-pages"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export const Route = createFileRoute("/settings/feedback")({
  component: FeedbackRoute,
})

function FeedbackRoute() {
  return (
    <DashboardShell>
      <DummyRoutePage
        eyebrow="Settings"
        title="Feedback"
        summary="Dummy feedback page for feature requests, host plugin reports, and bug notes."
        items={[
          ["Feature request", "Describe workflow gaps and missing controls."],
          ["Host report", "Flag broken direct-download providers."],
          ["Bug note", "Attach logs and reproduction steps later."],
        ]}
      />
    </DashboardShell>
  )
}
