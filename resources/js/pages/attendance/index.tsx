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

export default function Index() {
    const { employees, flash } = usePage().props as PageProps;

    const [selectedAttendance, setSelectedAttendance] = useState(null);
    const [open, setOpen] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);

    const handleRowClick = (company) => {
        setSelectedCompany(company);
        setOpen(true);
    };

    const attendances = [
        {
            id: 1,
            periodStart: '2026-06-01',
            periodEnd: '2026-06-15',
            employees: 12,
            status: 'draft',
        },
        {
            id: 2,
            periodStart: '2026-06-16',
            periodEnd: '2026-06-30',
            employees: 12,
            status: 'published',
        },
    ];

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
                                                {attendance.periodStart} -{' '}
                                                {attendance.periodEnd}
                                            </TableCell>

                                            <TableCell className="border-r">
                                                {attendance.employees}
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

Index.layout = {
    breadcrumbs: [
        {
            title: 'Attendance',
            href: '/attendance',
        },
    ],
};
