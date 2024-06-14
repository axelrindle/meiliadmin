import { createBrowserRouter } from 'react-router-dom'
import LayoutHome from './layout/LayoutHome'
import PageHome from './pages/PageHome'
import PageApiKeys from './pages/api-key/PageApiKeys'
import PageIndices from './pages/indices/PageIndices'

function join(...args: string[]) {
    return args.map((part, i) => {
        if (i === 0) {
            return part.trim().replace(/[/]*$/g, '')
        } else {
            return part.trim().replace(/(^[/]*|[/]*$)/g, '')
        }
    }).filter(x=>x.length).join('/')
}

export function p(...segments: string[]): string {
    return join(import.meta?.env?.BASE_URL ?? '/', ...segments)
}

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
                path: p('indices'),
                element: <PageIndices />,
            },
            {
                path: p('api-keys'),
                element: <PageApiKeys />,
            },
        ],
    }
])

export default router
