import { useMeili } from '@/context/MeiliProvider'
import { useQuery } from '@tanstack/react-query'

export function useIndices() {
    const { client } = useMeili()

    return useQuery({
        queryKey: ['meili', 'indices', 'list'],
        queryFn: async () => client!.getIndexes()
    })
}
