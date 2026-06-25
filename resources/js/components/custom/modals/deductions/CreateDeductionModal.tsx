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

function CreateDeductionModal({
    openCreate,
    setOpenCreate,
    employees,
    deduction = null,
}: {
    openCreate: boolean;
    setOpenCreate: (open: boolean) => void;
    employees: any[];
    deduction?: any;
}) {
    const [form, setForm] = useState({
        employee_id: '',
        amount: '',
        type: '',
        date: new Date().toISOString().split('T')[0],
        remarks: '',
    });

    const isEditing = !!deduction;

    const resetState = () => {
        setForm({
            employee_id: '',
            amount: '',
            type: '',
            date: new Date().toISOString().split('T')[0],
            remarks: '',
        });
    };

    const submit = () => {
        if (isEditing) {
            router.put(`/deductions/${deduction.id}`, form, {
                onSuccess: () => {
                    toast.success('Deduction updated successfully');

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
            router.post('/deductions', form, {
                onSuccess: () => {
                    toast.success('Deduction created successfully');

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
        if (deduction) {
            setForm({
                employee_id: String(deduction.employee_id ?? ''),
                amount: String(deduction.amount ?? ''),
                type: deduction.type ?? '',
                date: deduction.date ?? '',
                remarks: deduction.remarks ?? '',
            });
        } else {
            resetState();
        }
    }, [deduction]);

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
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Edit Deduction' : 'Create Deduction'}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label>Employee</Label>

                        <Select
                            value={form.employee_id}
                            onValueChange={(value) =>
                                setForm({
                                    ...form,
                                    employee_id: value,
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Employee" />
                            </SelectTrigger>

                            <SelectContent>
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
                        <Label>Type</Label>

                        <Select
                            value={form.type}
                            onValueChange={(value) =>
                                setForm({
                                    ...form,
                                    type: value,
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="cash_advance">
                                    Cash Advance
                                </SelectItem>

                                <SelectItem value="tax">Tax</SelectItem>

                                <SelectItem value="benefits">
                                    Benefits
                                </SelectItem>

                                <SelectItem value="others">Others</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Amount</Label>

                        <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={form.amount}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    amount: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Date</Label>

                        <Input
                            type="date"
                            value={form.date}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    date: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Remarks</Label>

                        <Textarea
                            rows={4}
                            value={form.remarks}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    remarks: e.target.value,
                                })
                            }
                        />
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
                        {isEditing ? 'Update Deduction' : 'Save Deduction'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CreateDeductionModal;
