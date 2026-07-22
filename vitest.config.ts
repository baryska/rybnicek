import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    // stejný alias jako v tsconfig.json ("@/*" → "src/*")
    alias: { "@": path.resolve(rootDir, "src") },
  },
  // testy nepracují s CSS — přeskočit PostCSS config Next.js/Tailwindu
  css: { postcss: { plugins: [] } },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
