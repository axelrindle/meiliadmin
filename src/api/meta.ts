import { useMeili } from '@/context/MeiliProvider'
import { useQuery } from '@tanstack/react-query'

export function useStats() {
    const { client } = useMeili()

    return useQuery({
        queryKey: ['meili', 'meta', 'stats'],
        queryFn: async () => client!.getStats()
    })
}

export function useHealth() {
    const { client } = useMeili()

    return useQuery({
        queryKey: ['meili', 'meta', 'health'],
        queryFn: async () => client!.health()
    })
}

export function useVersion() {
    const { client } = useMeili()

    return useQuery({
        queryKey: ['meili', 'meta', 'version'],
        queryFn: async () => client!.getVersion()
    })
}
