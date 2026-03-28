import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// We need an empty plugin array or just react for testing component
// but since we are testing API route which uses Next.js app directory structure
// we need to set alias.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node', // Since we are primarily testing API routes here, 'node' is good. We can use // @vitest-environment jsdom inside UI files
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/tests/e2e/**'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
