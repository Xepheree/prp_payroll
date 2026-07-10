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
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Attendance {
    id: number;
    period_start: string;
    period_end: string;
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
    const { attendance, dates, employees, is_locked } = usePage().props as {
        attendance: Attendance;
        dates: string[];
        employees: Employee[];
        is_locked: boolean;
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
                                {is_locked ? (
                                    <p className="text-sm text-muted-foreground">
                                        This attendance is locked because its
                                        payroll has been finalized.
                                    </p>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        Changes made here are automatically
                                        reflected in any draft payroll for this
                                        attendance.
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                {is_locked ? (
                                    <div className="flex items-center gap-2 rounded-md border border-green-500 bg-green-500/20 px-4 py-2">
                                        <span className="font-medium text-green-600">
                                            Payroll Finalized
                                        </span>
                                    </div>
                                ) : (
                                    <Button
                                        onClick={updateAttendance}
                                        disabled={!hasChanges}
                                    >
                                        Update Attendance
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-0">
                        <ScrollArea className="h-[70vh] w-full">
                            <div
                                className="grid"
                                style={{
                                    gridTemplateColumns: `240px repeat(${dates.length}, minmax(80px, 1fr))`,
                                }}
                            >
                                <div className="sticky top-0 left-0 z-30 border-r border-b bg-background p-3 font-semibold">
                                    Employee
                                </div>
                                {dates.map((date) => (
                                    <div
                                        key={date}
                                        className="sticky top-0 z-20 border-r border-b bg-background p-2 text-center"
                                    >
                                        <div className="font-semibold">
                                            {format(new Date(date), 'EEE')}
                                        </div>

                                        <div className="text-xs text-muted-foreground">
                                            {format(new Date(date), 'MMM dd')}
                                        </div>
                                    </div>
                                ))}
                                {filteredEmployees.map((employee) => (
                                    <>
                                        <div
                                            key={`employee-${employee.id}`}
                                            className="sticky left-0 z-10 border-r border-b bg-background p-3"
                                        >
                                            <div className="font-medium">
                                                {employee.name}
                                            </div>

                                            <div className="text-xs text-muted-foreground">
                                                {employee.designation}
                                            </div>
                                        </div>

                                        {dates.map((date) => {
                                            const itemId =
                                                employee.attendance[date]?.id;

                                            const currentValue = Number(
                                                attendanceData[itemId] ?? 0,
                                            );

                                            return (
                                                <div
                                                    key={date}
                                                    className="border-r border-b p-2"
                                                >
                                                    <Input
                                                        disabled={is_locked}
                                                        type="number"
                                                        min="0"
                                                        max="24"
                                                        step="0.5"
                                                        value={currentValue}
                                                        style={getAttendanceStyle(
                                                            currentValue,
                                                        )}
                                                        className="w-full max-w-xs text-center"
                                                        onChange={(e) => {
                                                            if (!itemId) return;

                                                            setAttendanceData(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [itemId]:
                                                                        e.target
                                                                            .value,
                                                                }),
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

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
