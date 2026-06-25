import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Plus } from 'lucide-react';

import CreateTripModal from '@/components/custom/modals/trip/CreateTripModal';
import EmptyState from '@/components/custom/EmptyState';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import ViewTripModal from '@/components/custom/modals/trip/ViewTripModal';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function Index() {
    const { trips, filters, employees, trucks, flash } = usePage()
        .props as PageProps;

    const [dateFilters, setDateFilters] = useState({
        start_date: filters?.start_date ?? '',
        end_date: filters?.end_date ?? '',
    });

    const [openCreate, setOpenCreate] = useState(false);

    const [editingTrip, setEditingTrip] = useState(null);

    const [openView, setOpenView] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);

    return (
        <>
            <Head title="Trips" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Trips</h1>

                        <p className="text-muted-foreground">
                            Manage truck trips and assignments.
                        </p>
                    </div>

                    <Button
                        onClick={() => {
                            setEditingTrip(null);
                            setOpenCreate(true);
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        New Trip
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Trip Records</CardTitle>
                        <div className="flex items-end gap-4">
                            <div>
                                <Label>From</Label>
                                <Input
                                    type="date"
                                    value={dateFilters.start_date}
                                    onChange={(e) =>
                                        setDateFilters({
                                            ...dateFilters,
                                            start_date: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <Label>To</Label>
                                <Input
                                    type="date"
                                    value={dateFilters.end_date}
                                    onChange={(e) =>
                                        setDateFilters({
                                            ...dateFilters,
                                            end_date: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <Button
                                onClick={() =>
                                    router.get(
                                        '/trips',
                                        {
                                            start_date: dateFilters.start_date,
                                            end_date: dateFilters.end_date,
                                        },
                                        {
                                            preserveState: true,
                                            replace: true,
                                        },
                                    )
                                }
                            >
                                Filter
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => {
                                    setDateFilters({
                                        start_date: '',
                                        end_date: '',
                                    });

                                    router.get('/trips');
                                }}
                            >
                                Clear
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent>
                        {trips.length === 0 ? (
                            <EmptyState
                                title="No Trips Found"
                                description="Create your first trip record."
                                actionLabel="New Trip"
                                onAction={() => setOpenCreate(true)}
                            />
                        ) : (
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

                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {trips.map((trip) => (
                                            <TableRow key={trip.id}>
                                                <TableCell className="border-r">
                                                    {trip.trip_date}
                                                </TableCell>

                                                <TableCell className="border-r">
                                                    {trip.truck?.plate} -{' '}
                                                    {trip.truck?.alias}
                                                </TableCell>

                                                <TableCell className="border-r capitalize">
                                                    {trip.trip_type}
                                                </TableCell>

                                                <TableCell className="border-r">
                                                    {trip.driver?.name}
                                                </TableCell>

                                                <TableCell className="border-r">
                                                    {trip.helper?.name ?? '-'}
                                                </TableCell>

                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                console.log(
                                                                    trip,
                                                                );
                                                                setSelectedTrip(
                                                                    trip,
                                                                );
                                                                setOpenView(
                                                                    true,
                                                                );
                                                            }}
                                                        >
                                                            View
                                                        </Button>

                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                setEditingTrip(
                                                                    trip,
                                                                );
                                                                setOpenCreate(
                                                                    true,
                                                                );
                                                            }}
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
                        )}
                    </CardContent>
                </Card>
            </div>

            <CreateTripModal
                openCreate={openCreate}
                setOpenCreate={(open) => {
                    setOpenCreate(open);

                    if (!open) {
                        setEditingTrip(null);
                    }
                }}
                employees={employees}
                trucks={trucks}
                trip={editingTrip}
            />

            <ViewTripModal
                open={openView}
                setOpen={setOpenView}
                selectedTrip={selectedTrip}
            />
        </>
    );
}
