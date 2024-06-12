import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import LayoutInit from '@/layout/LayoutInit'

export default function PageBoot() {
    return (
        <LayoutInit>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Loading
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        The application is initializing.
                    </p>
                </CardContent>
            </Card>
        </LayoutInit>
    )
}
