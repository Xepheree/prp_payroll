import { router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Employee {
    id: number;
    name: string;
    image: string;
    designation: string;
}

interface CreateAttendanceModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    employees: Employee[];
}

export default function CreateAttendanceModal({
    open,
    setOpen,
    employees,
}: CreateAttendanceModalProps) {
    const [form, setForm] = useState({
        period_start: '',
        period_end: '',
    });

    const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);

    const toggleEmployee = (employeeId: number) => {
        setSelectedEmployees((prev) =>
            prev.includes(employeeId)
                ? prev.filter((id) => id !== employeeId)
                : [...prev, employeeId],
        );
    };

    const handleSubmit = () => {
        router.post('/attendance', {
            period_start: form.period_start,
            period_end: form.period_end,
            employee_ids: selectedEmployees,
        });
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Create Attendance</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Period Start</Label>

                            <Input
                                type="date"
                                value={form.period_start}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        period_start: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div>
                            <Label>Period End</Label>

                            <Input
                                type="date"
                                value={form.period_end}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        period_end: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between border-b pb-2">
                            <Label>Employees</Label>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    checked={
                                        employees.length > 0 &&
                                        selectedEmployees.length ===
                                            employees.length
                                    }
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            setSelectedEmployees(
                                                employees.map(
                                                    (employee) => employee.id,
                                                ),
                                            );
                                        } else {
                                            setSelectedEmployees([]);
                                        }
                                    }}
                                />

                                <span>Select All</span>
                            </div>
                        </div>
                        <div className="mt-2 max-h-72 space-y-2 overflow-y-auto rounded-md border p-4">
                            {employees.map((employee) => (
                                <div
                                    key={employee.id}
                                    className="flex items-center gap-2"
                                >
                                    <Checkbox
                                        checked={selectedEmployees.includes(
                                            employee.id,
                                        )}
                                        onCheckedChange={() =>
                                            toggleEmployee(employee.id)
                                        }
                                    />
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <img
                                            src={employee.image}
                                            alt={employee.name}
                                            className="h-8 w-8 rounded-full"
                                        />
                                    <span>
                                        {employee.name} -{' '}
                                        {employee.designation.charAt(0).toUpperCase() +
                                            employee.designation.slice(1)}
                                    </span>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button onClick={handleSubmit}>Save Draft</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
