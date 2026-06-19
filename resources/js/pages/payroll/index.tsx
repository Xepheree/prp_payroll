import { Head, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import CreatePayrollModal from '@/components/custom/modals/payroll/CreatePayrollModa';
import { Badge } from '@/components/ui/badge';
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
    const [openCreate, setOpenCreate] = useState(false);
    const { payrolls, availableAttendances } = usePage().props;

    return (
        <>
            <Head title="Payroll" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Payroll</h1>
                        <p className="text-muted-foreground">
                            Manage payroll periods and employee compensation
                            (DUMMY DATA)
                        </p>
                    </div>

                    <Button onClick={() => setOpenCreate(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Payroll
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Payroll Records</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="border-r">
                                            Payroll Period
                                        </TableHead>

                                        <TableHead className="border-r">
                                            Employees
                                        </TableHead>

                                        <TableHead className="border-r">
                                            Total Payroll
                                        </TableHead>

                                        <TableHead className="border-r">
                                            Status
                                        </TableHead>

                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {payrolls.map((payroll) => (
                                        <TableRow key={payroll.id}>
                                            <TableCell className="border-r font-medium">
                                                {payroll.startDate} -{' '}
                                                {payroll.endDate}
                                            </TableCell>

                                            <TableCell className="border-r">
                                                {payroll.employees}
                                            </TableCell>

                                            <TableCell className="border-r">
                                                ₱
                                                {payroll.totalPay.toLocaleString()}
                                            </TableCell>

                                            <TableCell className="border-r">
                                                {getPayrollStatusBadge(
                                                    payroll.status,
                                                )}
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        View
                                                    </Button>

                                                    {payroll.status ===
                                                        'Draft' && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            Edit
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

            <CreatePayrollModal
                open={openCreate}
                setOpen={setOpenCreate}
                attendances={availableAttendances}
            />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Payroll',
            href: '/payroll',
        },
    ],
};

export const getPayrollStatusBadge = (status: string) => {
    switch (status) {
        case 'Paid':
            return (
                <Badge className="bg-green-500 hover:bg-green-600">
                    {status}
                </Badge>
            );

        case 'Finalized':
            return (
                <Badge className="bg-blue-500 hover:bg-blue-600">
                    {status}
                </Badge>
            );

        case 'Draft':
            return (
                <Badge className="bg-yellow-500 hover:bg-yellow-600">
                    {status}
                </Badge>
            );

        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
};
