import { useHealth, useStats, useVersion } from '@/api/meta'
import { Button } from '@/components/ui/button'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useApiKey } from '@/store'
import { faArrowRightRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import prettyBytes from 'pretty-bytes'
import { useCallback } from 'react'

export default function PageHome() {
    const { host } = useApiKey()

    const { data: health, refetch: refetchHealth } = useHealth()
    const { data: version, refetch: refetchVersion } = useVersion()
    const { data: stats, refetch: refetchStats } = useStats()

    const refresh = useCallback(async () => await Promise.all([
        refetchHealth(),
        refetchVersion(),
        refetchStats(),
    ]), [refetchHealth, refetchStats, refetchVersion])

    return (<>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
                Overview
            </CardTitle>

            <Button
                variant="default"
                size="icon"
                onClick={refresh}
            >
                <FontAwesomeIcon icon={faArrowRightRotate} />
            </Button>
        </CardHeader>

        <CardContent>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Instance
            </h4>

            <p>
            Host: <u>{host}</u>
            </p>

            <h4 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
            Health
            </h4>

            <p>
            Status: <u>{health?.status ?? 'unknown'}</u>
            </p>

            <h4 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
            Version
            </h4>

            <p>
            Version: <u>{version?.pkgVersion}</u>
            </p>
            <p>
            Commit SHA: <u>{version?.commitSha}</u>
            </p>
            <p>
            Release Date: <u>{version?.commitDate}</u>
            </p>

            <h4 className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight">
            Statistics
            </h4>

            <p>
            Database Size: <u>{prettyBytes(stats?.databaseSize ?? 0)}</u>
            </p>
            <p>
            Last Update: <u>{stats?.lastUpdate}</u>
            </p>
        </CardContent>
    </>)
}
