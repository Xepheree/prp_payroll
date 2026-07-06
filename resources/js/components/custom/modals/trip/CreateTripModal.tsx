import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
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
import { Textarea } from '@/components/ui/textarea';

function CreateTripModal({
    openCreate,
    setOpenCreate,
    employees,
    trucks,
    trip = null,
}: {
    openCreate: boolean;
    setOpenCreate: (open: boolean) => void;
    employees: any[];
    trucks: any[];
    trip?: any;
}) {
    const [form, setForm] = useState({
        trip_date: '',
        truck_id: '',
        driver_id: '',
        helper_id: 'none',
        trip_type: '',
    });
    const isEditing = !!trip;

    const resetState = () => {
        setForm({
            trip_date: '',
            truck_id: '',
            driver_id: '',
            helper_id: 'none',
            trip_type: '',
        });
    };

    const submit = () => {
        const payload = {
            ...form,
            helper_id: form.helper_id === 'none' ? null : form.helper_id,
        };

        if (isEditing) {
            router.put(`/trips/${trip.id}`, form, {
                onSuccess: () => {
                    toast.success('Trip updated successfully');

                    resetState();
                    setOpenCreate(false);
                },

                onError: (errors) => {
                    const firstError = Object.values(errors)[0];

                    if (firstError) {
                        toast.error(firstError as string);
                    }
                },
            });
        } else {
            router.post('/trips', payload, {
                onSuccess: () => {
                    toast.success('Trip created successfully');

                    resetState();
                    setOpenCreate(false);
                },

                onError: (errors) => {
                    const firstError = Object.values(errors)[0];

                    if (firstError) {
                        toast.error(firstError as string);
                    }
                },
            });
        }
    };

    useEffect(() => {
        if (trip) {
            setForm({
                trip_date: trip.trip_date ?? '',
                truck_id: String(trip.truck_id ?? ''),
                driver_id: String(trip.driver_id ?? ''),
                helper_id: trip.helper_id ? String(trip.helper_id) : 'none',
                trip_type: trip.trip_type ?? '',
            });
        } else {
            resetState();
        }
    }, [trip]);

    return (
        <Dialog
            open={openCreate}
            onOpenChange={(open) => {
                setOpenCreate(open);

                if (!open) {
                    resetState();
                }
            }}
        >
            <DialogContent className="max-h-[90vh] overflow-hidden sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Edit Trip' : 'Create Trip'}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid max-h-[65vh] gap-4 overflow-y-auto py-4">
                    <div className="space-y-2">
                        <Label>Trip Date</Label>

                        <Input
                            type="date"
                            value={form.trip_date}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    trip_date: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Truck</Label>

                        <Select
                            value={form.truck_id}
                            onValueChange={(value) =>
                                setForm({
                                    ...form,
                                    truck_id: value,
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Truck" />
                            </SelectTrigger>

                            <SelectContent>
                                {trucks.map((truck) => (
                                    <SelectItem
                                        key={truck.id}
                                        value={String(truck.id)}
                                    >
                                        {truck.plate} - {truck.alias}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Driver</Label>

                        <Select
                            value={form.driver_id}
                            onValueChange={(value) =>
                                setForm({
                                    ...form,
                                    driver_id: value,
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Driver" />
                            </SelectTrigger>

                            <SelectContent>
                                {employees
                                    // .filter(
                                    //     (employee) =>
                                    //         employee.designation === 'driver',
                                    // )
                                    .map((employee) => (
                                        <SelectItem
                                            key={employee.id}
                                            value={String(employee.id)}
                                        >
                                            {employee.name}
                                        </SelectItem>
                                    ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Helper</Label>

                        <Select
                            value={form.helper_id}
                            onValueChange={(value) =>
                                setForm({
                                    ...form,
                                    helper_id: value,
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Helper" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="none">No Helper</SelectItem>

                                {employees.map((employee) => (
                                    <SelectItem
                                        key={employee.id}
                                        value={String(employee.id)}
                                    >
                                        {employee.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Trip Type</Label>

                        <Select
                            value={form.trip_type}
                            onValueChange={(value) =>
                                setForm({
                                    ...form,
                                    trip_type: value,
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="deliver">Deliver</SelectItem>

                                <SelectItem value="pickup">Pickup</SelectItem>

                                <SelectItem value="transfer">
                                    Transfer
                                </SelectItem>
                                <SelectItem value="backload">
                                    Backload
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

                    <Button onClick={submit}>
                        {isEditing ? 'Update Trip' : 'Save Trip'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CreateTripModal;
