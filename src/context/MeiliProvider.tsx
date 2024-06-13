import PageBoot from '@/pages/PageBoot'
import PageSetApiKey from '@/pages/PageSetApiKey'
import { useApiKey } from '@/store'
import { MeiliSearch } from 'meilisearch'
import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'

type State = 'boot' | 'uninitialized' | 'pending' | 'ready'

interface Context {
    error?: Error
    client?: MeiliSearch
}

interface Props {
    children: ReactNode
}

const MeiliContext = createContext<Context>({} as Context)

async function connect(host?: string, apiKey?: string): Promise<MeiliSearch | undefined> {
    if(!host || !apiKey) {
        return undefined
    }

    const client = new MeiliSearch({
        host,
        apiKey,
    })

    const version = await client.getVersion()

    console.debug(`Connected to MeiliSearch ${version.pkgVersion}`)

    return client
}

export default function MeiliProvider({ children }: Props) {
    const [error, setError] = useState<Error>()
    const [client, setClient] = useState<MeiliSearch>()
    const [state, setState] = useState<State>('boot')

    const { host, apiKey, setHost, setKey } = useApiKey()

    const doConnect = useCallback((host?: string, apiKey?: string) => {
        setState('pending')

        connect(host, apiKey)
            .then(client => {
                setClient(client)
                setError(undefined)

                if (client) {
                    setHost(host)
                    setKey(apiKey)

                    setState('ready')
                } else {
                    setState('uninitialized')
                }
            })
            .catch(error => {
                setError(error)
                setState('uninitialized')
            })
    }, [setHost, setKey])

    useEffect(() => {
        doConnect(host, apiKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (state !== 'ready') {
            return
        }

        if (!host || !apiKey) {
            setError(undefined)
            setClient(undefined)
            setState('uninitialized')
        }
    }, [apiKey, host, state])

    const context = useMemo<Context>(() => ({
        error, client,
    }), [client, error])

    switch (state) {
    case 'boot':
        return <PageBoot/>

    case 'uninitialized':
    case 'pending':
        return (
            <MeiliContext.Provider
                value={context}
            >
                <PageSetApiKey
                    onSubmit={({ host, apiKey }) => doConnect(host, apiKey)}
                    isPending={state === 'pending'}
                />
            </MeiliContext.Provider>
        )

    case 'ready':
        return (
            <MeiliContext.Provider
                value={context}
            >
                {children}
            </MeiliContext.Provider>
        )
    }
}

export function useMeili() {
    return useContext(MeiliContext)
}
