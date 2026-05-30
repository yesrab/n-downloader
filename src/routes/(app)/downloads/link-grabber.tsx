import { createFileRoute } from "@tanstack/react-router"

import { DummyRoutePage } from "@/components/screens/dashboard-pages"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export const Route = createFileRoute("/(app)/downloads/link-grabber")({
  component: LinkGrabberRoute,
})

function LinkGrabberRoute() {
  return (
    <DashboardShell>
      <DummyRoutePage
        eyebrow="Direct Links"
        title="Link grabber"
        summary="Dummy intake surface for pasted URLs, containers, host variants, and package grouping."
        items={[
          [
            "Clipboard watch",
            "Detect copied URLs and sort them into packages.",
          ],
          [
            "Variant picker",
            "Choose host, quality, filename, and folder rules.",
          ],
          [
            "Availability scan",
            "Placeholder for online checks and duplicate detection.",
          ],
        ]}
      />
    </DashboardShell>
  )
}
