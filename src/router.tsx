import { createBrowserRouter } from 'react-router-dom'
import LayoutHome from './layout/LayoutHome'
import PageHome from './pages/PageHome'
import PageApiKeys from './pages/api-key/PageApiKeys'
import PageIndices from './pages/indices/PageIndices'
import PageSearch from './pages/PageSearch'

function join(...args: string[]) {
    return args.map((part, i) => {
        if (i === 0) {
            return part.trim().replace(/[/]*$/g, '')
        } else {
            return part.trim().replace(/(^[/]*|[/]*$)/g, '')
        }
    })
        .filter(x => x.length > 0)
        .join('/')
}

export function p(...segments: string[]): string {
    if (import.meta?.env?.BASE_URL !== undefined) {
        const url = new URL(join(...segments), import.meta?.env?.BASE_URL)
        return url.pathname
    }

    return '/' + join(...segments)
}

const router = createBrowserRouter([
    {
        path: p(),
        element: <LayoutHome />,
        children: [
            {
                index: true,
                element: <PageHome />,
            },
            {
                path: p('indices'),
                element: <PageIndices />,
            },
            {
                path: p('api-keys'),
                element: <PageApiKeys />,
            },
        ],
    },
    {
        path: p('search'),
        element: <PageSearch />,
    },
])

export default router
