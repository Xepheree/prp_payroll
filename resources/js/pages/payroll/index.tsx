import { Head, router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import CreatePayrollModal from '@/components/custom/modals/payroll/CreatePayrollModal';
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
import { formatDate } from '@/lib/utils';

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
                            <TableBody>
                                {payrolls.map((payroll) => (
                                    <TableRow key={payroll.id}>
                                        <TableCell className="border-r font-medium">
                                            {formatDate(payroll.start_date)} -{' '}
                                            {formatDate(payroll.end_date)}
                                        </TableCell>

                                        <TableCell className="border-r">
                                            -
                                        </TableCell>

                                        <TableCell className="border-r">
                                            ₱0.00
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
                                                    onClick={() =>
                                                        router.visit(
                                                            `/payroll/${payroll.id}`,
                                                        )
                                                    }
                                                >
                                                    View
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
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
        case 'paid':
            return <Badge className="bg-green-500">Paid</Badge>;

        case 'finalized':
            return <Badge className="bg-blue-500">Finalized</Badge>;

        case 'draft':
            return <Badge className="bg-yellow-500">Draft</Badge>;

        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
};
