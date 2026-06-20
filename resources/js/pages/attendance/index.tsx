import { Head, router, usePage } from '@inertiajs/react';
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
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

interface Attendance {
    id: number;
    period_start: string;
    period_end: string;
    status: 'draft' | 'published';
    employees_count: number;
    created_at: string;
    updated_at: string;
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
                            Click on an attendance record to view details and
                            manage entries.
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
                                        <TableHead>Last Updated</TableHead>
                                        <TableHead>Created</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {attendances.map((attendance, index) => (
                                        <TableRow
                                            key={attendance.id}
                                            onClick={() =>
                                                router.visit(
                                                    `/attendance/${attendance.id}`,
                                                )
                                            }
                                            className={`cursor-pointer ${
                                                index === 0
                                                    ? 'border-l-4 border-l-green-500 bg-green-500/10 hover:bg-green-500/20'
                                                    : ''
                                            }`}
                                        >
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
                                                {getAttendanceStatusBadge(
                                                    attendance.status,
                                                )}
                                            </TableCell>

                                            <TableCell>
                                                {formatDateTime(
                                                    attendance.updated_at,
                                                )}
                                            </TableCell>

                                            <TableCell>
                                                {formatDateTime(
                                                    attendance.created_at,
                                                )}
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

const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
};

export const getAttendanceStatusBadge = (status) => {
    switch (status) {
        case 'published':
            return (
                <Badge className="bg-green-500 hover:bg-green-600">
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
            );

        case 'draft':
            return (
                <Badge className="bg-yellow-500 hover:bg-yellow-600">
                    Draft
                </Badge>
            );

        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
};

Index.layout = {
    breadcrumbs: [
        {
            title: 'Attendance',
            href: '/attendance',
        },
    ],
};
