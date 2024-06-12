import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useMeili } from '@/context/MeiliProvider'
import LayoutInit from '@/layout/LayoutInit'
import { useApiKey } from '@/store'
import { faArrowRightRotate, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.strictObject({
    host: z.string().url(),
    apiKey: z.string().min(1),
})

type FormData = z.infer<typeof formSchema>

interface Props {
    onSubmit: (data: FormData) => void | Promise<void>
    isPending?: boolean
}

export default function PageSetApiKey({ onSubmit, isPending }: Props) {
    const { host, apiKey } = useApiKey()
    const { error } = useMeili()

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            host: host ?? 'http://localhost:7700',
            apiKey: apiKey ?? '',
        }
    })

    return (
        <LayoutInit>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    onReset={() => form.reset()}
                >
                    <Card className='max-w-xl'>
                        <CardHeader>
                            <CardTitle>
                                Enter Details
                            </CardTitle>
                            <CardDescription>
                                Please provide the <u>MeiliSearch Master Key</u> in order to proceed.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <FormField
                                control={form.control}
                                name="host"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Endpoint
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="https://search.example.org:7700"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            The endpoint of your MeiliSearch instance.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="apiKey"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Master Key
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="my api key"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            The master key grants full control over an instance and is the only key with access to endpoints for creating and deleting API keys by default.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className='flex-col space-y-2'>
                            {error === undefined ? null : <p className='text-red-500'>{error.message}</p>}

                            <Button
                                className='w-full'
                                disabled={isPending || !form.formState.isValid}
                                type='submit'
                            >
                                <span>
                                    Submit
                                </span>
                                <FontAwesomeIcon
                                    icon={isPending ? faArrowRightRotate : faDoorOpen}
                                    spin={isPending}
                                    className='ml-2'
                                />
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </LayoutInit>
    )
}
