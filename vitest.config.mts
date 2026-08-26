import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html']
    },
    alias: {
      'server-only': path.resolve(import.meta.dirname, './src/__mocks__/server-only.ts'),
    },
  },
})