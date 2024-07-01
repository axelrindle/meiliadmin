import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import {
    Link,
    Outlet,
    To,
    useLocation,
    useNavigate
} from 'react-router-dom'

type Link = {
    label: string
    href: To
    disabled?: boolean
}

const links: Link[] = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Indices',
        href: '/indices',
    },
    {
        label: 'API Keys',
        href: '/api-keys',
    },
]

export default function LayoutHome() {
    const navigate = useNavigate()
    const location = useLocation()

    return (<>
        <Header />

        <div className="container mx-auto my-8 flex-1">
            <div className="flex flex-row items-start gap-x-16">

                <Card className='min-w-64'>
                    <CardHeader>
                        <CardTitle>
                            Navigation
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-y-4'>
                        {links.map((link, index) => (
                            <Button
                                key={`link-${index}`}
                                onClick={() => navigate(link.href)}
                                variant={location.pathname === link.href ? 'default' : 'link'}
                                disabled={link.disabled}
                            >
                                {link.label}
                            </Button>
                        ))}
                    </CardContent>
                </Card>

                <Card className="flex-1">
                    <Outlet />
                </Card>

            </div>
        </div>

        <Footer />
    </>)
}
