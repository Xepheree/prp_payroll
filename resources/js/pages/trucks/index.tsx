import { Head, useForm, usePage } from '@inertiajs/react';
import { Plus, Pencil } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import DeleteConfirmationDialog from '@/components/custom/modals/DeleteConfirmationDialog';
import CreateTruckModal from '@/components/custom/modals/trucks/CreateTruckModal';
import ViewTruckModal from '@/components/custom/modals/trucks/ViewTruckModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import EmptyState from '@/components/custom/EmptyState';

export default function Index() {
    const { trucks, flash } = usePage().props as PageProps;

    const [selectedTruck, setSelectedTruck] = useState(null);
    const [open, setOpen] = useState(false);

    const handleRowClick = (truck) => {
        setSelectedTruck(truck);
        setOpen(true);
    };

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, plate: string) => {
        destroy(`/trucks/${id}`, {
            onSuccess: () => {
                toast.success(`${plate} was removed successfully.`);
            },

            onError: () => {
                toast.error(`Failed to remove ${plate}.`);
            },
        });
    };
    const [openCreate, setOpenCreate] = useState(false);

    return (
        <>
            <Head title="Trucks" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Trucks</h1>
                        <p className="text-muted-foreground">
                            Manage company trucks.
                        </p>
                    </div>

                    {trucks.length !== 0 && (
                        <Button onClick={() => setOpenCreate(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Truck
                        </Button>
                    )}
                </div>

                <Card>
                    {/* <CardHeader>
                        <CardTitle>Truck List</CardTitle>
                    </CardHeader> */}

                    <CardContent>
                        {trucks.length === 0 ? (
                            <EmptyState
                                title="No Trucks Registered"
                                description="Register trucks to get started."
                                actionLabel="Add Truck"
                                onAction={() => setOpenCreate(true)}
                            />
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Plate Number</TableHead>
                                        <TableHead>Alias</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Make</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead className="w-[150px]">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {[...trucks]
                                        .sort((a, b) => b.id - a.id)
                                        .map((truck) => (
                                            <TableRow
                                                key={truck.id}
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    handleRowClick(truck)
                                                }
                                            >
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={
                                                                truck.image
                                                                    ? `/storage/${truck.image}`
                                                                    : '/images/truck_placeholder.png'
                                                            }
                                                            alt={truck.plate}
                                                            className="h-10 w-10 rounded-md border object-cover"
                                                        />
                                                        <span>
                                                            {truck.plate}
                                                        </span>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    {truck.alias}
                                                </TableCell>

                                                <TableCell>
                                                    {getStatusBadge(
                                                        truck.status,
                                                    )}
                                                </TableCell>

                                                <TableCell>
                                                    {truck.make}
                                                </TableCell>

                                                <TableCell>
                                                    <Badge variant="secondary">
                                                        {truck.category}
                                                    </Badge>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="icon"
                                                            variant="outline"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                            }}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>

                                                        <DeleteConfirmationDialog
                                                            title="Delete Truck?"
                                                            description={`This will permanently remove ${truck.plate}. This action cannot be undone.`}
                                                            processing={
                                                                processing
                                                            }
                                                            onConfirm={() =>
                                                                handleDelete(
                                                                    truck.id,
                                                                    truck.plate,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>

            <ViewTruckModal
                open={open}
                setOpen={setOpen}
                selectedTruck={selectedTruck}
            />

            <CreateTruckModal
                openCreate={openCreate}
                setOpenCreate={setOpenCreate}
            />
        </>
    );
}

export const getStatusBadge = (status) => {
    switch (status) {
        case 'ready':
            return (
                <Badge className="bg-green-500 hover:bg-green-600">Ready</Badge>
            );

        case 'for repair':
            return (
                <Badge className="bg-orange-500 hover:bg-orange-600">
                    For Repair
                </Badge>
            );

        case 'unavailable':
            return <Badge variant="destructive">Unavailable</Badge>;

        case 'on trip':
            return (
                <Badge className="bg-blue-500 hover:bg-blue-600">On Trip</Badge>
            );

        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
};

Index.layout = {
    breadcrumbs: [
        {
            title: 'Trucks',
            href: '/trucks',
        },
    ],
};
