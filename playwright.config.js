// @ts-check
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 45 * 1000,
  fullyParallel: false,

  reporter: [["html", { open: "never" }], ["list"]],

  use: {
    trace: "on-first-retry",
    screenshot: "on",
    video: "on",
    actionTimeout: 10 * 1000,
    navigationTimeout: 40 * 1000,
    viewport: { width: 1280, height: 720 },
    locale: "en-US",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          slowMo: 500,
          headless: !!process.env.CI,
        },
      },
    },
  ],
});
