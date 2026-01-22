// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  // 📁 Де шукати тести
 testDir: './tests',
  
  // ⏱️ Таймаут для кожного тесту (30 секунд)
  timeout: 30 * 1000,
  
  // 🔄 Retry: скільки разів перезапустити тест якщо він впав
  retries: process.env.CI ? 2 : 0, // На CI - 2 retry, локально - 0
  
  // 👥 Паралельність: скільки тестів запускати одночасно
  workers: process.env.CI ? 2 : undefined,
  
  // 📊 Репортери
  reporter: [
    ['html', { open: 'never' }], // HTML звіт
    ['list'], // Список в консолі
    ['json', { outputFile: 'test-results/results.json' }], // JSON для CI/CD
  ],
  
  // 🎯 Глобальні налаштування для всіх тестів
  use: {
    // 🌐 Base URL
    baseURL: process.env.BASE_URL || 'https://www.aliexpress.com',
    
    // 📸 Скріншоти
    screenshot: 'only-on-failure', // Тільки при помилках
    
    // 🎥 Відео
    video: 'retain-on-failure', // Зберігати тільки при помилках
    
    // 📝 Trace (детальні логи)
    trace: 'on-first-retry', // Тільки при першому retry
    
    // ⏱️ Таймаути для різних дій
    actionTimeout: 10 * 1000, // 10 секунд на кожну дію (click, fill і т.д.)
    navigationTimeout: 30 * 1000, // 30 секунд на навігацію
    
    // 🌍 Locale і timezone
    locale: 'en-US',
    timezoneId: 'America/New_York',
    
    // 🍪 Cookies і storage state (для збереження сесії)
    // storageState: 'auth.json', // Розкоментувати якщо використовуєте
    
    // 📏 Viewport (розмір вікна браузера)
    viewport: { width: 1280, height: 720 },
    
    // 🎭 Emulate
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
    
    // 🔐 Ігнорувати HTTPS помилки (тільки для dev середовища!)
    ignoreHTTPSErrors: true,
  },

  // 🖥️ Проекти (різні браузери і пристрої)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    
    // 📱 Мобільні пристрої
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 13'] },
    },
    
    // 🖥️ Різні розміри екранів
    {
      name: 'desktop-1920',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],

  // 🌐 Web Server (якщо потрібно запустити локальний сервер перед тестами)
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120 * 1000,
  // },

  // 📂 Output директорії
  outputDir: 'test-results',
  
  // 🗂️ Де зберігати скріншоти, відео, trace
  snapshotDir: 'tests/__snapshots__',
});