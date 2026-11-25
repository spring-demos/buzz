import { createServer } from "vite";

// Preview-only: the repositories page reads its data from a Nostr relay over WebSocket, which
// the preview cannot serve to the browser. Default the page to the app's own built-in DEV
// "preview=repositories" mode (its mock-repos data) when no preview query is given.
const defaultPreview = {
  name: "spring-default-repos-preview",
  enforce: "pre",
  transform(code, id) {
    if (id.includes("features/repos/ui/ReposPage")) {
      return code.replace('.get("preview")', '.get("preview") ?? "repositories"');
    }
  },
};

const port = parseInt(process.env.PORT || "5173", 10);
const server = await createServer({
  plugins: [defaultPreview],
  server: { port, strictPort: true },
});
await server.listen();
server.printUrls();
