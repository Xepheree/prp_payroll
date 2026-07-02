import { router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
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

function CreateEmployeeModal({
    openCreate,
    setOpenCreate,
    employee = null,
}: {
    openCreate: boolean;
    setOpenCreate: any;
    employee?: any;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState('');
    const isEditing = !!employee;
    const [form, setForm] = useState<{
        image: File | null;
        name: string;
        designation: string;
        rate: string;
        ot_rate: string;
        trip_rate: string;
        status: string;
    }>({
        image: null,
        name: '',
        designation: '',
        rate: '',
        ot_rate: '',
        trip_rate: '',
        status: 'active',
    });

    const resetState = () => {
        setForm({
            image: null,
            name: '',
            designation: '',
            rate: '',
            ot_rate: '',
            trip_rate: '',
            status: 'active',
        });

        setImagePreview('');

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const submit = () => {
        const data = new FormData();
        console.log('button clicke');

        data.append('name', form.name);
        data.append('designation', form.designation);
        data.append('rate', form.rate);
        data.append('ot_rate', form.ot_rate);
        data.append('trip_rate', form.trip_rate);
        data.append('status', form.status);

        if (form.image) {
            data.append('image', form.image);
        }

        if (isEditing) {
            data.append('_method', 'PUT');

            router.post(`/employees/${employee.id}`, data, {
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Employee updated successfully');
                    resetState();
                    setOpenCreate(false);
                },
                onError: (errors) => {
                    const firstError = Object.values(errors)[0];

                    if (firstError) {
                        toast.error(firstError);
                    }
                },
            });
        } else {
            router.post('/employees', data, {
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Employee created successfully');
                    resetState();
                    setOpenCreate(false);
                },
                onError: (errors) => {
                    const firstError = Object.values(errors)[0];

                    if (firstError) {
                        toast.error(firstError);
                    }
                },
            });
        }
    };

    useEffect(() => {
        if (employee) {
            setForm({
                image: null,
                name: employee.name || '',
                designation: employee.designation || '',
                rate: employee.rate || '',
                ot_rate: employee.ot_rate || '',
                trip_rate: employee.trip_rate || '',
                status: employee.status || 'active',
            });

            setImagePreview(employee.image ? `/storage/${employee.image}` : '');
        } else {
            resetState();
        }
    }, [employee]);

    const roles = [
        'driver',
        'helper',
        'cutter',
        'checker',
        'dispatcher',
        'sorter',
        'presser',
        'guard',
        'hr',
        'finance',
    ];

    return (
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogContent className="max-h-[90vh] overflow-hidden sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Edit Employee' : 'Add Employee'}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid max-h-[65vh] gap-4 overflow-y-auto py-4">
                    <div className="space-y-2">
                        <Label>Employee Photo</Label>

                        <Input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (file) {
                                    setForm({
                                        ...form,
                                        image: file,
                                    });

                                    setImagePreview(URL.createObjectURL(file));
                                }
                            }}
                        />

                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Employee Preview"
                                className="h-48 w-full rounded-lg border object-cover"
                            />
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Full Name</Label>

                        <Input
                            value={form.name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Designation</Label>

                        <Select
                            value={form.designation}
                            onValueChange={(value) =>
                                setForm({
                                    ...form,
                                    designation: value,
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Designation" />
                            </SelectTrigger>

                            <SelectContent>
                                {roles.map((role) => (
                                    <SelectItem key={role} value={role}>
                                        {role.charAt(0).toUpperCase() +
                                            role.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Daily Rate</Label>

                        <Input
                            type="number"
                            value={form.rate}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    rate: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>OT Rate</Label>

                        <Input
                            type="number"
                            value={form.ot_rate}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    ot_rate: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Trip Rate</Label>

                        <Input
                            type="number"
                            value={form.trip_rate}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    trip_rate: e.target.value,
                                })
                            }
                        />
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
                                <SelectItem value="active">Active</SelectItem>

                                <SelectItem value="inactive">
                                    Inactive
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
                        {isEditing ? 'Update Employee' : 'Save Employee'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CreateEmployeeModal;
