import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/utils';

function AssistedTripsTab({ employee }: { employee: any }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Assisted Trips</CardTitle>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Truck</TableHead>
                            <TableHead>Trip Type</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {employee.assisted_trips.length ? (
                            employee.assisted_trips.map((trip) => (
                                <TableRow key={trip.id}>
                                    <TableCell>
                                        {formatDate(trip.trip_date)}
                                    </TableCell>

                                    <TableCell>{trip.truck.alias}</TableCell>

                                    <TableCell className="capitalize">
                                        {trip.trip_type}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={3}
                                    className="py-8 text-center text-muted-foreground"
                                >
                                    No driven trips.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default AssistedTripsTab;
