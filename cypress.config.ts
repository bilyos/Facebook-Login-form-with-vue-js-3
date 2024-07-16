import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173',
    viewportWidth: 414,
    viewportHeight: 736,
    defaultCommandTimeout: 10000,
    execTimeout: 10000,
    pageLoadTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000
  }
})
