import { useMeili } from '@/context/MeiliProvider'
import { useMutation, useQuery } from '@tanstack/react-query'
import { KeyCreation, KeysQuery } from 'meilisearch'

export function useKeys(options?: KeysQuery) {
    const { client } = useMeili()

    return useQuery({
        queryKey: ['meili', 'keys', 'list'],
        queryFn: async () => client!.getKeys(options)
    })
}

export function useKey(keyOrUid: string) {
    const { client } = useMeili()

    return useQuery({
        queryKey: ['meili', 'keys', 'get', keyOrUid],
        queryFn: async () => client!.getKey(keyOrUid)
    })
}

export function useCreateKey() {
    const { client } = useMeili()

    return useMutation({
        mutationKey: ['meili', 'keys', 'create'],
        mutationFn: async (options: KeyCreation) => client!.createKey(options)
    })
}

export function useDeleteKey(keyOrUid: string) {
    const { client } = useMeili()

    return useMutation({
        mutationKey: ['meili', 'keys', 'delete', keyOrUid],
        mutationFn: async () => client!.deleteKey(keyOrUid)
    })
}
