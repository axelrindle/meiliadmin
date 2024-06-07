import { useKeys } from '@/api/key'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useToast } from '@/components/ui/use-toast'
import { useMeili } from '@/context/MeiliProvider'
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Key } from 'meilisearch'
import { forwardRef, useCallback, useState } from 'react'

interface ModalProps {
    apiKey?: Key
}

const ModalDetails = forwardRef<HTMLButtonElement, ModalProps>(function Modal({ apiKey }, ref) {
    const [open, setOpen] = useState(false)

    const { client } = useMeili()
    const { toast } = useToast()

    const { refetch } = useKeys()

    const doCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(apiKey!.key)
            toast({
                title: 'Copied to clipboard',
                description: 'The API key has been copied to your clipboard.',
            })
            setOpen(false)
        } catch (error) {
            console.error(error)
            toast({
                title: 'Copy failed',
                description: (error as Error).message,
                variant: 'destructive',
            })
        }
    }, [apiKey, toast])

    const doDelete = useCallback(async () => {
        try {
            await client?.deleteKey(apiKey!.uid)
            await refetch()
            setOpen(false)
        } catch (error) {
            console.error(error)
            toast({
                title: 'Deletion failed',
                description: (error as Error).message,
                variant: 'destructive',
            })
        }
    }, [apiKey, client, refetch, toast])

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    ref={ref}
                    className='hidden'
                >
                    Open Key Modal
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {apiKey?.name}
                    </DialogTitle>
                </DialogHeader>

                <p className='font-medium'>
                    Actions
                </p>

                <ul className='list-inside list-disc'>
                    {apiKey?.actions.map((action, index) => (
                        <li
                            key={`action-${index}`}
                        >
                            {action === '*' ? 'All' : action}
                        </li>
                    ))}
                </ul>

                <p className='font-medium'>
                    Indices
                </p>

                <ul className='list-inside list-disc'>
                    {apiKey?.indexes.map((el, index) => (
                        <li
                            key={`index-${index}`}
                        >
                            {el === '*' ? 'All' : el}
                        </li>
                    ))}
                </ul>

                <p className='font-medium'>
                    Key
                </p>

                <ScrollArea className='select-text bg-muted'>
                    <div className="p-4">
                        <code>
                            {apiKey?.key}
                        </code>
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>

                <DialogFooter>
                    <Button
                        variant="destructive"
                        onClick={() => doDelete()}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                        <span className="ml-2">
                            Delete
                        </span>
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => doCopy()}
                    >
                        <FontAwesomeIcon icon={faCopy} />
                        <span className="ml-2">
                            Copy Key
                        </span>
                    </Button>
                    <DialogClose asChild>
                        <Button
                            variant="secondary"
                        >
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
})

export default ModalDetails
