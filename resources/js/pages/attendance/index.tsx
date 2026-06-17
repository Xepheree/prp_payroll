import { Head, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import CreateAttendanceModal from '@/components/custom/modals/attendance/CreateAttendanceModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Attendance {
    id: number;
    period_start: string;
    period_end: string;
    status: 'draft' | 'published';
    employees_count: number;
}

export default function Index() {
    const [selectedAttendance, setSelectedAttendance] = useState(null);
    const [open, setOpen] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);

    const handleRowClick = (company) => {
        setSelectedCompany(company);
        setOpen(true);
    };

    const { employees, attendances } = usePage().props as {
        employees: Employee[];
        attendances: Attendance[];
    };

    return (
        <>
            <Head title="Trips" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Attendance</h1>
                        <p className="text-muted-foreground">
                            Record attendance of each employee
                        </p>
                    </div>

                    <Button onClick={() => setOpenCreate(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Entry
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Attendance Records</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="border-r">
                                            Period
                                        </TableHead>

                                        <TableHead className="border-r">
                                            Employees
                                        </TableHead>

                                        <TableHead className="border-r">
                                            Status
                                        </TableHead>

                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {attendances.map((attendance) => (
                                        <TableRow key={attendance.id}>
                                            <TableCell className="border-r">
                                                <span className="font-bold">
                                                    {formatDate(
                                                        attendance.period_start,
                                                    )}
                                                </span>{' '}
                                                →{' '}
                                                <span className="font-bold">
                                                    {formatDate(
                                                        attendance.period_end,
                                                    )}
                                                </span>
                                            </TableCell>

                                            <TableCell className="border-r">
                                                {attendance.employees_count}
                                            </TableCell>

                                            <TableCell className="border-r">
                                                <span
                                                    className={
                                                        attendance.status ===
                                                        'published'
                                                            ? 'font-medium text-green-600'
                                                            : 'font-medium text-yellow-600'
                                                    }
                                                >
                                                    {attendance.status}
                                                </span>
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        View
                                                    </Button>

                                                    {attendance.status ===
                                                        'draft' && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            Edit
                                                        </Button>
                                                    )}

                                                    {attendance.status ===
                                                        'draft' && (
                                                        <Button size="sm">
                                                            Publish
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <CreateAttendanceModal
                open={openCreate}
                setOpen={setOpenCreate}
                employees={employees}
            />
        </>
    );
}

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
    });
};

Index.layout = {
    breadcrumbs: [
        {
            title: 'Attendance',
            href: '/attendance',
        },
    ],
};
