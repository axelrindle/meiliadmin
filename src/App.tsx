import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from './components/ui/toaster'
import MeiliProvider from './context/MeiliProvider'
import router from './router'

const client = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={client}>
            <ReactQueryDevtools
                initialIsOpen={false}
                buttonPosition='bottom-left'
            />
            <MeiliProvider>
                <RouterProvider router={router} />
                <Toaster />
            </MeiliProvider>
        </QueryClientProvider>
    )
}
