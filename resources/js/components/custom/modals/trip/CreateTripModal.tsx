import { router } from '@inertiajs/react';
import { useState } from 'react';
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
}: {
    openCreate: boolean;
    setOpenCreate: (open: boolean) => void;
    employees: any[];
    trucks: any[];
}) {
    const [form, setForm] = useState({
        trip_date: '',
        truck_id: '',
        driver_id: '',
        helper_id: '',
        trip_type: '',
    });

    const resetState = () => {
        setForm({
            trip_date: '',
            truck_id: '',
            driver_id: '',
            helper_id: '',
            trip_type: '',
        });
    };

    const submit = () => {
        router.post('/trips', form, {
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
    };

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
                    <DialogTitle>Create Trip</DialogTitle>
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
                                {employees
                                    // .filter(
                                    //     (employee) =>
                                    //         employee.designation === 'helper',
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

                    <Button onClick={submit}>Save Trip</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CreateTripModal;
