// Vercel serverless entry. The buildCommand emits dist/server/server.js with a
// default export of `{ fetch }` (a Web Fetch handler). Vercel's Node runtime
// natively accepts a function that takes a Request and returns a Response.
import server from "../dist/server/server.js"

export default (request) => server.fetch(request)
