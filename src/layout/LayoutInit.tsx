import DarkModeToggle from '@/components/DarkModeToggle'
import Footer from '@/components/Footer'
import Logo from '@/components/ui/logo'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export default function LayoutInit({ children }: Props) {
    return (<>
        <div className='container mx-auto flex flex-1 flex-col items-center justify-center gap-y-8'>
            <Logo
                size='large'
                className='mb-16'
            />

            {children}

            <DarkModeToggle />
        </div>

        <Footer />
    </>)
}
