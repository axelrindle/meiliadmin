import { createBrowserRouter } from 'react-router-dom'
import LayoutHome from './layout/LayoutHome'
import PageHome from './pages/PageHome'
import PageApiKeys from './pages/api-key/PageApiKeys'
import PageIndices from './pages/indices/PageIndices'

const router = createBrowserRouter([
    {
        path: import.meta.env.BASE_URL,
        element: <LayoutHome />,
        children: [
            {
                index: true,
                element: <PageHome />,
            },
            {
                path: '/indices',
                element: <PageIndices />,
            },
            {
                path: '/api-keys',
                element: <PageApiKeys />,
            },
        ],
    }
])

export default router
