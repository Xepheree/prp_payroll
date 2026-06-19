import { useState } from 'react';
import { router } from '@inertiajs/react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import { Checkbox } from '@/components/ui/checkbox';

interface Attendance {
    id: number;
    period_start: string;
    period_end: string;
    employees_count: number;
}

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    attendances: Attendance[];
}

export default function CreatePayrollModal({
    open,
    setOpen,
    attendances,
}: Props) {
    const [attendanceId, setAttendanceId] = useState<number | null>(null);

    const submit = () => {
        if (!attendanceId) return;

        router.post('/payroll', {
            attendance_id: attendanceId,
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Payroll</DialogTitle>
                </DialogHeader>

                <div className="space-y-2">
                    {attendances.map((attendance) => (
                        <div
                            key={attendance.id}
                            className="flex items-start gap-3 rounded-md border p-3"
                        >
                            <Checkbox
                                checked={attendanceId === attendance.id}
                                onCheckedChange={() =>
                                    setAttendanceId(attendance.id)
                                }
                            />

                            <div>
                                <p className="font-medium">
                                    {attendance.period_start} to{' '}
                                    {attendance.period_end}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    {attendance.employees_count} Employees
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>

                    <Button disabled={!attendanceId} onClick={submit}>
                        Create Payroll
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
