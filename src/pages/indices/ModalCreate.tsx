import { useCreateIndex, useIndices } from '@/api'
import { useRunningTasks, useTasks } from '@/api/task'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    forwardRef,
    useCallback,
    useEffect,
    useState
} from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
    name: z.string().min(1)
        .regex(/[a-zA-Z0-9-_]/g, {
            message: 'must only contain alphanumeric characters, hyphens and underscores'
        }),
})

type FormData = z.infer<typeof formSchema>

const ModalCreate = forwardRef<HTMLButtonElement>(function ModalCreate(_props, ref) {
    const [open, setOpen] = useState(false)

    // const { client } = useMeili()

    const { refetch: refetchIndices } = useIndices()
    const { refetch: refetchTasks } = useTasks()
    const { refetch: refetchRunning } = useRunningTasks()

    const { mutateAsync } = useCreateIndex()

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        }
    })
    const onSubmit = useCallback(async (data: FormData) => {
        await mutateAsync({
            uid: data.name,
        })

        await Promise.all([
            refetchIndices(),
            refetchTasks(),
            refetchRunning(),
        ])

        setOpen(false)
    }, [mutateAsync, refetchIndices, refetchRunning, refetchTasks])

    useEffect(() => {
        if (!open) {
            form.reset()
        }
    }, [form, open])

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
                    Open Index Modal
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create a new Index
                    </DialogTitle>
                    <DialogDescription>
                        Fill out the form below to create a new MeiliSearch Index.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        onReset={() => form.reset()}
                        className='space-y-4'
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="my api key"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        A human-readable name for the key
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                type='submit'
                                disabled={!form.formState.isValid}
                            >
                                Submit
                            </Button>
                            <Button
                                variant="outline"
                                type='reset'
                            >
                                Reset
                            </Button>
                            <DialogClose asChild>
                                <Button
                                    variant="secondary"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
)

export default ModalCreate
