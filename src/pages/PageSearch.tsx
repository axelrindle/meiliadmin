import { useIndices } from '@/api'
import { useSearch } from '@/api/search'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
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
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import hightlight from '@/lib/highlight-hits'
import { zodResolver } from '@hookform/resolvers/zod'
import { SearchResponse } from 'meilisearch'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocalStorage } from 'usehooks-ts'
import { z } from 'zod'

const schema = z.strictObject({
    index: z.string(),
    query: z.string(),
})

type Schema = z.infer<typeof schema>

interface ResultsProps {
    response: SearchResponse
}

function Results({ response }: ResultsProps) {
    const { hits } = response
    const highlighted = useMemo(
        () => hits.map(hit => hightlight(hit)),
        [hits]
    )

    const keys = useMemo(
        () => Array.from(new Set(
            hits.flatMap(Object.keys).filter(key => !key.startsWith('_'))
        )),
        [hits]
    )

    const [selected, setSelected] = useState<Record<string, boolean>>({})
    const selectedKeys = useMemo(
        () =>
            Object.entries(selected)
                .filter(([, value]) => value)
                .reduce<string[]>((prev, [key]) => [ ...prev, key ], []),
        [selected]
    )

    useEffect(() => {
        setSelected(keys.reduce((prev, curr) => ({ ...prev, [curr]: true }), {}))
    }, [keys, setSelected])

    return (<>
        <Label className='mt-4'>
            Shown Attributes
        </Label>
        <div className="flex flex-row gap-x-2">
            {keys.map((key, index) => (
                <Badge
                    key={`key-${index}`}
                    variant={selected[key] ? 'default' : 'outline'}
                    className='cursor-pointer'
                    onClick={() => setSelected({
                        ...selected,
                        [key]: !selected[key],
                    })}
                >
                    {key}
                </Badge>
            ))}
        </div>
        <p className="text-sm text-muted-foreground">
            Show or hide attributes in the results.
        </p>

        <Separator className='my-4' />

        <ul className='select-text space-y-4 text-sm'>
            {highlighted.map((hit, index) => (
                <li
                    key={`hit-${index}`}
                    className='rounded-lg bg-slate-100 p-4 shadow dark:bg-slate-900'
                >
                    <pre>
                        <code>
                            {JSON.stringify(hit, selectedKeys, 4)}
                        </code>
                    </pre>
                </li>
            ))}
        </ul>
    </>)
}

export default function PageSearch() {
    const { data } = useIndices()

    const [defaultValues, setDefaultValues] = useLocalStorage<Partial<Schema>>('search-form', {
        index: '',
    })

    const form = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues,
    })

    const { index, query } = form.watch()

    useEffect(() => setDefaultValues({ index }), [index, setDefaultValues])

    const { data: results } = useSearch(index, query)

    return (<>
        <Header />

        <div className="container mx-auto my-8 flex-1">
            <Card className='min-w-64'>
                <CardHeader>
                    <CardTitle className='space-x-2'>
                        Search
                    </CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-y-4'>
                    <Form {...form}>
                        <form className='grid grid-cols-2 gap-x-6'>
                            <FormField
                                control={form.control}
                                name="index"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Index
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select an index" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {data?.results.map((index, i) => (
                                                    <SelectItem
                                                        key={`index-${i}`}
                                                        value={index.uid}
                                                    >
                                                        {index.uid}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Select an index to begin searching.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="query"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Query
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Search for something in the selected index.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>

                    {
                        index === '' ?
                            (<p>Select an index</p>) :
                            query === '' ?
                                (<p>Begin typing to search</p>) :
                                results ?
                                    <Results response={results} /> :
                                    null
                    }
                </CardContent>
            </Card>
        </div>

        <Footer />
    </>)
}
