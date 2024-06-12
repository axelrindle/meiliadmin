import { useMeili } from '@/context/MeiliProvider'
import { useQuery } from '@tanstack/react-query'

export function useTask(uid: number) {
    const { client } = useMeili()

    return useQuery({
        queryKey: ['meili', 'task', uid],
        queryFn: () => client!.getTask(uid)
    })
}
