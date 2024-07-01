import { useApiKey } from '@/store'
import { faSearch, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import DarkModeToggle from './DarkModeToggle'
import { Button } from './ui/button'
import Logo from './ui/logo'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import Tasks from './Tasks'
import { p } from '@/router'

function ChangeMasterKey() {
    const { setKey } = useApiKey()

    return (
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
    )
}

export default function Header() {
    return (
        <header className="bg-card text-primary shadow">
            <div className="container mx-auto flex flex-row items-center gap-x-4 py-4">
                <Link to={p('')} className='contents'>
                    <Logo />

                    <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-4xl">
                        admin
                    </h1>
                </Link>

                <div className="flex-1"></div>

                <Button
                    variant="outline"
                    size="icon"
                    asChild
                >
                    <Link to={p('search')}>
                        <FontAwesomeIcon icon={faSearch} />
                    </Link>
                </Button>

                <ChangeMasterKey />

                <Tasks />

                <DarkModeToggle />
            </div>
        </header>
    )
}
