import { useIndices } from '@/api'
import { useCreateKey, useKeys } from '@/api/key'
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
import MultipleSelector, { Option } from '@/components/ui/multi-select'
import { ApiKeyActions } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    forwardRef,
    useCallback,
    useEffect,
    useMemo,
    useState
} from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const options: Option[] = ApiKeyActions.map(action => ({
    label: action.name,
    value: action.name,
    description: action.description,
}))

const formSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),

    indexes: z.array(z.string()).min(1),
    actions: z.array(z.string()).min(1),

    expiresAt: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

const ModalCreate = forwardRef<HTMLButtonElement>(function ModalCreate(_props, ref) {
    const [open, setOpen] = useState(false)

    const { refetch } = useKeys()
    const { data: indices } = useIndices()

    const optionsIndices = useMemo(() => indices?.results.map<Option>(index => ({
        label: index.uid,
        value: index.uid,
    })), [indices])

    const { mutateAsync } = useCreateKey()

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            actions: [],
            indexes: [],
            expiresAt: undefined,
        }
    })
    const onSubmit = useCallback(async (data: FormData) => {
        await mutateAsync({
            name: data.name,
            description: data.description || undefined,
            indexes: data.indexes,
            actions: data.actions,
            expiresAt: /* data.expiresAt === undefined ? null : dayjs(data.expiresAt).toDate() */null,
        })
        await refetch()
        setOpen(false)
    }, [mutateAsync, refetch])

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
                    Open Key Modal
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create a new API key
                    </DialogTitle>
                    <DialogDescription>
                        Fill out the form below to create a new MeiliSearch API key.
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
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="an api key for my awesome application"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        An optional description for the key
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <FormField
                            control={form.control}
                            name="expiresAt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Expiry Date
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='datetime-local'
                                            placeholder="an api key for my awesome application"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Date and time when the key will expire
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        <FormField
                            control={form.control}
                            name="actions"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Actions
                                    </FormLabel>
                                    <FormControl>
                                        <MultipleSelector
                                            options={options}
                                            placeholder="Select actions to attach …"
                                            emptyIndicator={
                                                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                    no results found.
                                                </p>
                                            }
                                            inputProps={{
                                                id: 'actions'
                                            }}
                                            value={options.filter(option => field.value.findIndex(selected => option.value === selected) > -1)}
                                            onChange={options => field.onChange(options.map(o => o.value))}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        A list of API actions permitted for the key
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="indexes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Indices
                                    </FormLabel>
                                    <FormControl>
                                        <MultipleSelector
                                            options={optionsIndices}
                                            placeholder="Select indices to attach …"
                                            emptyIndicator={
                                                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                    no results found.
                                                </p>
                                            }
                                            inputProps={{
                                                id: 'indexes'
                                            }}
                                            value={optionsIndices!.filter(option => field.value.findIndex(selected => option.value === selected) > -1)}
                                            onChange={options => field.onChange(options.map(o => o.value))}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        An array of indices the key is authorized to act on.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                type='submit'
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
