import { defineConfig } from "vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

type AppMode = "landing" | "downloader"

const APP_MODE = (process.env.APP_MODE ?? "downloader") as AppMode

if (APP_MODE !== "landing" && APP_MODE !== "downloader") {
  throw new Error(
    `Invalid APP_MODE="${process.env.APP_MODE}". Expected "landing" or "downloader".`,
  )
}

// Strip the inactive route group from codegen so the unused half is never bundled.
const routeFileIgnorePattern =
  APP_MODE === "landing" ? "\\(app\\)" : "\\(home\\)"

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  define: {
    "import.meta.env.APP_MODE": JSON.stringify(APP_MODE),
  },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart({ router: { routeFileIgnorePattern } }),
    viteReact(),
  ],
})

export default config
