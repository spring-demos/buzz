import { createServer } from "vite";

// Preview-only: give relay queries a stable subscription id so a scripted mock relay can answer them.
const stableSubId = {
  name: "spring-stable-subid",
  enforce: "pre",
  transform(code, id) {
    if (id.includes("shared/lib/nostr-client")) {
      return code.replace("Date.now().toString(36)", '"spring"');
    }
  },
};

const port = parseInt(process.env.PORT || "5173", 10);
const server = await createServer({
  plugins: [stableSubId],
  server: { port, strictPort: true, host: "127.0.0.1" },
});
await server.listen();
server.printUrls();
