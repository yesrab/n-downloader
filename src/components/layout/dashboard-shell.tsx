import { Outlet, useRouterState } from "@tanstack/react-router"
import { Fragment } from "react"

import { AppSidebar } from "@/components/navigation/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  ArrowClockwiseIcon,
  DownloadSimpleIcon,
  LinkSimpleIcon,
  MagnetIcon,
  PauseIcon,
} from "@phosphor-icons/react"

export function DashboardShell({ children }: { children?: React.ReactNode }) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const breadcrumbs = getBreadcrumbs(pathname)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="border-l border-[#171512]/10 bg-[#eee9df] text-[#171512] md:m-0 md:shadow-none">
        <header className="sticky top-0 z-10 border-b border-[#171512] bg-[#eee9df]">
          <div className="flex h-14 items-center gap-2 px-3 sm:px-4">
            <SidebarTrigger className="-ml-1 border border-[#171512]/20 bg-[#f8f5ed] hover:bg-[#e2dacb]" />
            <Separator
              orientation="vertical"
              className="mr-2 bg-[#171512]/30 data-[orientation=vertical]:h-6"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((item, index) => {
                  const isLast = index === breadcrumbs.length - 1

                  return (
                    <Fragment key={item.href}>
                      <BreadcrumbItem
                        className={index === 0 ? "hidden md:block" : undefined}
                      >
                        {isLast ? (
                          <BreadcrumbPage className="text-[#171512]">
                            {item.label}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink
                            className="text-[#635d53] hover:text-[#171512]"
                            href={item.href}
                          >
                            {item.label}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast ? (
                        <BreadcrumbSeparator className="hidden md:block" />
                      ) : null}
                    </Fragment>
                  )
                })}
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-3 hidden items-center gap-2 border-l border-[#171512]/15 pl-3 text-[10px] text-[#635d53] uppercase md:flex">
              <span className="h-2 w-2 bg-[#5bb3a7]" />
              Local engine online
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Button
                className="border-[#171512]/20 bg-[#f8f5ed] hover:bg-[#e2dacb]"
                size="icon-sm"
                title="Add link"
                type="button"
                variant="outline"
              >
                <LinkSimpleIcon />
              </Button>
              <Button
                className="border-[#171512]/20 bg-[#f8f5ed] hover:bg-[#e2dacb]"
                size="icon-sm"
                title="Add magnet"
                type="button"
                variant="outline"
              >
                <MagnetIcon />
              </Button>
              <Button
                className="hidden border-[#171512]/20 bg-[#f8f5ed] hover:bg-[#e2dacb] sm:inline-flex"
                size="icon-sm"
                title="Pause all"
                type="button"
                variant="outline"
              >
                <PauseIcon />
              </Button>
              <Button
                className="hidden border-[#171512]/20 bg-[#f8f5ed] hover:bg-[#e2dacb] sm:inline-flex"
                size="icon-sm"
                title="Recheck"
                type="button"
                variant="outline"
              >
                <ArrowClockwiseIcon />
              </Button>
              <Button
                className="border-[#171512] bg-[#171512] text-[#f7f4ef] hover:bg-[#2c2822]"
                size="sm"
                type="button"
              >
                <DownloadSimpleIcon />
                New
              </Button>
            </div>
          </div>
        </header>
        {children ?? <Outlet />}
      </SidebarInset>
    </SidebarProvider>
  )
}

function getBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean)

  if (segments.length === 0) {
    return [{ href: "/", label: "Control room" }]
  }

  return [
    { href: "/", label: "n-downloader" },
    ...segments.map((segment, index) => ({
      href: `/${segments.slice(0, index + 1).join("/")}`,
      label: labelFromSegment(segment),
    })),
  ]
}

function labelFromSegment(segment: string) {
  return decodeURIComponent(segment)
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
