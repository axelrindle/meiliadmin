import PageSetApiKey from '@/pages/PageSetApiKey'
import { useApiKey } from '@/store'
import { MeiliSearch } from 'meilisearch'
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'

interface Context {
    apiKey?: string
    client?: MeiliSearch

    error?: Error

    isPending: boolean
}

interface Props {
    children: ReactNode
}

const MeiliContext = createContext<Context>({} as Context)

export default function MeiliProvider({ children }: Props) {
    const [error, setError] = useState<Error>()
    const [verified, setVerified] = useState(false)

    const { host, apiKey } = useApiKey()

    const client = useMemo(() => {
        if(!host || !apiKey) {
            return undefined
        }

        try {
            const client = new MeiliSearch({
                host,
                apiKey,
            })

            setError(undefined)

            return client
        } catch (error) {
            setError(error as Error)

            return undefined
        }
    }, [apiKey, host])

    useEffect(() => {
        async function connect() {
            try {
                const version = await client?.getVersion()

                setVerified(version !== undefined)

                return version
            } catch (error) {
                setError(error as Error)
                return null
            }
        }

        connect()
    }, [client])

    const context = useMemo<Context>(() => ({
        apiKey, client,
        error,

        isPending: !!client && !verified && !error
    }), [apiKey, client, error, verified])

    return (
        <MeiliContext.Provider
            value={context}
        >
            {verified ? children : <PageSetApiKey />}
        </MeiliContext.Provider>
    )
}

export function useMeili() {
    return useContext(MeiliContext)
}
