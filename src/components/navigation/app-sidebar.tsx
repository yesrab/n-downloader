"use client"

import * as React from "react"
import {
  ActivityIcon,
  ArrowClockwiseIcon,
  ChartPieSliceIcon,
  DownloadSimpleIcon,
  GearIcon,
  HardDrivesIcon,
  HouseLineIcon,
  LifebuoyIcon,
  MagnetIcon,
  PaperPlaneTiltIcon,
  QueueIcon,
  SpeedometerIcon,
} from "@phosphor-icons/react"

import { NavMain } from "@/components/navigation/nav-main"
import { NavSecondary } from "@/components/navigation/nav-secondary"
import { NavUser } from "@/components/navigation/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "homelab",
    email: "node@n-downloader.local",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Control room",
      url: "/",
      icon: <HouseLineIcon />,
      isActive: true,
    },
    {
      title: "Downloads",
      url: "/downloads",
      icon: <DownloadSimpleIcon />,
      items: [
        {
          title: "Link grabber",
          url: "/downloads/link-grabber",
        },
        {
          title: "Host accounts",
          url: "/downloads/host-accounts",
        },
        {
          title: "Extraction",
          url: "/downloads/extraction",
        },
      ],
    },
    {
      title: "Torrents",
      url: "/torrents",
      icon: <MagnetIcon />,
      items: [
        {
          title: "Swarm",
          url: "/torrents/swarm",
        },
        {
          title: "Trackers",
          url: "/torrents/trackers",
        },
        {
          title: "Ratio rules",
          url: "/torrents/ratio-rules",
        },
      ],
    },
    {
      title: "Queue",
      url: "/queue",
      icon: <QueueIcon />,
      items: [
        {
          title: "Priorities",
          url: "/queue/priorities",
        },
        {
          title: "Scheduler",
          url: "/queue/scheduler",
        },
      ],
    },
    {
      title: "History",
      url: "/history",
      icon: <ActivityIcon />,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: <GearIcon />,
      items: [
        {
          title: "Storage",
          url: "/settings/storage",
        },
        {
          title: "Bandwidth",
          url: "/settings/bandwidth",
        },
        {
          title: "Safety",
          url: "/settings/safety",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Service health",
      url: "/settings/service-health",
      icon: <SpeedometerIcon />,
    },
    {
      title: "Support",
      url: "/settings/support",
      icon: <LifebuoyIcon />,
    },
    {
      title: "Feedback",
      url: "/settings/feedback",
      icon: <PaperPlaneTiltIcon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r border-[#171512]" variant="inset" {...props}>
      <SidebarHeader className="border-b border-[#171512]/15 bg-[#f8f5ed]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center border border-[#171512] bg-[#171512] text-[#f7f4ef]">
                  <ArrowClockwiseIcon className="size-4" weight="bold" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">n-downloader</span>
                  <span className="truncate text-xs text-sidebar-foreground/65">
                    local engine
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-[#eee9df]">
        <NavMain items={data.navMain} />
        <div className="mx-2 my-2 border border-[#171512]/20 bg-[#f8f5ed] p-3 text-xs">
          <div className="flex items-center gap-2 font-semibold">
            <HardDrivesIcon />
            Storage
          </div>
          <div className="mt-3 h-2 bg-[#d8cfbf]">
            <div className="h-full w-[62%] bg-[#ce3f21]" />
          </div>
          <div className="mt-2 flex justify-between text-[#635d53]">
            <span>1.8 TB used</span>
            <span>62%</span>
          </div>
        </div>
        <div className="mx-2 border border-[#171512]/20 bg-[#171512] p-3 text-xs text-[#f7f4ef]">
          <div className="flex items-center gap-2 font-semibold">
            <ChartPieSliceIcon />
            Ratio
          </div>
          <p className="mt-2 text-2xl font-semibold">1.94</p>
          <p className="text-white/55">global torrent share</p>
        </div>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="border-t border-[#171512]/15 bg-[#f8f5ed]">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
