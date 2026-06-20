import { Head, router, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { useState } from 'react';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import { cn } from '@/lib/utils';

interface Attendance {
    id: number;
    period_start: string;
    period_end: string;
    status: string;
}

interface Employee {
    id: number;
    name: string;
    designation: string;

    attendance: Record<
        string,
        {
            id: number;
            work_hours: number;
            overtime_hours: number;
        }
    >;
}

export default function Show() {
    const { attendance, dates, employees } = usePage().props as {
        attendance: Attendance;
        dates: string[];
        employees: Employee[];
    };

    const initialAttendanceData = employees.reduce((data, employee) => {
        dates.forEach((date) => {
            const item = employee.attendance[date];

            if (item) {
                data[item.id] = item.work_hours;
            }
        });

        return data;
    }, {});

    const [attendanceData, setAttendanceData] = useState(initialAttendanceData);
    const [savedData, setSavedData] = useState(initialAttendanceData);

    const hasChanges =
        JSON.stringify(attendanceData) !== JSON.stringify(savedData);

    const [designationFilter, setDesignationFilter] = useState('all');

    const designations = [
        'all',
        ...new Set(employees.map((employee) => employee.designation)),
    ];

    const filteredEmployees =
        designationFilter === 'all'
            ? employees
            : employees.filter(
                  (employee) => employee.designation === designationFilter,
              );

    const updateAttendance = () => {
        router.put(
            `/attendance/${attendance.id}`,
            {
                items: attendanceData,
            },
            {
                onSuccess: () => {
                    setSavedData(attendanceData);

                    toast.success('Attendance updated successfully');
                },
            },
        );
    };

    const publishAttendance = () => {
        router.patch(
            `/attendance/${attendance.id}/publish`,
            {},
            {
                onSuccess: () => {
                    toast.success('Attendance published successfully');
                },
            },
        );
    };

    const [publishOpen, setPublishOpen] = useState(false);

    return (
        <>
            <Head title="Attendance Details" />

            <div className="space-y-6 p-6">
                <div>
                    <h1 className="text-3xl font-bold">Attendance</h1>

                    <p className="text-muted-foreground">
                        {attendance.period_start} to {attendance.period_end}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <Select
                        value={designationFilter}
                        onValueChange={setDesignationFilter}
                    >
                        <SelectTrigger className="w-60">
                            <SelectValue placeholder="Filter by designation" />
                        </SelectTrigger>

                        <SelectContent>
                            {designations.map((designation) => (
                                <SelectItem
                                    key={designation}
                                    value={designation}
                                >
                                    {designation === 'all'
                                        ? 'All Employees'
                                        : designation}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col space-y-1">
                                <CardTitle>Work Hours</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    Input attendance details for each employee
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    onClick={updateAttendance}
                                    disabled={
                                        !hasChanges ||
                                        attendance.status === 'published'
                                    }
                                >
                                    Update Attendance
                                </Button>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="border-r">
                                            Employee
                                        </TableHead>

                                        {dates.map((date) => (
                                            <TableHead
                                                key={date}
                                                className="border-r text-center"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="text-lg">
                                                        {format(
                                                            new Date(date),
                                                            'EEE',
                                                        )}
                                                    </span>
                                                    <span className="pb-1 text-xs text-muted-foreground">
                                                        {format(
                                                            new Date(date),
                                                            'MMM-dd',
                                                        )}
                                                    </span>
                                                </div>
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {filteredEmployees.map((employee) => (
                                        <TableRow key={employee.id}>
                                            <TableCell className="border-r font-medium">
                                                {employee.name}

                                                <div className="text-xs text-muted-foreground">
                                                    {employee.designation}
                                                </div>
                                            </TableCell>

                                            {dates.map((date) => {
                                                const itemId =
                                                    employee.attendance[date]
                                                        ?.id;
                                                const currentValue = Number(
                                                    attendanceData[itemId] ?? 0,
                                                );

                                                return (
                                                    <TableCell
                                                        key={date}
                                                        className="border-r text-center"
                                                    >
                                                        <Input
                                                            onFocus={(e) => {
                                                                requestAnimationFrame(
                                                                    () => {
                                                                        e.target.select();
                                                                    },
                                                                );
                                                            }}
                                                            disabled={
                                                                attendance.status ===
                                                                'published'
                                                            }
                                                            type="number"
                                                            min="0"
                                                            max="24"
                                                            step="0.5"
                                                            style={getAttendanceStyle(
                                                                currentValue,
                                                            )}
                                                            className={
                                                                'w-16 border text-center'
                                                            }
                                                            value={currentValue}
                                                            onFocus={(e) =>
                                                                e.target.select()
                                                            }
                                                            onChange={(e) => {
                                                                if (!itemId)
                                                                    return;

                                                                setAttendanceData(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        [itemId]:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    }),
                                                                );
                                                            }}
                                                        />
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="mt-5 flex justify-end">
                            {attendance.status === 'draft' && (
                                <Button
                                    onClick={() => setPublishOpen(true)}
                                    disabled={hasChanges}
                                >
                                    Publish
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <AlertDialog open={publishOpen} onOpenChange={setPublishOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Publish Attendance?</AlertDialogTitle>

                        <AlertDialogDescription>
                            Once published, this attendance will be locked and
                            used for payroll calculations. Make sure all work
                            hours are correct before proceeding.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <AlertDialogAction onClick={publishAttendance}>
                            Publish
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

Show.layout = {
    breadcrumbs: [
        {
            title: 'Attendance',
            href: '/attendance',
        },
        {
            title: 'View',
        },
    ],
};

// This function takes 3 colors and use the hours to calculate the ratio and return a blended color between red, yellow, and green. 0 hours is red, 8 hours is green, and anything above 8 hours is blue.
const getAttendanceStyle = (hours: number) => {
    if (hours <= 4) {
        const ratio = hours / 4;

        return {
            borderColor: `rgb(
                255,
                ${Math.round(255 * ratio)},
                0
            )`,
            backgroundColor: `rgba(
                255,
                ${Math.round(255 * ratio)},
                0, 0.2
            )`,
        };
    }

    const ratio = (hours - 4) / 4;

    return {
        borderColor: `rgb(
            ${Math.round(255 * (1 - ratio))},
            255,
            0
        )`,
        backgroundColor: `rgba(
            ${Math.round(255 * (1 - ratio))},
            255,
            0, 0.2
        )`,
    };
};
