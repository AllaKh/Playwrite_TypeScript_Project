import { defineConfig } from '@playwright/test';
import { config } from './tests/config.js';

export default defineConfig({
  testDir: './tests/',
  use: {
    baseURL: config.baseURL,
    headless: false,
    viewport: { width: 1280, height: 800 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 20000,
  },
  retries: 0,
});
