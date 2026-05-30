import {
  ArrowDownIcon,
  CheckCircleIcon,
  ClockCounterClockwiseIcon,
  DatabaseIcon,
  DownloadSimpleIcon,
  GaugeIcon,
  HardDrivesIcon,
  MagnetIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  QueueIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
  UploadSimpleIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react"

const downloads = [
  {
    name: "ubuntu-26.04-live-server.iso",
    host: "mirror.kernel.org",
    progress: 78,
    status: "Downloading",
    speed: "18.4 MB/s",
    eta: "03m 42s",
    kind: "HTTP",
  },
  {
    name: "archive-pack-05.zip",
    host: "cdn.assets.local",
    progress: 42,
    status: "Queued",
    speed: "0 KB/s",
    eta: "waiting",
    kind: "Direct",
  },
  {
    name: "dataset-snapshot.tar.zst",
    host: "storage.example.net",
    progress: 94,
    status: "Verifying",
    speed: "3.1 MB/s",
    eta: "01m 05s",
    kind: "HTTP",
  },
]

const torrents = [
  {
    name: "linux-distro-library",
    progress: 64,
    ratio: "1.82",
    seeds: 412,
    peers: 61,
    down: "22.7 MB/s",
    up: "4.8 MB/s",
  },
  {
    name: "public-domain-video-pack",
    progress: 100,
    ratio: "3.40",
    seeds: 98,
    peers: 12,
    down: "0 KB/s",
    up: "1.2 MB/s",
  },
  {
    name: "open-data-nightly",
    progress: 31,
    ratio: "0.44",
    seeds: 58,
    peers: 24,
    down: "9.6 MB/s",
    up: "900 KB/s",
  },
]

const queueItems = [
  ["1", "dataset-snapshot.tar.zst", "High", "Active"],
  ["2", "linux-distro-library", "Normal", "Active"],
  ["3", "archive-pack-05.zip", "Low", "Waiting for slot"],
  ["4", "course-assets.tar", "Normal", "Host cooldown"],
]

const historyItems = [
  ["Today 13:12", "ubuntu-26.04-live-server.iso", "Completed", "2.8 GB"],
  ["Today 12:48", "open-data-nightly", "Paused", "18.4 GB"],
  ["Yesterday 22:03", "firmware-bundle.zip", "Completed", "941 MB"],
  ["Yesterday 19:31", "public-domain-video-pack", "Seeding", "44.1 GB"],
]

export function DashboardHome() {
  return (
    <DashboardCanvas
      eyebrow="Live Overview"
      title="Transfer control room"
      summary="A dummy blend of JDownloader-style host queues and qBittorrent-style swarm telemetry."
    >
      <div className="grid gap-3 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="border border-[#171512]/20 bg-[#f8f5ed] p-3">
          <SectionHeader icon={<DownloadSimpleIcon />} title="Downloads" />
          <DownloadTable />
        </section>
        <section className="border border-[#171512]/20 bg-[#171512] p-3 text-[#f7f4ef]">
          <SectionHeader icon={<MagnetIcon />} title="Torrents" />
          <TorrentTable inverted />
        </section>
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        <Metric
          icon={<ArrowDownIcon />}
          label="Down"
          value="53.8 MB/s"
          tone="red"
        />
        <Metric
          icon={<UploadSimpleIcon />}
          label="Up"
          value="6.9 MB/s"
          tone="teal"
        />
        <Metric icon={<QueueIcon />} label="Queued" value="18" tone="yellow" />
        <Metric
          icon={<HardDrivesIcon />}
          label="Disk"
          value="1.8 TB"
          tone="dark"
        />
      </div>
      <section className="border border-[#171512]/20 bg-[#f8f5ed] p-3">
        <SectionHeader icon={<GaugeIcon />} title="Bandwidth Scheduler" />
        <div className="grid gap-3 md:grid-cols-[0.7fr_1.3fr]">
          <div className="border border-[#171512]/15 bg-[#eee9df] p-3">
            <p className="text-xs text-[#635d53]">Current mode</p>
            <p className="mt-2 text-2xl font-semibold">Night boost</p>
            <p className="mt-2 text-xs leading-5 text-[#635d53]">
              Unlimited LAN, capped WAN upload, automatic host cooldown.
            </p>
          </div>
          <div className="grid grid-cols-12 gap-1">
            {Array.from({ length: 24 }).map((_, index) => (
              <div
                className="h-20 border border-[#171512]/10 bg-[#e2dacb]"
                key={index}
              >
                <div
                  className="mt-auto bg-[#ce3f21]"
                  style={{ height: `${25 + ((index * 13) % 65)}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </DashboardCanvas>
  )
}

export function DownloadsPage() {
  return (
    <DashboardCanvas
      eyebrow="Direct Links"
      title="Downloads"
      summary="Host accounts, chunks, retries, extraction, and checksum status will live here."
    >
      <section className="border border-[#171512]/20 bg-[#f8f5ed] p-3">
        <SectionHeader icon={<DownloadSimpleIcon />} title="Active files" />
        <DownloadTable />
      </section>
      <FeatureGrid
        items={[
          ["Package collector", "Grouped links, variants, and folder rules."],
          ["Auto extraction", "Archive passwords and post-download actions."],
          ["Host cooldown", "Retry timers with account-aware throttling."],
        ]}
      />
    </DashboardCanvas>
  )
}

export function TorrentsPage() {
  return (
    <DashboardCanvas
      eyebrow="Swarm View"
      title="Torrents"
      summary="qBittorrent-inspired ratios, trackers, seeds, peers, categories, and speed limits."
    >
      <section className="border border-[#171512]/20 bg-[#171512] p-3 text-[#f7f4ef]">
        <SectionHeader icon={<MagnetIcon />} title="Torrent jobs" />
        <TorrentTable inverted />
      </section>
      <FeatureGrid
        items={[
          ["Tracker status", "Announce health, next update, and failures."],
          ["Categories", "Linux ISOs, media, open data, and custom tags."],
          ["Ratio rules", "Seed until time, ratio, or disk policy is met."],
        ]}
      />
    </DashboardCanvas>
  )
}

export function QueuePage() {
  return (
    <DashboardCanvas
      eyebrow="Execution Order"
      title="Queue"
      summary="Dummy priority controls for downloads and torrents sharing the same scheduler."
    >
      <section className="border border-[#171512]/20 bg-[#f8f5ed] p-3">
        <SectionHeader icon={<QueueIcon />} title="Run order" />
        <div className="grid gap-2">
          {queueItems.map(([rank, name, priority, status]) => (
            <div
              className="grid gap-3 border border-[#171512]/15 bg-[#eee9df] p-3 text-xs md:grid-cols-[40px_1fr_110px_140px]"
              key={name}
            >
              <span className="font-semibold">{rank}</span>
              <span className="truncate">{name}</span>
              <span>{priority}</span>
              <span className="text-[#635d53]">{status}</span>
            </div>
          ))}
        </div>
      </section>
      <FeatureGrid
        items={[
          ["Move top", "Fast priority jumps for important files."],
          ["Global slots", "Shared active limits across protocols."],
          ["Rules", "Start after time, host, category, or ratio condition."],
        ]}
      />
    </DashboardCanvas>
  )
}

export function HistoryPage() {
  return (
    <DashboardCanvas
      eyebrow="Activity Log"
      title="History"
      summary="Completed, paused, failed, and seeded items with operational metadata."
    >
      <section className="border border-[#171512]/20 bg-[#f8f5ed] p-3">
        <SectionHeader
          icon={<ClockCounterClockwiseIcon />}
          title="Recent activity"
        />
        <div className="grid gap-2">
          {historyItems.map(([time, name, status, size]) => (
            <div
              className="grid gap-3 border border-[#171512]/15 bg-[#eee9df] p-3 text-xs md:grid-cols-[130px_1fr_110px_90px]"
              key={`${time}-${name}`}
            >
              <span className="text-[#635d53]">{time}</span>
              <span className="truncate">{name}</span>
              <span>{status}</span>
              <span>{size}</span>
            </div>
          ))}
        </div>
      </section>
    </DashboardCanvas>
  )
}

export function SettingsPage() {
  return (
    <DashboardCanvas
      eyebrow="System"
      title="Settings"
      summary="Dummy controls for folders, bandwidth, torrent ports, host plugins, and safety checks."
    >
      <div className="grid gap-3 lg:grid-cols-3">
        <SettingsPanel icon={<DatabaseIcon />} title="Storage">
          Download path: `/mnt/media/incoming`
          <br />
          Completed path: `/mnt/media/complete`
        </SettingsPanel>
        <SettingsPanel icon={<SlidersHorizontalIcon />} title="Limits">
          Download: unlimited
          <br />
          Upload: 8 MB/s
        </SettingsPanel>
        <SettingsPanel icon={<ShieldCheckIcon />} title="Safety">
          Checksum verification on
          <br />
          Malware scan placeholder
        </SettingsPanel>
      </div>
      <section className="border border-[#171512]/20 bg-[#171512] p-3 text-[#f7f4ef]">
        <SectionHeader icon={<WarningCircleIcon />} title="Service status" />
        <div className="grid gap-2 md:grid-cols-3">
          {["API online", "Torrent engine idle", "Host plugins stale"].map(
            (item) => (
              <div className="border border-white/15 p-3 text-xs" key={item}>
                {item}
              </div>
            )
          )}
        </div>
      </section>
    </DashboardCanvas>
  )
}

export function DummyRoutePage({
  eyebrow,
  title,
  summary,
  items,
}: {
  eyebrow: string
  items: [string, string][]
  summary: string
  title: string
}) {
  return (
    <DashboardCanvas eyebrow={eyebrow} summary={summary} title={title}>
      <FeatureGrid items={items} />
      <section className="border border-[#171512]/20 bg-[#171512] p-3 text-[#f7f4ef]">
        <SectionHeader icon={<GaugeIcon />} title="Dummy implementation map" />
        <div className="grid gap-2 md:grid-cols-3">
          {["UI placeholder", "Data model pending", "Worker logic pending"].map(
            (item) => (
              <div className="border border-white/15 p-3 text-xs" key={item}>
                {item}
              </div>
            )
          )}
        </div>
      </section>
    </DashboardCanvas>
  )
}

function DashboardCanvas({
  children,
  eyebrow,
  summary,
  title,
}: {
  children: React.ReactNode
  eyebrow: string
  summary: string
  title: string
}) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4">
      <div className="border border-[#171512]/20 bg-[#f8f5ed] p-4">
        <p className="text-xs font-semibold text-[#ce3f21] uppercase">
          {eyebrow}
        </p>
        <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <h1 className="text-3xl leading-none font-semibold tracking-normal sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#635d53]">
              {summary}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <StatusPill icon={<PlayCircleIcon />} label="12 active" />
            <StatusPill icon={<PauseCircleIcon />} label="4 paused" />
            <StatusPill icon={<CheckCircleIcon />} label="211 done" />
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

function DownloadTable() {
  return (
    <div className="grid gap-2">
      {downloads.map((item) => (
        <div
          className="grid gap-3 border border-[#171512]/15 bg-[#eee9df] p-3 text-xs lg:grid-cols-[1fr_90px_90px_90px]"
          key={item.name}
        >
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-3">
              <p className="truncate font-semibold">{item.name}</p>
              <span className="border border-[#171512]/15 bg-[#f8f5ed] px-2 py-1">
                {item.kind}
              </span>
            </div>
            <p className="mt-1 truncate text-[#635d53]">{item.host}</p>
            <div className="mt-3 h-2 bg-[#d8cfbf]">
              <div
                className="h-full bg-[#ce3f21]"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
          <Cell label="Status" value={item.status} />
          <Cell label="Speed" value={item.speed} />
          <Cell label="ETA" value={item.eta} />
        </div>
      ))}
    </div>
  )
}

function TorrentTable({ inverted = false }: { inverted?: boolean }) {
  return (
    <div className="grid gap-2">
      {torrents.map((item) => (
        <div
          className={`grid gap-3 border p-3 text-xs lg:grid-cols-[1fr_80px_80px_90px_90px] ${
            inverted
              ? "border-white/15 bg-white/5"
              : "border-[#171512]/15 bg-[#eee9df]"
          }`}
          key={item.name}
        >
          <div className="min-w-0">
            <p className="truncate font-semibold">{item.name}</p>
            <p
              className={
                inverted ? "mt-1 text-white/55" : "mt-1 text-[#635d53]"
              }
            >
              {item.seeds} seeds, {item.peers} peers
            </p>
            <div
              className={
                inverted ? "mt-3 h-2 bg-white/10" : "mt-3 h-2 bg-[#d8cfbf]"
              }
            >
              <div
                className="h-full bg-[#5bb3a7]"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
          <Cell label="Done" value={`${item.progress}%`} />
          <Cell label="Ratio" value={item.ratio} />
          <Cell label="Down" value={item.down} />
          <Cell label="Up" value={item.up} />
        </div>
      ))}
    </div>
  )
}

function Metric({
  icon,
  label,
  tone,
  value,
}: {
  icon: React.ReactNode
  label: string
  tone: "dark" | "red" | "teal" | "yellow"
  value: string
}) {
  const toneClass = {
    dark: "bg-[#171512] text-[#f7f4ef]",
    red: "bg-[#ce3f21] text-[#fffdf8]",
    teal: "bg-[#5bb3a7] text-[#171512]",
    yellow: "bg-[#efb84f] text-[#171512]",
  }[tone]

  return (
    <div className={`border border-[#171512]/20 p-3 ${toneClass}`}>
      <div className="flex items-center gap-2 text-xs opacity-75">
        {icon}
        {label}
      </div>
      <p className="mt-4 text-2xl font-semibold">{value}</p>
    </div>
  )
}

function FeatureGrid({ items }: { items: [string, string][] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {items.map(([title, body]) => (
        <div
          className="border border-[#171512]/20 bg-[#f8f5ed] p-3"
          key={title}
        >
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-2 text-xs leading-5 text-[#635d53]">{body}</p>
        </div>
      ))}
    </div>
  )
}

function SettingsPanel({
  children,
  icon,
  title,
}: {
  children: React.ReactNode
  icon: React.ReactNode
  title: string
}) {
  return (
    <section className="border border-[#171512]/20 bg-[#f8f5ed] p-3">
      <SectionHeader icon={icon} title={title} />
      <p className="text-xs leading-6 text-[#635d53]">{children}</p>
    </section>
  )
}

function SectionHeader({
  icon,
  title,
}: {
  icon: React.ReactNode
  title: string
}) {
  return (
    <div className="mb-3 flex items-center justify-between border-b border-current/15 pb-3">
      <div className="flex items-center gap-2 text-sm font-semibold">
        {icon}
        {title}
      </div>
    </div>
  )
}

function StatusPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 border border-[#171512]/15 bg-[#eee9df] px-2 py-2">
      {icon}
      <span className="truncate">{label}</span>
    </div>
  )
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase opacity-60">{label}</p>
      <p className="mt-1 truncate font-semibold">{value}</p>
    </div>
  )
}
