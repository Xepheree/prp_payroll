import { Head } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function Index() {
    // dummy data
    const trucks = [
        {
            id: 1,
            image: 'https://plus.unsplash.com/premium_photo-1664695368767-c42483a0bda1?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            plate: 'ABC-1234',
            alias: 'Truck Alpha',
            make: 'Isuzu',
            category: 'Wingvan',
            status: 'ready',
        },
        {
            id: 2,
            image: 'https://plus.unsplash.com/premium_photo-1664695368767-c42483a0bda1?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            plate: 'XYZ-5678',
            alias: 'Truck Bravo',
            make: 'STC',
            category: 'Dropside',
            status: 'for repair',
        },
        {
            id: 3,
            image: 'https://plus.unsplash.com/premium_photo-1664695368767-c42483a0bda1?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            plate: 'DEF-9012',
            alias: 'Truck Charlie',
            make: 'Isuzu',
            category: 'Trailer',
            status: 'unavailable',
        },
        {
            id: 4,
            image: 'https://plus.unsplash.com/premium_photo-1664695368767-c42483a0bda1?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            plate: 'GHI-3456',
            alias: 'Truck Delta',
            make: 'STC',
            category: 'Wingvan',
            status: 'on trip',
        },
    ];

    const [selectedTruck, setSelectedTruck] = useState(null);
    const [open, setOpen] = useState(false);

    const handleRowClick = (truck) => {
        setSelectedTruck(truck);
        setOpen(true);
    };

    const [openCreate, setOpenCreate] = useState(false);

    const [form, setForm] = useState({
        image: null,
        plate: '',
        alias: '',
        make: '',
        category: '',
        status: 'ready',
    });

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

                    <Button onClick={() => setOpenCreate(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Truck
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Truck List</CardTitle>
                    </CardHeader>

                    <CardContent>
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
                                {trucks.map((truck) => (
                                    <TableRow
                                        key={truck.id}
                                        className="cursor-pointer"
                                        onClick={() => handleRowClick(truck)}
                                    >
                                        <TableCell className="font-medium">
                                            {truck.plate}
                                        </TableCell>

                                        <TableCell>{truck.alias}</TableCell>

                                        <TableCell>
                                            {getStatusBadge(truck.status)}
                                        </TableCell>

                                        <TableCell>{truck.make}</TableCell>

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
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>

                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Truck Details</DialogTitle>
                    </DialogHeader>

                    {selectedTruck && (
                        <div className="space-y-4">
                            <img
                                src={selectedTruck.image}
                                alt={selectedTruck.alias}
                                className="h-48 w-full rounded-lg border object-cover"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Plate Number
                                    </p>
                                    <p className="font-medium">
                                        {selectedTruck.plate}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Alias
                                    </p>
                                    <p className="font-medium">
                                        {selectedTruck.alias}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Status
                                    </p>
                                    {getStatusBadge(selectedTruck.status)}
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Type
                                    </p>
                                    <p className="font-medium">
                                        {selectedTruck.category}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={openCreate} onOpenChange={setOpenCreate}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Add Truck</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label>Truck Image</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        image: e.target.files?.[0],
                                    })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Plate Number</Label>
                            <Input
                                value={form.plate}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        plate: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Alias</Label>
                            <Input
                                value={form.alias}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        alias: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Make</Label>

                            <Select
                                value={form.make}
                                onValueChange={(value) =>
                                    setForm({
                                        ...form,
                                        make: value,
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Make" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="isuzu">Isuzu</SelectItem>
                                    <SelectItem value="stc">STC</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Category</Label>

                            <Select
                                value={form.category}
                                onValueChange={(value) =>
                                    setForm({
                                        ...form,
                                        category: value,
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="wingvan">
                                        Wingvan
                                    </SelectItem>

                                    <SelectItem value="dropside">
                                        Dropside
                                    </SelectItem>

                                    <SelectItem value="trailer">
                                        Trailer
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Status</Label>

                            <Select
                                value={form.status}
                                onValueChange={(value) =>
                                    setForm({
                                        ...form,
                                        status: value,
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="ready">Ready</SelectItem>

                                    <SelectItem value="for repair">
                                        For Repair
                                    </SelectItem>

                                    <SelectItem value="unavailable">
                                        Unavailable
                                    </SelectItem>

                                    <SelectItem value="on trip">
                                        On Trip
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setOpenCreate(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={() => {
                                console.log(form);
                                setOpenCreate(false);
                            }}
                        >
                            Save Truck
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

const getStatusBadge = (status) => {
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
