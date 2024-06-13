import { useMeili } from '@/context/MeiliProvider'
import { useQuery } from '@tanstack/react-query'
import { TasksQuery } from 'meilisearch'
import { useMemo } from 'react'
import { useInterval } from 'usehooks-ts'

export function useTasks(params: TasksQuery = {}) {
    const { client } = useMeili()

    return useQuery({
        queryKey: ['meili', 'tasks', JSON.stringify(params)],
        queryFn: () => client!.getTasks(params)
    })
}

export function useRunningTasks() {
    return useTasks({ statuses: ['enqueued', 'processing'] })
}

export function useTask(uid: number) {
    const { client } = useMeili()

    return useQuery({
        queryKey: ['meili', 'task', uid],
        queryFn: () => client!.getTask(uid)
    })
}

export function useWaitForTask(uid: number) {
    const { data, error, refetch } = useTask(uid)

    const isProcessing = useMemo(
        () => data?.status === 'enqueued' || data?.status === 'processing',
        [data]
    )

    useInterval(
        async () => {
            await refetch()
        },
        isProcessing ? 1000 : null
    )

    return {
        isDone: !isProcessing,
        task: data,
        error,
    }
}
