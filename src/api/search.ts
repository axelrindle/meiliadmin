import { useQuery } from '@tanstack/react-query'
import { useIndexO } from '.'

export function useSearch(uid?: string, query?: string) {
    const { data } = useIndexO(uid)

    return useQuery({
        queryKey: ['meili', 'search', uid, query],
        enabled: !!data && !!query,

        queryFn: () => data!.search(query, {
            showMatchesPosition: true,
        })
    })
}
