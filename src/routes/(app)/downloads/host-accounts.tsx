import { createFileRoute } from "@tanstack/react-router"

import { DummyRoutePage } from "@/components/screens/dashboard-pages"
import { DashboardShell } from "@/components/layout/dashboard-shell"

export const Route = createFileRoute("/(app)/downloads/host-accounts")({
  component: HostAccountsRoute,
})

function HostAccountsRoute() {
  return (
    <DashboardShell>
      <DummyRoutePage
        eyebrow="Direct Links"
        title="Host accounts"
        summary="Dummy account registry for premium hosts, cooldowns, captchas, and rate limits."
        items={[
          ["Account health", "Show quota, expiry, and enabled state."],
          ["Cooldown rules", "Throttle hosts after errors or bandwidth caps."],
          ["Captcha queue", "Placeholder for manual and automated challenges."],
        ]}
      />
    </DashboardShell>
  )
}
