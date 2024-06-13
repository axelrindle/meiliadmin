import { useTernaryDarkMode } from 'usehooks-ts'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'
import { useEffect } from 'react'

const html = document.querySelector('html') as HTMLHtmlElement

export default function DarkModeToggle() {
    const { isDarkMode, setTernaryDarkMode } = useTernaryDarkMode()

    useEffect(() => {
        if (isDarkMode) {
            html.classList.add('dark')
        } else {
            html.classList.remove('dark')
        }
    }, [isDarkMode])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">
                        Toggle theme
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTernaryDarkMode('light')}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTernaryDarkMode('dark')}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTernaryDarkMode('system')}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
