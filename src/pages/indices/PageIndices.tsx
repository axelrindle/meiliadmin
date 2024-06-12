import { useIndices } from '@/api'
import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { useRef, useState } from 'react'
import ModalCreate from './ModalCreate'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightRotate, faPlus } from '@fortawesome/free-solid-svg-icons'
import { IndexObject } from 'meilisearch'
import { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { DataTable } from '@/components/ui/data-table'
import ModalDetails from './ModalDetails'

const columns: ColumnDef<IndexObject>[] = [
    {
        accessorKey: 'uid',
        header: 'Name',
    },
    {
        accessorKey: 'primaryKey',
        header: 'Primary Key',
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
]

function Content() {
    const [index, setIndex] = useState<IndexObject>()
    const openModal = useRef<HTMLButtonElement>(null)

    const { data } = useIndices()

    return (<>
        <DataTable
            columns={columns}
            data={data?.results ?? []}
            onClickRow={row => {
                setIndex(row.original)
                openModal.current?.click()
            }}
        />

        <ModalDetails
            ref={openModal}
            index={index}
        />
    </>)
}

export default function PageIndices() {
    const openModal = useRef<HTMLButtonElement>(null)

    const { refetch } = useIndices()

    return (<>
        <CardHeader>
            <CardTitle>
                Indices
            </CardTitle>
            <CardDescription>
                An index is a group of documents with associated settings. It is comparable to a table in SQL or a collection in MongoDB.
            </CardDescription>
        </CardHeader>

        <CardContent>
            <div className="space-x-4">
                <Button
                    variant="outline"
                    onClick={() => refetch()}
                >
                    <FontAwesomeIcon icon={faArrowRightRotate} />
                    <span className="ml-2">
                        Refresh
                    </span>
                </Button>
                <Button
                    className='mb-8'
                    onClick={() => openModal.current?.click()}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span className="ml-2">
                        New Index
                    </span>
                </Button>
            </div>

            <Content />
        </CardContent>

        <ModalCreate
            ref={openModal}
        />
    </>)
}
