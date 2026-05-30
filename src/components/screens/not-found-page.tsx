import { Link } from "@tanstack/react-router"
import {
  ArrowLeftIcon,
  DownloadSimpleIcon,
  WarningOctagonIcon,
} from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"

export function NotFoundPage() {
  return (
    <main className="grid min-h-svh place-items-center bg-[#eee9df] p-4 text-[#171512]">
      <section className="w-full max-w-4xl border border-[#171512] bg-[#f8f5ed] shadow-[10px_10px_0_#171512]">
        <div className="grid border-b border-[#171512] md:grid-cols-[1fr_220px]">
          <div className="p-5">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center border border-[#171512] bg-[#171512] text-[#f7f4ef]">
                <DownloadSimpleIcon className="size-5" weight="bold" />
              </span>
              <div>
                <p className="text-sm font-semibold">n-downloader</p>
                <p className="text-[10px] text-[#635d53] uppercase">
                  route monitor
                </p>
              </div>
            </div>
            <p className="mt-10 text-xs font-semibold text-[#ce3f21] uppercase">
              404 / missing route
            </p>
            <h1 className="mt-3 text-4xl leading-none font-semibold tracking-normal sm:text-5xl">
              This transfer path does not exist.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#635d53]">
              The requested page is not wired into the local control room yet.
              Head back to the dashboard and choose a known queue surface.
            </p>
          </div>
          <div className="grid border-t border-[#171512] md:border-t-0 md:border-l">
            <div className="border-b border-[#171512] bg-[#171512] p-4 text-[#f7f4ef]">
              <div className="flex items-center gap-2 text-xs text-white/65">
                <WarningOctagonIcon className="size-4" />
                status
              </div>
              <p className="mt-4 text-3xl font-semibold">lost</p>
            </div>
            <div className="grid grid-cols-2">
              <div className="border-r border-[#171512] bg-[#efb84f] p-3 text-xs">
                paths
                <p className="mt-2 text-xl font-semibold">18</p>
              </div>
              <div className="bg-[#5bb3a7] p-3 text-xs">
                engine
                <p className="mt-2 text-xl font-semibold">ok</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 p-4">
          <code className="border border-[#171512]/15 bg-[#eee9df] px-3 py-2 text-xs break-all">
            try: /downloads /torrents /queue /history /settings
          </code>
          <Button
            asChild
            className="border-[#171512] bg-[#171512] text-[#f7f4ef] hover:bg-[#2c2822]"
          >
            <Link to="/">
              <ArrowLeftIcon />
              Back to control
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
