import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            'meilisearch': resolve(__dirname, 'node_modules/meilisearch/dist/bundles/meilisearch.umd.js')
        },
        mainFields: ['browser', 'module'],
    },

    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    react: [
                        'react',
                        'react-dom',
                        'react-router-dom',
                    ],
                    ui: [
                        '@fortawesome/fontawesome-svg-core',
                        '@fortawesome/free-solid-svg-icons',
                        '@fortawesome/react-fontawesome',
                        '@radix-ui/react-dialog',
                        '@radix-ui/react-label',
                        '@radix-ui/react-popover',
                        '@radix-ui/react-scroll-area',
                        '@radix-ui/react-slot',
                        '@radix-ui/react-toast',
                        'lucide-react',
                    ],
                },
            },
        },
    },
})
