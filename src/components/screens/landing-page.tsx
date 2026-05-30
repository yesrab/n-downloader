import {
  ClipboardTextIcon,
  DownloadSimpleIcon,
  LightningIcon,
  QueueIcon,
} from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"

export function LandingPage() {
  return (
    <main className="min-h-svh overflow-hidden bg-[#f7f4ef] text-[#171512]">
      <section className="relative grid min-h-svh grid-rows-[auto_1fr_auto]">
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[linear-gradient(90deg,rgba(23,21,18,0.07)_1px,transparent_1px),linear-gradient(180deg,rgba(23,21,18,0.07)_1px,transparent_1px)] bg-[size:52px_52px]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(180deg,transparent,rgba(247,244,239,0.98))]" />
        </div>

        <header className="relative z-10 flex items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <a className="flex items-center gap-3" href="/">
            <span className="flex size-9 items-center justify-center border border-[#171512] bg-[#171512] text-[#f7f4ef]">
              <DownloadSimpleIcon className="size-5" weight="bold" />
            </span>
            <span className="text-sm font-semibold tracking-normal">
              n-downloader
            </span>
          </a>
          <Button
            className="h-9 border-[#171512] bg-[#171512] px-3 text-[#f7f4ef] hover:bg-[#2c2822]"
            type="button"
          >
            Install
          </Button>
        </header>

        <div className="relative z-10 grid items-center gap-10 px-5 pt-6 pb-10 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.75fr)] lg:px-12">
          <div className="max-w-4xl">
            <div className="mb-5 flex w-fit items-center gap-2 border border-[#171512]/20 bg-white/55 px-3 py-2 text-xs text-[#4d4740] backdrop-blur">
              <LightningIcon className="size-4 text-[#ce3f21]" weight="fill" />
              Queue links now, automate the serious bits later.
            </div>
            <h1 className="max-w-3xl text-5xl leading-[0.98] font-semibold tracking-normal text-[#171512] sm:text-6xl lg:text-7xl">
              A Node-first download manager.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#5b554c] sm:text-lg">
              Paste links, shape the queue, and keep large downloads organized
              from a clean desktop-style control room. Install it on your
              homelab, NAS, or small server and keep the public edge page as the
              front door.
            </p>
            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {["Batch queue", "Host presets", "Resume-ready"].map((item) => (
                <div
                  key={item}
                  className="border border-[#171512]/15 bg-white/60 px-4 py-3 text-sm font-medium text-[#2b2824]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="border border-[#171512] bg-[#fffdf8]/88 p-4 shadow-[10px_10px_0_#171512] backdrop-blur">
            <div className="mb-5 flex items-center justify-between border-b border-[#171512]/15 pb-4">
              <div>
                <p className="text-sm font-semibold">Homelab install</p>
                <p className="mt-1 text-xs text-[#686158]">
                  Dummy command for now. Installer wiring comes next.
                </p>
              </div>
              <ClipboardTextIcon
                className="size-5 text-[#ce3f21]"
                weight="bold"
              />
            </div>
            <div className="border border-[#171512] bg-[#171512] p-4 text-[#f7f4ef]">
              <p className="text-xs text-white/55">Terminal</p>
              <code className="mt-4 block text-sm leading-7 break-all text-[#efb84f]">
                curl -fsSL https://n-downloader.dev/install.sh | sh
              </code>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-[#4d4740]">
              <div className="border border-[#171512]/15 bg-white/60 p-3">
                Docker-ready target
              </div>
              <div className="border border-[#171512]/15 bg-white/60 p-3">
                Local dashboard after install
              </div>
            </div>
            <Button
              className="mt-5 h-10 w-full border-[#171512] bg-[#171512] text-[#f7f4ef] hover:bg-[#2c2822]"
              type="button"
            >
              Copy install command
            </Button>
          </div>
        </div>

        <div className="relative z-10 px-5 pb-6 sm:px-8 lg:px-12">
          <div className="grid gap-3 border border-[#171512]/20 bg-[#171512] p-3 text-[#f7f4ef] shadow-[8px_8px_0_rgba(23,21,18,0.18)] md:grid-cols-[0.9fr_1.2fr_0.8fr]">
            <div className="border border-white/15 p-4">
              <div className="flex items-center gap-2 text-xs text-white/65">
                <QueueIcon className="size-4" />
                Active queue
              </div>
              <p className="mt-3 text-3xl font-semibold">18</p>
            </div>
            <div className="grid gap-2 border border-white/15 p-4">
              {[
                ["ubuntu-26.04-live.iso", "64%", "bg-[#efb84f]"],
                ["archive-pack.zip", "41%", "bg-[#5bb3a7]"],
                ["course-assets.tar", "82%", "bg-[#d95c3d]"],
              ].map(([name, progress, color]) => (
                <div key={name} className="grid gap-2">
                  <div className="flex items-center justify-between gap-4 text-xs">
                    <span className="truncate">{name}</span>
                    <span className="text-white/60">{progress}</span>
                  </div>
                  <div className="h-2 bg-white/10">
                    <div
                      className={`h-full ${color}`}
                      style={{ width: progress }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="border border-white/15 p-4">
              <p className="text-xs text-white/65">Transfer speed</p>
              <p className="mt-3 text-3xl font-semibold">42.8</p>
              <p className="text-xs text-white/50">MB/s combined</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
