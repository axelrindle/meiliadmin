import DarkModeToggle from '@/components/DarkModeToggle'
import Logo from '@/components/ui/logo'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export default function LayoutInit({ children }: Props) {
    return (<>
        <div className='container mx-auto my-24'>
            <div className='flex flex-col items-center gap-y-8'>
                <Logo
                    size='large'
                    className='mb-16'
                />

                {children}

                <DarkModeToggle />
            </div>
        </div>
    </>)
}
