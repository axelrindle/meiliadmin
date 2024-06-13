import { useRunningTasks, useTasks } from '@/api/task'
import { faArrowRightRotate, faBell, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TaskStatus, Task as TaskType } from 'meilisearch'
import { useMemo, useState } from 'react'
import Paginator from './Paginator'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from './ui/card'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from './ui/dropdown-menu'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from './ui/sheet'
import { useInterval } from 'usehooks-ts'

function Task({ task }: { task: TaskType }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-lg'>
                    <span>{task.type}</span>
                    &nbsp;
                    <span className="text-sm text-muted-foreground">(#{task.uid})</span>
                    &nbsp;
                    <Badge
                        variant={task.status === 'failed' ? 'destructive' : 'secondary'}
                    >
                        {task.status}
                    </Badge>
                </CardTitle>
                <CardDescription>
                    {task.startedAt.toISOString()}
                </CardDescription>
            </CardHeader>
            {task.error ?
                (
                    <CardContent>
                        <a
                            className="mr-2 text-sm text-destructive underline underline-offset-4"
                            href={task.error.link}
                            target='_blank'
                            rel='noreferrer'
                        >
                            <span className="mr-2">{task.error.message}</span>
                            <FontAwesomeIcon icon={faExternalLinkAlt} className='text-xs text-muted-foreground' />
                        </a>
                    </CardContent>
                ) :
                null}
        </Card>
    )
}

const limit = 10

export default function Tasks() {
    const [currentPage, setCurrentPage] = useState(1)
    const [from, setFrom] = useState<number>()
    const [statuses, setStatuses] = useState<TaskStatus[]>()

    const { data, refetch, isLoading } = useTasks({ limit, from, statuses })
    const { data: runningTasks, refetch: refetchRunning } = useRunningTasks()

    const totalItems = useMemo(() => data?.total ?? 0, [data?.total])
    const totalPages = useMemo(() => Math.ceil(totalItems / limit), [totalItems])

    useInterval(() => {
        refetch()
        refetchRunning()
    }, 2000)

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size={runningTasks?.total ?? 0 > 0 ? 'default' : 'icon'}
                >
                    <FontAwesomeIcon icon={faBell} />
                    {runningTasks?.total ?? 0 > 0 ?
                        (
                            <span className="ml-2">
                                <Badge variant="outline">
                                    {runningTasks?.total}
                                </Badge>
                            </span>
                        ) :
                        null
                    }
                </Button>
            </SheetTrigger>

            <SheetContent className='flex flex-col'>
                <SheetHeader>
                    <SheetTitle>
                        <span className="mr-2">
                            Tasks
                        </span>
                        <Badge variant="secondary">
                            {totalItems}
                        </Badge>
                    </SheetTitle>
                    <SheetDescription>
                        Many Meilisearch operations are processed asynchronously in a task.
                        Asynchronous tasks allow you to make resource-intensive changes to your
                        Meilisearch project without any downtime for users.
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-4 flex flex-row items-center gap-x-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <span className='mr-2'>
                                    Filter by Status
                                </span>
                                <Badge variant="secondary">
                                    {statuses?.length ?? 0}
                                </Badge>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {Object.values(TaskStatus).map(status => (
                                <DropdownMenuCheckboxItem
                                    key={status}
                                    checked={statuses?.includes(status)}

                                    onCheckedChange={checked => {
                                        const current = statuses ?? []
                                        const selected = [...current]

                                        if (checked) {
                                            selected.push(status)
                                        } else {
                                            selected.splice(selected.indexOf(status), 1)
                                        }

                                        if (selected.length === 0) {
                                            setStatuses(undefined)
                                        } else {
                                            setStatuses(selected)
                                        }
                                    }}
                                >
                                    {status}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="flex-1"></div>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => refetch()}
                        disabled={isLoading}
                    >
                        <FontAwesomeIcon
                            icon={faArrowRightRotate}
                            spin={isLoading}
                        />
                    </Button>
                </div>

                <ScrollArea className='-mx-6 flex-1 border-y bg-slate-50 px-6 shadow-inner dark:bg-slate-800'>
                    <div className='my-6 space-y-4'>
                        {data?.results.map((task, i) => <Task key={`task-${i}`} task={task} />)}
                    </div>
                    <ScrollBar />
                </ScrollArea>

                <SheetFooter>
                    <Paginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={page => {
                            setFrom(data?.next)
                            setCurrentPage(page)
                        }}
                        showPreviousNext
                    />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
