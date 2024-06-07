import DarkModeToggle from '@/components/DarkModeToggle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Logo from '@/components/ui/logo'
import { useMeili } from '@/context/MeiliProvider'
import { useApiKey } from '@/store'
import { faArrowRightRotate, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.strictObject({
    host: z.string().url(),
    apiKey: z.string(),
})

type FormData = z.infer<typeof formSchema>

export default function PageSetApiKey() {
    const { host, apiKey, setHost, setKey } = useApiKey()
    const { error, isPending } = useMeili()

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            host: host ?? 'http://localhost:7700',
            apiKey: apiKey ?? '',
        }
    })

    const onSubmit = useCallback((data: FormData) => {
        setHost(data.host)
        setKey(data.apiKey)
    }, [setHost, setKey])

    return (<>
        <div className='container mx-auto my-24'>
            <div className='flex flex-col items-center gap-y-8'>
                <Logo
                    size='large'
                    className='mb-16'
                />

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
                                    disabled={isPending}
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

                <DarkModeToggle />
            </div>
        </div>
    </>)
}
