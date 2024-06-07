import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { useTernaryDarkMode } from 'usehooks-ts'
import logoDark from '../../assets/meilisearch-logo-dark.svg'
import logoLight from '../../assets/meilisearch-logo-light.svg'

const variants = cva(null, {
    variants: {
        size: {
            default: 'h-10',
            large: 'h-20',
        }
    },
    defaultVariants: {
        size: 'default',
    }
})

interface Props extends
    React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof variants> {
}

export default function Logo({ size, className, ...props }: Props) {
    const { isDarkMode } = useTernaryDarkMode()

    return (
        <img
            {...props}
            src={isDarkMode ? logoDark : logoLight}
            className={cn(variants({ size, className }))}
        />
    )
}
