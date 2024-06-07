import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useShallow } from 'zustand/react/shallow'

export interface Store {
    host?: string
    apiKey?: string

    setHost: (host?: string) => void
    setKey: (apiKey?: string) => void
}

const useStore = create(
    persist<Store>(
        (set) => ({
            setHost(host) {
                set(() => ({ host }))
            },
            setKey(apiKey) {
                set(() => ({ apiKey }))
            },
        }),
        {
            name: 'meili-admin',
        }
    )
)

export default useStore

export const useApiKey = () => useStore(
    useShallow(state => ({
        apiKey: state.apiKey, host: state.host,
        setHost: state.setHost, setKey: state.setKey
    }))
)
