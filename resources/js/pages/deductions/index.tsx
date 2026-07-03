import { Head, router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
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
import CreateDeductionModal from '@/components/custom/modals/deductions/CreateDeductionModal';
import { formatDate, formatDateTime } from '@/lib/utils';

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
    payroll_id: number | null;
    can_add_to_balance: boolean;

    employee: {
        id: number;
        name: string;
    };

    payroll: {
        id: number;
        start_date: string;
        end_date: string;
    } | null;
}

interface PageProps {
    deductions: Deduction[];
    employees: Employee[];
    from: string;
}

export default function Index() {
    const [openCreate, setOpenCreate] = useState(false);
    const [selectedDeduction, setSelectedDeduction] =
        useState<Deduction | null>(null);

    const { deductions, employees } = usePage().props as unknown as PageProps;

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

    // const addToBalance = (
    //     employee_id: number,
    //     amount: number,
    //     deductionid: number,
    // ) => {
    //     const employee = employees.find(
    //         (employee) => employee.id === employee_id,
    //     );

    //     if (!employee) {
    //         toast.error('Employee not found.');

    //         return;
    //     }

    //     router.patch(
    //         `/obs/${employee_id}`,
    //         {
    //             balance: Number(employee.balance ?? 0) + Number(amount),
    //         },
    //         {
    //             preserveScroll: true,

    //             onSuccess: () => {
    //                 router.delete(`/deductions/${deductionid}`, {
    //                     preserveScroll: true,

    //                     onSuccess: () =>
    //                         toast.success(
    //                             'Deduction moved to employee balance.',
    //                         ),

    //                     onError: (errors) => {
    //                         const firstError = Object.values(errors)[0];

    //                         toast.error(
    //                             firstError
    //                                 ? (firstError as string)
    //                                 : 'Failed to remove deduction.',
    //                         );
    //                     },
    //                 });
    //             },

    //             onError: (errors) => {
    //                 const firstError = Object.values(errors)[0];

    //                 toast.error(
    //                     firstError
    //                         ? (firstError as string)
    //                         : 'Failed to update balance.',
    //                 );
    //             },
    //         },
    //     );
    // };

    const addToBalance = (deductionId: number) => {
        router.post(
            `/deductions/${deductionId}/balance`,
            {},
            {
                preserveScroll: true,

                onSuccess: () => {
                    toast.success(
                        'Deduction transferred to employee transaction history.',
                    );
                },

                onError: (errors) => {
                    const firstError = Object.values(errors)[0];

                    toast.error(
                        firstError
                            ? (firstError as string)
                            : 'Failed to transfer deduction.',
                    );
                },
            },
        );
    };

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
                <Card>
                    <CardHeader>
                        <CardTitle>All Deductions</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Remarks</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {deductions.map((deduction) => (
                                    <TableRow key={deduction.id}>
                                        <TableCell>
                                            {formatDate(deduction.date)}
                                        </TableCell>

                                        <TableCell>
                                            {deduction.employee.name}
                                        </TableCell>

                                        <TableCell className="capitalize">
                                            {deduction.type.replace('_', ' ')}
                                        </TableCell>

                                        <TableCell>
                                            ₱
                                            {Number(
                                                deduction.amount,
                                            ).toLocaleString()}
                                        </TableCell>

                                        <TableCell>
                                            {deduction.remarks || '-'}
                                        </TableCell>

                                        <TableCell>
                                            {deduction.payroll_id !== null ? (
                                                <div
                                                    className="cursor-pointer rounded-md border border-green-500 bg-green-500/10 px-3 py-1 text-center hover:bg-green-500/20"
                                                    onClick={() =>
                                                        router.visit(
                                                            `/payroll/${deduction.payroll.id}`,
                                                        )
                                                    }
                                                >
                                                    <p className="text-sm font-medium text-green-600">
                                                        Included in Payroll
                                                    </p>

                                                    <p className="text-xs text-muted-foreground">
                                                        {formatDate(
                                                            deduction.payroll
                                                                .start_date,
                                                        )}{' '}
                                                        –{' '}
                                                        {formatDate(
                                                            deduction.payroll
                                                                .end_date,
                                                        )}
                                                    </p>
                                                </div>
                                            ) : deduction.added_to_balance ? (
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    disabled
                                                >
                                                    Added to Balance
                                                </Button>
                                            ) : deduction.can_add_to_balance ? (
                                                // Late Filing
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() =>
                                                        addToBalance(
                                                            deduction.id,
                                                        )
                                                    }
                                                >
                                                    Add to Balance
                                                </Button>
                                            ) : (
                                                // Early Filing
                                                <>
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
                                                            // delete...
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>

                                                    {/* <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={() =>
                                                            addToBalance(
                                                                deduction.id,
                                                            )
                                                        }
                                                    >
                                                        Add to Balance
                                                    </Button> */}
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
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
