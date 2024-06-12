import { useIndex, useIndices } from '@/api'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useToast } from '@/components/ui/use-toast'
import { useMeili } from '@/context/MeiliProvider'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IndexObject } from 'meilisearch'
import { forwardRef, useCallback, useState } from 'react'

interface ModalProps {
    index?: IndexObject
}

const ModalDetails = forwardRef<HTMLButtonElement, ModalProps>(function Modal({ index }, ref) {
    const [open, setOpen] = useState(false)

    const { client } = useMeili()
    const { toast } = useToast()

    const { refetch } = useIndices()
    const { data: settings } = useIndex(index?.uid)

    const doDelete = useCallback(async () => {
        try {
            await client?.deleteIndex(index!.uid)
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
    }, [client, index, refetch, toast])

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
                        {index?.uid}
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className='max-h-96 border bg-slate-50 dark:bg-slate-900'>
                    <pre>
                        <code>
                            {JSON.stringify(settings, null, 4)}
                        </code>
                    </pre>
                    <ScrollBar />
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
