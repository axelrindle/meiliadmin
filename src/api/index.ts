import { useMeili } from '@/context/MeiliProvider'
import { useMutation, useQuery } from '@tanstack/react-query'
import { IndexOptions } from 'meilisearch'

export function useIndices() {
    const { client } = useMeili()

    return useQuery({
        queryKey: ['meili', 'indices', 'list'],
        queryFn: () => client!.getRawIndexes()
    })
}

interface IndexCreation {
    uid: string
    options?: IndexOptions
}

export function useCreateIndex() {
    const { client } = useMeili()

    return useMutation({
        mutationKey: ['meili', 'keys', 'create'],
        mutationFn: ({uid, options}: IndexCreation) => client!.createIndex(uid, options ?? {})
    })
}

export function useIndex(uid?: string) {
    const { client } = useMeili()

    return useQuery({
        enabled: uid !== undefined,
        queryKey: ['meili', 'index-settings', uid],
        queryFn: async () => {
            const index = await client!.getIndex(uid!)

            return await index.getSettings()
        }
    })
}
