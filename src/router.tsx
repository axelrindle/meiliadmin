import { createBrowserRouter } from 'react-router-dom'
import LayoutHome from './layout/LayoutHome'
import PageHome from './pages/PageHome'
import PageApiKeys from './pages/api-key/PageApiKeys'
import PageIndices from './pages/indices/PageIndices'
import PageSearch from './pages/PageSearch'

const router = createBrowserRouter([
    {
        path: '/',
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
    },
    {
        path: '/search',
        element: <PageSearch />,
    },
], {
    basename: import.meta.env.BASE_URL,
})

export default router
