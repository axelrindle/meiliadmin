import DarkModeToggle from '@/components/DarkModeToggle'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import Logo from '@/components/ui/logo'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useApiKey } from '@/store'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
    {
        label: 'Settings',
        href: '/settings',
        disabled: true,
    },
]

export default function LayoutHome() {
    const navigate = useNavigate()
    const location = useLocation()
    const { setKey } = useApiKey()

    return (<>
        <header className="bg-card text-primary shadow">
            <div className="container mx-auto flex flex-row items-center gap-x-4 py-4">
                <Link to="/" className='contents'>
                    <Logo />

                    <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-4xl">
                        admin
                    </h1>
                </Link>

                <div className="flex-1"></div>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant='outline'
                        >
                            Change Master Key
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='flex flex-col gap-y-4'>
                        <p>
                            Reset Master Key? This cannot be undone.
                        </p>
                        <Button
                            variant='destructive'
                            onClick={() => {
                                setKey(undefined)
                            }}
                            className='w-full'
                            size='sm'
                        >
                            <FontAwesomeIcon icon={faUserSecret} />
                            <span className="ml-2">
                                Do it
                            </span>
                        </Button>
                    </PopoverContent>
                </Popover>

                <DarkModeToggle />
            </div>
        </header>

        <div className="container mx-auto my-8">
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
    </>)
}
