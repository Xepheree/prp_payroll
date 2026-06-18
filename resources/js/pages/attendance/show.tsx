import { Head, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

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
                        <div>
                            <div className="flex flex-col space-y-1">
                                <CardTitle>Work Hours</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    Input attendance details for each employee
                                </p>
                            </div>
                            <Button>Update Attendance</Button>
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

                                            {dates.map((date) => (
                                                <TableCell
                                                    key={date}
                                                    className="border-r text-center"
                                                >
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        max="24"
                                                        step="0.5"
                                                        className="w-16 text-center"
                                                        defaultValue={
                                                            employee.attendance[
                                                                date
                                                            ]?.work_hours ?? 0
                                                        }
                                                    />
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
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
