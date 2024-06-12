import { useIndices } from '@/api'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PageIndices() {
    const { data } = useIndices()

    return (<>
        <CardHeader>
            <CardTitle>
                Indices
            </CardTitle>
        </CardHeader>

        <CardContent>
            <ul>
                {data?.total === 0 ?
                    <p>no result</p> :
                    data?.results.map((index, i) => <li key={`index-${i}`}>{index.uid}</li>)}
            </ul>
        </CardContent>
    </>)
}
