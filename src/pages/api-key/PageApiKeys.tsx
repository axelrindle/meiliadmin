import { useKeys } from '@/api/key'
import { Button } from '@/components/ui/button'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { Key } from 'meilisearch'
import { useRef, useState } from 'react'
import ModalCreate from './ModalCreate'
import ModalDetails from './ModalDetails'

const columns: ColumnDef<Key>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
        cell({ getValue, row }) {
            return (
                <div className="flex flex-col gap-y-1.5">
                    <p>{getValue() as string}</p>
                    <p className="text-xs text-slate-500">
                        {row.original.description}
                    </p>
                </div>
            )
        },
    },
    {
        accessorKey: 'createdAt',
        header: 'Created',
        accessorFn: key => dayjs(key.createdAt).toISOString()
    },
    {
        accessorKey: 'updatedAt',
        header: 'Updated',
        accessorFn: key => dayjs(key.updatedAt).toISOString()
    },
    {
        accessorKey: 'expiresAt',
        header: 'Expires',
        accessorFn: key => key.expiresAt === null ? 'Never' : dayjs(key.expiresAt).toISOString()
    },
]

function Content() {
    const { data, error, isLoading, isError } = useKeys()
    const [key, setKey] = useState<Key>()

    const openModal = useRef<HTMLButtonElement>(null)

    if (isLoading) {
        return (
            <p>
                Loading
            </p>
        )
    }

    if (isError) {
        return (
            <p>
                {error.message}
            </p>
        )
    }

    return (<>
        <DataTable
            columns={columns}
            data={data?.results ?? []}
            onClickRow={row => {
                setKey(row.original)
                openModal.current?.click()
            }}
        />

        <ModalDetails
            ref={openModal}
            apiKey={key}
        />
    </>)
}

export default function PageApiKeys() {
    const openModal = useRef<HTMLButtonElement>(null)

    return (<>
        <CardHeader>
            <CardTitle>
                API Keys
            </CardTitle>
        </CardHeader>

        <CardContent>
            <Button
                className='mb-8'
                onClick={() => openModal.current?.click()}
            >
                <FontAwesomeIcon icon={faPlus} />
                <span className="ml-2">
                    New API Key
                </span>
            </Button>

            <Content />
        </CardContent>

        <ModalCreate
            ref={openModal}
        />
    </>)
}
