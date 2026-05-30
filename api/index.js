// Vercel's Node runtime invokes this with (IncomingMessage, ServerResponse).
// TanStack Start's bundled fetch handler needs a Web Request with an absolute
// URL, so we convert both directions here.
import server from "../dist/server/server.js"

export default async function handler(req, res) {
  const host = req.headers["x-forwarded-host"] ?? req.headers.host ?? "localhost"
  const proto = req.headers["x-forwarded-proto"] ?? "https"
  const url = `${proto}://${host}${req.url ?? "/"}`

  const headers = new Headers()
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v)
    } else if (value != null) {
      headers.set(key, value)
    }
  }

  const hasBody = req.method !== "GET" && req.method !== "HEAD"
  const request = new Request(url, {
    method: req.method,
    headers,
    body: hasBody ? req : undefined,
    duplex: "half",
  })

  const response = await server.fetch(request)

  res.statusCode = response.status
  response.headers.forEach((value, key) => {
    res.setHeader(key, value)
  })

  if (!response.body) {
    res.end()
    return
  }

  const reader = response.body.getReader()
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      res.write(value)
    }
  } finally {
    res.end()
  }
}
