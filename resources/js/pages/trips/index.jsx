import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus } from 'lucide-react';

export default function Index() {
  const trips = [
    {
      id: 1,
      tripDate: '2026-06-08',
      truck: 'Truck #1',
      tripType: 'deliver',
      driver: 'John Dela Cruz',
      helper: 'Mark Santos',
    },
    {
      id: 2,
      tripDate: '2026-06-09',
      truck: 'Truck #2',
      tripType: 'pickup',
      driver: 'Paul Reyes',
      helper: 'Mark Santos',
    },
    {
      id: 3,
      tripDate: '2026-06-10',
      truck: 'Truck #3',
      tripType: 'transfer',
      driver: 'John Dela Cruz',
      helper: 'Paul Reyes',
    },
    {
      id: 4,
      tripDate: '2026-06-10',
      truck: 'Truck #1',
      tripType: 'deliver',
      driver: 'John Dela Cruz',
      helper: 'Mark Santos',
    },
  ];

  return (
    <>
      <Head title="Trips" />

      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Trips</h1>
            <p className="text-muted-foreground">
              Trip management (DUMMY DATA)
            </p>
          </div>

          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Trip
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Trip Records</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="border-r">
                      Date
                    </TableHead>
                    <TableHead className="border-r">
                      Truck
                    </TableHead>
                    <TableHead className="border-r">
                      Type
                    </TableHead>
                    <TableHead className="border-r">
                      Driver
                    </TableHead>
                    <TableHead className="border-r">
                      Helper
                    </TableHead>
                    <TableHead>
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {trips.map((trip) => (
                    <TableRow key={trip.id}>
                      <TableCell className="border-r">
                        {trip.tripDate}
                      </TableCell>

                      <TableCell className="border-r">
                        {trip.truck}
                      </TableCell>

                      <TableCell className="border-r capitalize">
                        {trip.tripType}
                      </TableCell>

                      <TableCell className="border-r">
                        {trip.driver}
                      </TableCell>

                      <TableCell className="border-r">
                        {trip.helper}
                      </TableCell>

                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            View
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                          >
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

Index.layout = {
  breadcrumbs: [
    {
      title: 'Trips',
      href: '/trips',
    },
  ],
};