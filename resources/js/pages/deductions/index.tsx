import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import EmptyState from '@/components/custom/EmptyState';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Plus } from 'lucide-react';
import CreateDeductionModal from '@/components/custom/modals/deductions/CreateDeductionModal';
import { format, formatDate } from 'date-fns';

interface Employee {
    id: number;
    name: string;
    balance: number | null;
    updated_at: string;
}

interface Deduction {
    id: number;
    employee_id: number;
    amount: number;
    type: string;
    date: string;
    remarks: string | null;

    employee: {
        id: number;
        name: string;
    };
}

interface PageProps {
    employees: Employee[];
}

export default function Index() {
    const [openCreate, setOpenCreate] = useState(false);
    const [selectedDeduction, setSelectedDeduction] = useState(null);

    const { deductions, employees } = usePage().props as {
        deductions: Deduction[];
        employees: Employee[];
    };

    const groupedDeductions = deductions.reduce(
        (groups, deduction) => {
            const date = deduction.date;

            if (!groups[date]) {
                groups[date] = [];
            }

            groups[date].push(deduction);

            return groups;
        },
        {} as Record<string, Deduction[]>,
    );

    return (
        <>
            <Head title="Outstanding Balances" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Deductions</h1>

                        <p className="text-muted-foreground">
                            Manage employee deductions and cash advances.
                        </p>
                    </div>

                    <Button
                        onClick={() => {
                            setSelectedDeduction(null);
                            setOpenCreate(true);
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        New Deduction
                    </Button>
                </div>
            </div>

            <div>
                {Object.entries(groupedDeductions).map(([date, items]) => (
                    <Card key={date}>
                        <CardHeader>
                            <CardTitle>
                                {
                                    <CardTitle>
                                        {format(date, 'MMM dd, yyyy')}
                                    </CardTitle>
                                }
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Employee</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Remarks</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {items.map((deduction) => (
                                        <TableRow key={deduction.id}>
                                            <TableCell>
                                                {deduction.employee.name}
                                            </TableCell>

                                            <TableCell>
                                                {deduction.type}
                                            </TableCell>

                                            <TableCell>
                                                ₱
                                                {Number(
                                                    deduction.amount,
                                                ).toLocaleString()}
                                            </TableCell>

                                            <TableCell>
                                                {deduction.remarks}
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedDeduction(
                                                                deduction,
                                                            );
                                                            setOpenCreate(true);
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>

                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => {
                                                            if (
                                                                !confirm(
                                                                    'Delete this deduction?',
                                                                )
                                                            ) {
                                                                return;
                                                            }

                                                            router.delete(
                                                                `/deductions/${deduction.id}`,
                                                                {
                                                                    onSuccess:
                                                                        () =>
                                                                            toast.success(
                                                                                'Deduction deleted successfully',
                                                                            ),
                                                                },
                                                            );
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <CreateDeductionModal
                openCreate={openCreate}
                setOpenCreate={setOpenCreate}
                employees={employees}
                deduction={selectedDeduction}
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
        {
            title: 'Deductions',
            href: '/deductions',
        },
    ],
};
